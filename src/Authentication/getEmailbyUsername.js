import { query, collection, where, getDocs } from "firebase/firestore";
import { db } from "./config";

export const getemailbyusername = async (username) => {
  // Validate input
  if (!username || typeof username !== 'string' || username.trim() === '') {
    console.error("Invalid username provided");
    throw new Error("Username must be a non-empty string");
  }

  try {
    const userRef = collection(db, "users");
    const q = query(userRef, where('username', '==', username.trim().toLowerCase()));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log(`Username "${username}" not found`);
      return null; // Return null instead of undefined for better handling
    }

    // Get the first matching user's data
    const userDoc = querySnapshot.docs[0];
    const userData = userDoc.data();
    
    // Validate the returned data
    if (!userData.email) {
      console.error("User found but no email exists");
      return null;
    }

    return {
      id: userDoc.id,  // Include document ID
      email: userData.email,
      username: userData.username,
      // Include any other relevant fields
      ...userData
    };

  } catch (error) {
    console.error(`Error getting user data for username "${username}":`, error);
    throw error; // Re-throw for calling code to handle
  }
};