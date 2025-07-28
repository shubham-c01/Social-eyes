import { db } from "../conf";
import { setDoc, doc, serverTimestamp, getDoc } from "firebase/firestore";

export const generateChatId = (user1, user2) => {
  if (!user1 || !user2) throw new Error('Both user IDs are required');
  return [user1, user2].sort().join('_');
};

export const createOrOpenChat = async (currentUserId, otherUserId) => {
  try {
    const chatId = generateChatId(currentUserId, otherUserId);
    const chatRef = doc(db, "chats", chatId);
    const chatSnap = await getDoc(chatRef);

    if (!chatSnap.exists()) {
      await setDoc(chatRef, {
        participants: {
          [currentUserId]: true,
          [otherUserId]: true,
        },
        initiator: currentUserId,
        recipient: otherUserId,
        createdAt: serverTimestamp(),
        lastUpdated: serverTimestamp(),
      });
    }

    return chatId;
  } catch (error) {
    console.error("Chat creation failed:", error);
    throw error;
  }
};
