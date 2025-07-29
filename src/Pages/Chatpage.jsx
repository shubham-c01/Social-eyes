import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { db } from '../conf';
import { doc, getDoc } from 'firebase/firestore';
import { createCommonChatId } from '../Service/Commonchatid';
import { listenTomsg } from '../Service/SendMsg';
import { sendmsgtofb } from '../Service/SendMsg';
import EmojiPicker from 'emoji-picker-react';

function Chatpage() {
  const { id: otherUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [receiverData, setReceiverData] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const messagesEndRef = useRef(null);
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const navigate = useNavigate();

  const currentUserId = currentUser?.uid;
  const chatId = createCommonChatId(currentUserId, otherUserId);

  useEffect(() => {
    if (!currentUserId || !otherUserId) return;
    const unsubscribe = listenTomsg(chatId, setMessages);
    return () => unsubscribe();
  }, [chatId, currentUserId, otherUserId]);

  useEffect(() => {
    const getReceiverDetails = async () => {
      const docRef = doc(db, 'users', otherUserId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setReceiverData(docSnap.data());
      }
    };
    getReceiverDetails();
  }, [otherUserId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!inputValue.trim()) return;
    await sendmsgtofb(currentUserId, otherUserId, inputValue.trim());
    setInputValue('');
    setShowEmojiPicker(false);
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  const handleEmojiClick = (emojiData) => {
    setInputValue((prev) => prev + emojiData.emoji);
  };

  const formatTime = (timestamp) => {
    const date = timestamp?.toDate();
    return date ? date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-100 to-purple-200 text-[#1E1B4B] font-sans">

      {/* Navbar */}
      <div className="bg-white/90 shadow-md px-6 py-4 flex justify-between items-center border-b border-purple-200">
        <div className="text-lg font-bold">
          Chat with {receiverData?.username || 'Loading...'}
        </div>
        <button
          onClick={handleLogout}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-all duration-300 text-sm font-medium shadow-md"
        >
          Logout
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-grow overflow-y-auto px-4 py-6 bg-white/40 backdrop-blur-md">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 mt-20 text-sm">
            No messages yet. Start the conversation!
          </div>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className={`mb-3 max-w-[80%] w-fit ${
              msg.senderId === currentUserId ? 'ml-auto' : 'mr-auto'
            }`}>
              <div className={`relative px-4 py-2 rounded-xl shadow-md text-sm whitespace-pre-line ${
                msg.senderId === currentUserId
                  ? 'bg-purple-600 text-white rounded-tr-none'
                  : 'bg-purple-100 text-[#1E1B4B] rounded-tl-none'
              }`}>
                {msg.text}
              </div>
              <div className={`text-xs mt-1 text-gray-500 ${msg.senderId === currentUserId ? 'text-right' : 'text-left'}`}>
                {formatTime(msg.timestamp)}
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Emoji Picker */}
      {showEmojiPicker && (
        <div className="absolute bottom-24 left-4 z-50">
          <EmojiPicker onEmojiClick={handleEmojiClick} theme="light" />
        </div>
      )}

      {/* Input Field */}
      <div className="p-4 bg-white/80 backdrop-blur-lg border-t border-purple-300 flex items-center gap-3 relative">
        <button
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          className="text-purple-600 text-xl hover:text-purple-800 transition-all duration-200"
        >
          😊
        </button>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type your message..."
          className="flex-grow px-4 py-2 rounded-lg border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white text-[#1E1B4B]"
        />
        <button
          onClick={sendMessage}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-all duration-300 font-medium"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Chatpage;
