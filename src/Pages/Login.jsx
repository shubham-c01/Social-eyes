import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Eye, EyeClosed } from 'lucide-react';
import { motion } from 'framer-motion';
import { loginuser } from '../DataBase/Loginuser';
import { getemailbyusername } from '../Authentication/getEmailbyUsername';
function Login() {
  const [loader, setLoader] = useState(false);
  const [showpassword, setShowPassword] = useState(false);
  const [modal, setmodal] = useState(false);
 
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

const onlogin = async (data) =>{
     const {username,password}=data
    
    try {
        setLoader(true)

        const email=await getemailbyusername(username.trim())
        //console.log(u);
        
        const UserEmail=email.email
        
        if (email) {
        const usercred=  await loginuser(UserEmail,password)
         console.log("logged in success",usercred);
         setLoader(false)
         navigate('/mainpage')
         

            
        }
       
        
    } catch (error) {
        console.log("Error loging in user",error);
        
        
    }
}



 

  return (
    <motion.div
      className="min-h-screen relative bg-gradient-to-br from-[#F5F3FF] via-purple-100 to-purple-300 font-sans flex justify-center items-center px-4"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeIn' }}
    >
      {/* Loader */}
      {loader && (
        <div className="absolute inset-0 z-50 bg-white/60 backdrop-blur-md flex flex-col items-center justify-center rounded-xl shadow-lg">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 rounded-full border-4 border-purple-400 border-t-transparent animate-spin" />
            <div className="absolute inset-3 rounded-full bg-white shadow-inner" />
          </div>
          <h2 className="text-[#1E1B4B] mt-5 text-lg font-bold">Logging in....</h2>
        </div>
      )}


      {/* Main Form */}
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
        <h3 className="text-[#1E1B4B] text-2xl font-bold mt-6">Login </h3>

        <form className="flex flex-col space-y-5 mt-6" onSubmit={handleSubmit(onlogin)}>
          {/* Email */}
          <div className="text-left">
            <label className="block text-sm text-[#1E1B4B] font-medium mb-1">Username</label>
            <input
              type="text"
              placeholder="Enter your Username"
              className="w-full p-3 bg-white/80 rounded-md border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
              {...register('username', { required: 'username is required' })}
            />
            {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>}
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
              Login
            </button>
          </div>
          
        </form>
      </motion.div>
    </motion.div>
  );
}

export default Login;
