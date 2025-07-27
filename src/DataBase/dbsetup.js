import { db } from '../Authentication/config';
import { doc, setDoc } from 'firebase/firestore';

export const createUserProfile = async (uid, email, username) => {
  try {
    const reference = doc(db, 'users', uid);

    await setDoc(reference, {
      uid,
      email,
      username,
      createdAt: new Date(),
    });

    
    return true;
  } catch (error) {
    console.error('❌ Firestore Error:', error.message);
    return false;
  }
};


