// loginuser.js
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import toast from 'react-hot-toast';

export const loginuser = async (email, password) => {
  const auth = getAuth();
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;


    return user;
  } catch (error) {
    toast.error('❌ Login failed: ' + error.message);
    return null;
  }
};
