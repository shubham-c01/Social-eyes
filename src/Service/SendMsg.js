import { db } from "../conf";
import {
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

import { createCommonChatId } from "./Commonchatid";

/**
 * Sends a message to Firestore under the appropriate chat ID.
 * @param {string} senderId - UID of the sender (current user)
 * @param {string} receiverId - UID of the receiver
 * @param {string} text - Message content
 */
export const sendmsgtofb = async (senderId, receiverId, text) => {
  try {
    if (!senderId || !receiverId || !text.trim()) {
      throw new Error("Missing input or user/chat context");
    }

    const chatId = createCommonChatId(senderId, receiverId);
    console.log("senderid",senderId);
    console.log("reciverid",receiverId);
    console.log("chatid",chatId);
    
    
    
    const ref = collection(db, "chats", chatId, "messages");

    await addDoc(ref, {
      senderId,
      text,
      timestamp: serverTimestamp(),
    });
  } catch (error) {
    console.error("❌ Failed to send message:", error);
    throw error;
  }
};

/**
 * Listens to messages in real-time for a given chat ID.
 * @param {string} chatId - The ID of the chat document
 * @param {Function} callback - Callback to update messages state
 * @returns {Function} Unsubscribe function to stop listening
 */
export const listenTomsg = (chatId, callback) => {
  if (!chatId || typeof callback !== "function") {
    console.error("❌ Invalid chatId or callback function");
    return () => {}; // Return dummy unsubscribe
  }

  const msgsRef = collection(db, "chats", chatId, "messages");
  const q = query(msgsRef, orderBy("timestamp"));

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const msgs = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(msgs);
  });

  return unsubscribe;
};
