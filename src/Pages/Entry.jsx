import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import 'react-phone-input-2/lib/style.css';
import { Eye, EyeClosed } from 'lucide-react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { createUserProfile } from '../conf';

function Entry() {
  const [loader, setLoader] = useState(false);
  const [modalLoader, setModalLoader] = useState(false);
  const [showpassword, setShowPassword] = useState(false);
  const [modal, setmodal] = useState(false);
  const [uid, setUid] = useState(null);
  const [email, setEmail] = useState(null);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoader(true);
    try {
      const auth = getAuth();
      const credential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const user = credential.user;

      if (user) {
        setUid(user.uid);
        setEmail(data.email);
        setmodal(true);
        alert("✔ User registered successfully!");
      }
    } catch (error) {
      alert("❌ Error occurred while creating account: " + error.message);
    } finally {
      setLoader(false);
    }
  };

  const registeruser = async () => {
    if (!uid || !username || !email) {
      alert("❌ Missing info to save profile.");
      return;
    }

    setModalLoader(true);
    const saved = await createUserProfile(uid, email, username);
    setModalLoader(false);

    if (saved) {
      alert("✅ Profile saved successfully!");
      navigate("/login");
    } else {
      alert("❌ Failed to save profile.");
    }
  };

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-[#F5F3FF] via-purple-100 to-purple-300 font-sans flex justify-center items-center px-4">

      {/* Main loader */}
      {loader && (
        <div className="absolute inset-0 z-50 bg-white/60 backdrop-blur-md flex flex-col items-center justify-center rounded-xl shadow-lg">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 rounded-full border-4 border-purple-400 border-t-transparent animate-spin" />
            <div className="absolute inset-3 rounded-full bg-white shadow-inner" />
          </div>
          <h2 className="text-[#1E1B4B] mt-5 text-lg font-bold">Getting Things Ready...</h2>
          <p className="text-sm text-[#4B5563]">Please wait while we set you up</p>
        </div>
      )}

      {/* Username Modal */}
      {modal && (
        <div className="absolute inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white/80 rounded-2xl shadow-xl p-6 w-full max-w-sm">
            <h2 className="text-[#1E1B4B] text-xl font-bold mb-4 text-center">
              Enter Your Social-Eyes Username
            </h2>

            <form className="flex flex-col space-y-4">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-3 bg-white/90 rounded-md border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="username"
              />

              <button
                type="button"
                className="w-full py-3 bg-[#1E1B4B] text-white rounded-full hover:bg-[#2C2A6B] transition-all duration-300 font-semibold"
                onClick={registeruser}
                disabled={modalLoader}
              >
                {modalLoader ? 'Saving...' : 'Done'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Main Form */}
      <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-xl p-10 w-full max-w-xl text-center relative z-10">
        <img src="/AppLogo.png" alt="App Logo" className="mx-auto w-[120px]" />
        <p className="text-[#1E1B4B] text-lg mt-4">
          It's Superfun & Supereasy using <strong>Social-Eyes</strong>
        </p>
        <h3 className="text-[#1E1B4B] text-2xl font-bold mt-6">Register Yourself</h3>

        <form className="flex flex-col space-y-5 mt-6" onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <div className="text-left">
            <label className="block text-sm text-[#1E1B4B] font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 bg-white/80 rounded-md border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
              {...register('email', { required: 'Email is required' })}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div className="text-left relative">
            <label className="block text-sm text-[#1E1B4B] font-medium mb-1">Password</label>
            <input
              type={showpassword ? 'text' : 'password'}
              placeholder="Enter your password"
              className="w-full p-3 bg-white/80 rounded-md border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 pr-12"
              {...register('password', {
                required: 'Password is required',
                pattern: {
                  value: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/,
                  message:
                    'Password must have 8+ characters, 1 uppercase, 1 number, 1 special character',
                },
              })}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showpassword)}
              className="absolute top-9 right-3 text-[#1E1B4B]"
            >
              {showpassword ? <Eye size={20} /> : <EyeClosed size={20} />}
            </button>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Submit */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-[#1E1B4B] text-white py-3 rounded-md hover:bg-indigo-700 transition-all duration-300 font-medium"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Entry;
