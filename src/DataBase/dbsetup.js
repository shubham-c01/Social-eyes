import { db } from '../Authentication/config';
import { doc, setDoc } from 'firebase/firestore';

export const createUserProfile = async (uid, username, phonenumber) => {
  try {
    const reference = doc(db, 'users', uid);

    await setDoc(reference, {
      uid,
      username,
      phonenumber,
      createdAt: new Date(),
    });

    console.log('✅ Profile created successfully for UID:', uid);
    return true;
  } catch (error) {
    console.error('❌ Firestore Error:', error.message);
    return false;
  }
};
