import React, { useState } from 'react';
import { searchUsers } from '../DataBase/SearchUsers';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { getAuth } from 'firebase/auth';

function Mainpage() {
  const [username, setusername] = useState('');
  const [result, setresult] = useState([]);
  const auth = getAuth();
  const currentUser = auth.currentUser;

  const searchdb = async (e) => {
    const value = e.target.value;
    setusername(value);

    if (value.trim() === '') {
      setresult([]);
      return;
    }

    try {
      const userdata = await searchUsers(value.trim());

      // ✅ Exclude current user from results
      const filteredUsers = userdata.filter(
        (user) => user.uid !== currentUser?.uid
      );

      setresult(filteredUsers);
    } catch (error) {
      console.log('error finding user', error);
      setresult([]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F3FF] via-purple-100 to-purple-300 font-sans flex justify-center items-center px-4">
      <div className="w-full max-w-xl bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-purple-200">
        
        {/* Heading */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-purple-800 mb-1">Find Friends to Chat 💬</h1>
          <p className="text-sm text-purple-500">Search by username and start a conversation</p>
        </div>

        {/* Search Bar */}
        <input
          type="search"
          onChange={searchdb}
          value={username}
          placeholder="🔍 Search your mates..."
          className="w-full py-3 px-5 rounded-full bg-white backdrop-blur-md shadow-md border border-purple-300 text-[#1E1B4B] placeholder:text-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
        />

        {/* Search Results */}
        <div className="mt-6 space-y-4">
          {result.length > 0 ? (
            result.map((user) => (
              <Link
                key={user.id}
                to={`/chat/${user.id}`}
                className="flex items-center gap-4 bg-white/90 hover:bg-white rounded-xl shadow-md px-4 py-3 transition-all duration-300 border border-purple-200"
              >
                <FaUserCircle className="text-purple-600 text-3xl" />
                <span className="text-[#1E1B4B] font-medium text-base">{user.username}</span>
              </Link>
            ))
          ) : (
            username.trim() !== '' && (
              <div className="text-center text-purple-500 mt-6 flex flex-col items-center">
                <FaUserCircle className="text-5xl mb-2 text-purple-300" />
                <span>No user found...</span>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default Mainpage;
