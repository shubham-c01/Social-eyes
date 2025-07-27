import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();
export const loginuser=async(email,password)=>
  await signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    
    const user = userCredential.user;
    if (user) {
        alert("✔Logged in Successfully")
        
    }
    
  })
 