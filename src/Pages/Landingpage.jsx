import React from 'react';
import { useNavigate } from 'react-router-dom';
function Landingpage() {
  const navigate= useNavigate();
  const  handleclick=()=>{
    navigate('/entry');
}
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F3FF] via-purple-100 to-purple-300 font-sans">
      
      {/* Top Section */}
      <div className="text-center pt-4">
        <h1 className="text-3xl text-[#1E1B4B] font-bold font-sans">
          Welcome to Social-Eyes
        </h1>
        <p className="text-[#1E1B4B] mt-1 font-sans">Let's Create – Connect & Collect</p>
        <img
          src="/AppLogo.png"
          alt="App Logo"
          className="mx-auto w-[120px] h-auto mt-1"
        />
      </div>

      {/* Main Split Section */}
      <div className="flex flex-col md:flex-row items-center justify-center px-4">
        {/* About Section */}
        <div className="w-full md:w-2/5 text-[#1E1B4B] p-2">
          <h2 className="text-2xl font-bold mb-2 text-center font-sans">/About</h2>
          <p className="text-sm mb-2">
            <strong className='font-sans'>Social-eyes</strong> is a fresh take on modern social communication. It’s designed to bring people together in the simplest way possible — with just your phone number, you can instantly get started. No complicated steps, no cluttered UI — just pure connection.
          </p>
          <p className="text-sm mb-2 font-sans">The workflow is designed to be frictionless:</p>
          <ul className="text-sm mb-3 ml-5 list-disc space-y-1 font-sans">
            <li><strong>Sign in</strong> using your mobile number — no password required.</li>
            <li><strong>Search</strong> for your friends on the platform — or let them find you.</li>
            <li><strong>Start chatting</strong> instantly with a clean, real-time interface.</li>
          </ul>
          <p className="text-sm font-sans">
            Whether you’re looking to stay in touch with close friends or explore new social circles, Social-eyes gives you a space that feels lightweight, personal, and truly yours.
          </p>
        </div>

        {/* Illustration Section (inside same flex row) */}
        <div className="w-full md:w-3/5 flex justify-center">
          <img
            src="/illustration.png"
            alt="Social Illustration"
            className="w-full max-w-md h-auto md:h-[390px] object-contain"
          />
        </div>
      </div>

      {/* Button Section */}
      <div className="text-center py-5 ">
        <div className="inline-block">
           <button type='button' onClick={handleclick} className="bg-purple-600 text-white font-semibold py-2 px-4 rounded hover:bg-purple-700 transition duration-300 font-sans">Get Started</button>
        </div>
      </div>
    </div>
  );
}

export default Landingpage;
