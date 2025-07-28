import { collection, getDocs } from "firebase/firestore";
import { db } from "../conf";

export const fetchAllUsersExceptCurrent = async (currentUserId) => {
  try {
    const ref = collection(db, "users");
    const snapshot = await getDocs(ref);
    const users = snapshot.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }))
      .filter((user) => user.uid !== currentUserId); // 👈 exclude self

    return users;
  } catch (error) {
    console.error("Error fetching users", error);
    return [];
  }
};
