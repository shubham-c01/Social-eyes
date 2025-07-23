import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { createUserProfile } from '../conf'; // Removed auth

function Entry() {
  const navigate = useNavigate();
  const [phoneFocused, setPhoneFocused] = useState(false);
  const [showotpbox, setShowOtpBox] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log('Form Data:', data);
    
    try {
      // 🔥 Fake UID for dev testing
      const fakeUID = 'dev-test-001';

      const createdProfile = await createUserProfile(fakeUID, data.username, data.phonenumber);
      if (createdProfile) {
        setShowOtpBox(true);
        console.log('Data saved to Firestore successfully');
      } else {
        alert('User profile creation failed');
      }
    } catch (error) {
      console.error('Error in creating user profile:', error);
      alert('Error saving data to Firestore');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F3FF] via-purple-100 to-purple-300 font-sans flex justify-center items-center px-4">
      <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-xl p-10 w-full max-w-xl text-center">
        <img
          src="/AppLogo.png"
          alt="App Logo"
          className="mx-auto w-[120px] h-auto"
        />

        <p className="text-[#1E1B4B] text-lg mt-4">
          It's Superfun & Supereasy using <strong>Social-Eyes</strong>
        </p>

        <h3 className="text-[#1E1B4B] text-2xl font-bold mt-6">
          Register Yourself
        </h3>

        <form
          className="flex flex-col space-y-5 mt-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Username Field */}
          <div className="text-left">
            <label className="block text-sm text-[#1E1B4B] font-medium mb-1">
              Username
            </label>
            <input
              type="text"
              placeholder="Enter your username"
              className="w-full p-3 bg-white/80 rounded-md border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
              {...register('username', { required: true })}
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">Username is required</p>
            )}
          </div>

          {/* Phone Number Field */}
          <div className="text-left">
            <label className="block text-sm text-[#1E1B4B] font-medium mb-1">
              Phone Number
            </label>
            <Controller
              name="phonenumber"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <PhoneInput
                  {...field}
                  country="in"
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                  onFocus={() => setPhoneFocused(true)}
                  onBlur={() => setPhoneFocused(false)}
                  
                  inputStyle={{
                    width: '100%',
                    height: '42px',
                    paddingLeft: '58px',
                    paddingRight: '12px',
                    borderRadius: '6px',
                    border: phoneFocused ? '2px solid #A78BFA' : '1px solid #E9D5FF',
                    backgroundColor: 'rgba(255, 255, 255, 0.85)',
                    fontFamily: 'sans-serif',
                    fontSize: '1rem',
                    boxShadow: phoneFocused ? '0 0 0 1px #A78BFA' : 'none',
                  }}
                  buttonStyle={{
                    width: '50px',
                    border: 'none',
                    background: 'transparent',
                  }}
                  containerStyle={{
                    width: '100%',
                  }}
                  dropdownStyle={{
                    borderRadius: '6px',
                    marginTop: '5px',
                    width: '360px',
                  }}
                  enableSearch
                  inputProps={{
                    name: 'phone',
                    required: true,
                  }}
                />
              )}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">Phone number is required</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-[#1E1B4B] text-white py-3 rounded-md hover:bg-indigo-700 transition-all duration-300 font-medium"
            >
              Register
            </button>
          </div>

          {/* OTP Box (Only After Submit) */}
          {showotpbox && (
            <div className="text-center mt-4">
              <input
                {...register('otp', { required: true })}
                className="bg-white/80 text-[#1E1B4B] font-medium py-2 px-4 rounded-md border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your OTP"
                type="number"
              />
              <button onClick={()=>{
                  reset({
                    username:'',
                    phonenumber:''
                },
              {
        keepErrors: true,       // Keeps field error states
        keepDirty: false,       // Reset dirty fields
        keepTouched: false,     // Reset touched states
        keepValues: false       // Clears specific field values
      })

              }
              
              } className="ml-3 bg-purple-600 text-white font-semibold py-2 px-4 rounded hover:bg-purple-700 transition duration-300">
                Check OTP
              </button>
              <p className="text-green-500 text-sm mt-2">Registration successful!</p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default Entry;
