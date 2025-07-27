import React, { useRef, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { UserCircle, Send } from 'lucide-react';
import { getusernameById } from '../Authentication/getusernameById';

function Chatpage() {
  
  const { id } = useParams();
  //console.log(id);


  
  const user=getusernameById(id)
  const detail=[]
  console.log(detail.push(user));
  
  
  console.log(username);
  

  
  
  
  
  
  const chatRef = useRef(null);

  // Scroll to bottom on mount
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, []);

  return (
    <div className='min-h-screen relative bg-gradient-to-br from-[#F5F3FF] via-purple-100 to-purple-300 font-sans'>

      {/* Top Navbar */}
      <div className='flex justify-end items-center w-full top-0 left-0 backdrop-blur-md bg-white/30 border-b border-purple-200 text-purple-800 shadow-sm fixed z-50 h-16 px-6'>
      <h3 className='text-purple-600'>{}</h3>

        <NavLink
          to="/edit"
          className="hover:scale-105 transition-transform duration-200"
          title="Edit your profile"
        >
          <UserCircle className="w-9 h-9 text-purple-700 hover:text-purple-900 drop-shadow-md" />
        </NavLink>
      </div>

      {/* Chat Section */}
      <div className="pt-20 pb-24 px-4 overflow-y-auto h-[calc(100vh-4rem)]" ref={chatRef}>
        <div className="flex flex-col space-y-4 max-w-2xl mx-auto">

          {/* Message from other user */}
          <div className="self-start max-w-[75%] bg-white/60 backdrop-blur-md text-purple-900 p-3 rounded-2xl shadow-md">
            Hey! How are you?
            <div className="text-xs text-purple-500 text-right mt-1">10:32 AM</div>
          </div>

          {/* Your message */}
          <div className="self-end max-w-[75%] bg-purple-500 text-white p-3 rounded-2xl shadow-md">
            I'm doing great, what about you?
            <div className="text-xs text-purple-200 text-right mt-1">10:33 AM</div>
          </div>

          {/* Other */}
          <div className="self-start max-w-[75%] bg-white/60 backdrop-blur-md text-purple-900 p-3 rounded-2xl shadow-md">
            Just working on the new project 🧑‍💻
            <div className="text-xs text-purple-500 text-right mt-1">10:35 AM</div>
          </div>

        </div>
      </div>

      {/* Message Input */}
      <div className="fixed bottom-0 left-0 w-full backdrop-blur-md bg-white/50 border-t border-purple-200 p-4 flex items-center gap-2 shadow-inner z-40">
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-grow px-4 py-2 rounded-full bg-white/80 text-purple-800 placeholder:text-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
        />
        <button className="p-2 rounded-full bg-purple-600 hover:bg-purple-700 text-white shadow-lg transition-all">
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

export default Chatpage;
