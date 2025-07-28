import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../conf"; // ✅ Adjust path if needed
import { createCommonChatId } from "./Commonchatid"; // ✅ Ensure correct path

/**
 * Creates or opens a consistent chat between two users.
 * @param {string} currentUserId - Logged-in user's ID
 * @param {string} otherUserId - User to chat with
 * @returns {string} chatId - consistent chat document ID
 */
export const createOrOpenChat = async (currentUserId, otherUserId) => {
  try {
    if (!currentUserId || !otherUserId) {
      throw new Error("Invalid user IDs");
    }

    if (currentUserId === otherUserId) {
      throw new Error("Cannot chat with yourself");
    }
    
    

    // 🔄 Generate a sorted, consistent chat ID
    const chatId = createCommonChatId(currentUserId, otherUserId);
    console.log("currentchatid",chatId);
    
    
    

    const chatRef = doc(db, "chats", chatId);
    const chatSnap = await getDoc(chatRef);

    // ✅ Create new chat doc if it doesn’t exist
    if (!chatSnap.exists()) {
      await setDoc(chatRef, {
        participants: {
          [currentUserId]: true,
          [otherUserId]: true,
        },
        initiator: currentUserId,
        createdAt: serverTimestamp(),
        lastUpdated: serverTimestamp(),
      });
    }

    return chatId;
  } catch (error) {
    console.error("❌ Chat creation error:", error);
    throw error;
  }
};
