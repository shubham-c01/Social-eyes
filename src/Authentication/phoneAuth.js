import { getAuth, RecaptchaVerifier,signInWithPhoneNumber } from "firebase/auth";

const auth = getAuth();
export const setupRecaptcha=(phonenumber,setotpsent,setconfirmationresult)=>{
    window.recaptchaVerifier = new RecaptchaVerifier( 'sign-in-button', {
  'size': 'invisible',
  'callback': (response) => {
    // reCAPTCHA solved, allow signInWithPhoneNumber.
    handleotpSubmit(phonenumber,setotpsent,setconfirmationresult)
  },
  
},auth);


}

const handleotpSubmit=async (phonenumber,setotpsent,setconfirmationresult)=>{
    try {
        const verifier= window.recaptchaVerifier
        const confirmationresult=await signInWithPhoneNumber(auth,phonenumber,verifier)//this will provide an otp
        setotpsent(true),
        setconfirmationresult(confirmationresult)
        
        
    } catch (error) {
        alert("Error sending OTP ",error.message)
        
    }

}