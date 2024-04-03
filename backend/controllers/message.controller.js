import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
  try {
    // Sb s pehle sender receiver ki id or message jo milega
    // phir conversation check krunga empty hai ya nh
    // Agr empty hui to create krunga new conversation, agr empty na hui to sirf push krunga message
    // Bs phir response bhejdunga
    const { message } = req.body;
    const senderId = req.user._id;
    const receiverId = req.params.id;

    let conversation = await Conversation.findOne({
      participants: {
        $all: [senderId, receiverId],
      },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }
    const newMessage = new Message({
        senderId,
        receiverId,
        message
    })
    if(newMessage){
        conversation.messages.push(newMessage._id);
    }

    res.status(201).json({newMessage})

  } catch (error) {
    res.status(500).json({ error: "Error sending message" });
  }
  console.log("Sending message");
};
