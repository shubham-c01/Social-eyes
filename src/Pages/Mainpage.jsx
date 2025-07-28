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

      // ✅ Exclude the current user from search results
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
    <div className="min-h-screen bg-gradient-to-br from-[#F5F3FF] via-purple-100 to-purple-300 font-sans flex justify-center items-start pt-20 px-4">
      <div className="w-full max-w-md">
        <input
          type="search"
          onChange={searchdb}
          value={username}
          placeholder=" Find your mates..."
          className="w-full py-2 px-5 rounded-full bg-white/70 backdrop-blur-md shadow-md border border-purple-300 text-[#1E1B4B] placeholder:text-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
        />

        <div className="mt-6 space-y-4">
          {result.length > 0 ? (
            result.map((user) => (
              <Link
                key={user.id}
                to={`/chat/${user.id}`}
                className="flex items-center gap-4 bg-white/80 hover:bg-white rounded-xl shadow-md px-4 py-3 transition-all duration-300 border border-purple-200"
              >
                <FaUserCircle className="text-purple-600 text-3xl" />
                <span className="text-[#1E1B4B] font-medium">{user.username}</span>
              </Link>
            ))
          ) : (
            username.trim() !== '' && (
              <div className="text-red-500 text-center mt-4">No user found...</div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default Mainpage;
