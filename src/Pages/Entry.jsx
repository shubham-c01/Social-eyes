import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Eye, EyeClosed } from 'lucide-react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { createUserProfile } from '../conf';
import { isUsernameTaken } from '../DataBase/getdata';
import { easeIn, motion } from 'framer-motion';
import toast from 'react-hot-toast';

function Entry() {
  const [loader, setLoader] = useState(false);
  const [modalLoader, setModalLoader] = useState(false);
  const [showpassword, setShowPassword] = useState(false);
  const [modal, setmodal] = useState(false);
  const [uid, setUid] = useState(null);
  const [email, setEmail] = useState(null);
  const [username, setUsername] = useState('');
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
        toast.success('✔ User registered successfully!');
      }
    } catch (error) {
      toast.error('❌ Error occurred while creating account: ' + error.message);
    } finally {
      setLoader(false);
    }
  };

  const registeruser = async () => {
    if (!uid || !username || !email) {
      toast.error('❌ Missing info to save profile.');
      return;
    }

    const taken = await isUsernameTaken(username.trim());
    if (taken) {
      toast.error('❌ Username already exists. Please choose a different one.');
      return;
    }

    setModalLoader(true);
    const saved = await createUserProfile(uid, email, username.trim());
    setModalLoader(false);

    if (saved) {
      toast.success('✅ Profile saved successfully!');
      navigate('/login');
    } else {
      toast.error('❌ Failed to save profile.');
    }
  };

  return (
    <motion.div
      className="min-h-screen relative bg-gradient-to-br from-[#F5F3FF] via-purple-100 to-purple-300 font-sans flex justify-center items-center px-4"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeIn' }}
    >
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

      {modal && (
        <motion.div
          className="absolute inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="bg-white/80 rounded-2xl shadow-xl p-6 w-full max-w-sm"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
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
          </motion.div>
        </motion.div>
      )}

      <motion.div
        className="bg-white/70 backdrop-blur-md rounded-2xl shadow-xl p-10 w-full max-w-xl text-center relative z-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <img src="/AppLogo.png" alt="App Logo" className="mx-auto w-[120px]" />
        <p className="text-[#1E1B4B] text-lg mt-4">
          It's Superfun & Supereasy using <strong>Social-Eyes</strong>
        </p>
        <h3 className="text-[#1E1B4B] text-2xl font-bold mt-6">Register Yourself</h3>

        <form className="flex flex-col space-y-5 mt-6" onSubmit={handleSubmit(onSubmit)}>
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

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-[#1E1B4B] text-white py-3 rounded-md hover:bg-indigo-700 transition-all duration-300 font-medium"
            >
              Register
            </button>
          </div>
          <div>
            <p>
              Already Have an account ?
              <a
                className="underline text-blue-500 hover:cursor-default"
                onClick={() => navigate('/login')}
              >
                {' '}
                Login Here
              </a>
            </p>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

export default Entry;
