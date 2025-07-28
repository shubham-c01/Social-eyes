// utils/chatUtils.js
export const createCommonChatId = (userId1, userId2) => {
  const sortedIds = [userId1, userId2].sort(); // alphabetical order
  return `${sortedIds[0]}_${sortedIds[1]}`;
};
