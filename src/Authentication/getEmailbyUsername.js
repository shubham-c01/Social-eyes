import { db } from './config';
import { collection, query, where, getDocs } from 'firebase/firestore';

export const getemailbyusername = async (username) => {
  if (!username || typeof username !== 'string' || username.trim() === '') {
    console.error("Invalid username provided");
    throw new Error("Username must be a non-empty string");
  }

  try {
    const userRef = collection(db, "users");

    // ✅ Use exact match (case-sensitive)
    const q = query(userRef, where('username', '==', username.trim()));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.warn(`Username "${username}" not found`);
      return null;
    }

    const userDoc = querySnapshot.docs[0];
    const userData = userDoc.data();

    if (!userData.email) {
      console.error("User found but no email exists");
      return null;
    }

    return {
      id: userDoc.id,
      email: userData.email,
      username: userData.username,
      ...userData
    };

  } catch (error) {
    console.error(`Error getting user data for username "${username}":`, error);
    throw error;
  }
};
