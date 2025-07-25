import React from 'react';
import { db } from '../conf';

function Mainpage() {
  const searchdb=()=>{

  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F3FF] via-purple-100 to-purple-300 font-sans flex justify-center items-start pt-20 px-4">
      <div className="w-full max-w-md ">
        <input
          type="search"
          onChange={searchdb}
          placeholder=" Find your mates..."
          className="w-full py-1 px-5 rounded-full bg-white/70 backdrop-blur-md shadow-md border border-purple-300 text-[#1E1B4B] placeholder:text-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
        />
        <h1>hello world</h1>
      </div>
      
    </div>
  );
}

export default Mainpage;
