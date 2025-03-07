import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
  try {
    // Sb s pehle sender receiver ki id or message jo milega
    // phir conversation check krunga empty hai ya nh
    // Agr empty hui to create krunga new conversation, agr empty na hui to sirf push krunga message
    // Bs phir db m save kr k response bhejdunga
    
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

		// await conversation.save();
		// await newMessage.save();

		// this will run in parallel
		await Promise.all([conversation.save(), newMessage.save()]);

    res.status(201).json({newMessage})

  } catch (error) {
    res.status(500).json({ error: "Error sending message" });
  }
  console.log("Sending message");
};


export const getMessages = async (req, res) => {
	try {
		const { id: userToChatId } = req.params;
		const senderId = req.user._id;

		const conversation = await Conversation.findOne({
			participants: { $all: [senderId, userToChatId] },
		}).populate("messages"); // NOT REFERENCE BUT ACTUAL MESSAGES

		if (!conversation) return res.status(200).json([]);

		const messages = conversation.messages;

		res.status(200).json(messages);
	} catch (error) {
		console.log("Error in getMessages controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};
