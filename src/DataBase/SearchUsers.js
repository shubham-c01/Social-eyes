// searchUsers.js
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../conf";

export const searchUsers = async (username) => {
  const ref = collection(db, 'users');
  const q = query(ref, where('username', '>=', username), where('username', '<=', username + '\uf8ff'));
  const snapshot = await getDocs(q);

  const users = [];
  snapshot.forEach(doc => {
    users.push({ id: doc.id, ...doc.data() });
  });

  return users;
};
