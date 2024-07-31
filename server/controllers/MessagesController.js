import Message from "../db/Message.js";

export const getMessages = async (request, response, next) => {
  try {
    const user1 = request.userId;
    const user2 = request.body.id;

    if (!user1 || !user2) {
      return response.status(400).send("Both user ID and chat ID are required.");
    }

    const messages = await Message.find({
      $or: [
        { sender: user1, recipient: user2 },
        { sender: user2, recipient: user1 }
      ]
    })
    .sort({ timeStamp: 1 })  
    .populate('sender', 'firstName lastName email color')
    .populate('recipient', 'firstName lastName email color');

    return response.status(200).json({ messages });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return response.status(500).send("Internal server error.");
  }
};
