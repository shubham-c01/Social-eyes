import { useEffect, useRef, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../conf';
import { Send } from 'lucide-react';
import { listenTomsg, sendmsgtofb } from '../Service/SendMsg';
import { createCommonChatId } from '../Service/Commonchatid';
import { getusernameById } from '../Authentication/getusernameById';
function Chatpage() {
  const { id: otherUserId } = useParams();
  const location = useLocation();
  const messageContainerRef = useRef(null);

  const [otherUser, setOtherUser] = useState(location.state?.userData || {});
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [chatId, setChatId] = useState(null);

  // Get current logged in user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  // Fetch other user info
  useEffect(() => {
    const fetchOtherUser = async () => {
      if (!otherUserId) return;

      if (location.state?.userData) {
        setOtherUser(location.state.userData);
      } else {
        const fetchedUser = await getusernameById(otherUserId);
        if (fetchedUser) setOtherUser(fetchedUser);
      }
    };

    fetchOtherUser();
  }, [otherUserId, location.state]);

  // Setup chat
  useEffect(() => {
    if (!currentUser?.uid || !otherUserId) return;

    const chatIdentifier = createCommonChatId(currentUser.uid, otherUserId);
    console.log("Generated Chat ID:", chatIdentifier);
    setChatId(chatIdentifier);

    const chatDocRef = doc(db, 'chats', chatIdentifier);

    const setupChat = async () => {
      const chatSnap = await getDoc(chatDocRef);

      if (!chatSnap.exists()) {
        await setDoc(chatDocRef, {
          participants: {
            [currentUser.uid]: true,
            [otherUserId]: true,
          },
          initiator: currentUser.uid,
          createdAt: serverTimestamp(),
          lastUpdated: serverTimestamp(),
        });
      }

      const unsubscribeMsgs = listenTomsg(chatIdentifier, (msgs) => {
        setMessages(msgs);
        scrollToBottom();
      });

      return unsubscribeMsgs;
    };

    let unsubscribe;

    setupChat().then((unsub) => {
      unsubscribe = unsub;
    });

    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, [currentUser, otherUserId]);

  const scrollToBottom = () => {
    setTimeout(() => {
      messageContainerRef.current?.scrollTo({
        top: messageContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }, 100);
  };

  const sendMessage = async () => {
    if (!inputValue.trim() || !currentUser?.uid || !otherUser?.uid) {
      console.log("Missing input or user/chat context");
      return;
    }

    try {
      await sendmsgtofb( currentUser.uid,otherUserId, inputValue.trim()); // ✅ send with chatId!
      setInputValue('');
    } catch (error) {
      console.error('Message error:', error);
    }
  };

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-[#F5F3FF] via-purple-100 to-purple-300 font-sans">
      {/* Header */}
      <div className='flex justify-between items-center w-full top-0 left-0 backdrop-blur-md bg-white/30 border-b border-purple-200 text-purple-800 shadow-sm fixed z-50 h-16 px-6'>
        <div className='font-bold text-xl'>{otherUser?.username || 'Chat'}</div>
        <div className="w-9 h-9"></div>
      </div>

      {/* Messages */}
      <div ref={messageContainerRef} className="pt-20 pb-24 px-4 overflow-y-auto h-[calc(100vh-4rem)]">
        <div className="flex flex-col space-y-2 max-w-2xl mx-auto">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.senderId === currentUser?.uid ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[75%] p-3 rounded-2xl shadow-md ${msg.senderId === currentUser?.uid ? 'bg-purple-600 text-white rounded-tr-none' : 'bg-white/70 text-purple-800 rounded-tl-none'}`}>
                {msg.text}
                <div className={`text-xs mt-1 ${msg.senderId === currentUser?.uid ? 'text-purple-200 text-right' : 'text-purple-500 text-left'}`}>
                  {msg.timestamp?.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="fixed bottom-0 left-0 w-full backdrop-blur-md bg-white/50 border-t border-purple-200 p-4 flex items-center gap-2 shadow-inner z-40">
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          type="text"
          placeholder="Type a message..."
          className="flex-grow px-4 py-2 rounded-full bg-white/80 text-purple-800 placeholder:text-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
        />
        <button
          onClick={sendMessage}
          className="p-2 rounded-full bg-purple-600 hover:bg-purple-700 text-white shadow-lg transition-all disabled:opacity-50"
          disabled={!inputValue.trim()}
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

export default Chatpage;
