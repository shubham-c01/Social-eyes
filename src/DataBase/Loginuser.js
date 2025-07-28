// loginuser.js
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export const loginuser = async (email, password) => {
  const auth = getAuth();
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    if (user) {
      alert("✔ Logged in Successfully");
    }
    return user;
  } catch (error) {
    console.error("Login Error:", error.message);
    alert("❌ Login failed: " + error.message);
    return null;
  }
};
