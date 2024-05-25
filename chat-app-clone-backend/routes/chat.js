import Router from "express";
import mongoose from "mongoose";

import Conversation from "../models/Conversation.js";
import Chat from "../models/Chat.js";
import { verifyToken } from "../utils/authUtils.js";

const router = Router();

router.get("/:ConversationId", verifyToken, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.ConversationId)) {
      return res.status(400).json({ message: "Invalid ID " });
    }

    const chatsRes = await Chat.find({
      conversation: req.params.ConversationId,
    }).populate("sender", "name email");

    return res.status(200).json(chatsRes);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.post("/:ConversationId", verifyToken, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.ConversationId)) {
      return res.status(400).json({ message: "Invalid ID " });
    }

    const convoResponse = await Conversation.findOne({
      _id: req.params.ConversationId,
      members: { $in: [req.user._id] },
    });

    if (!convoResponse) {
      return res.status(404).json({ message: "Invalid conversations" });
    }

    const newChat = new Chat({
      sender: req.user._id,
      message: req.body.message,
      conversation: req.params.ConversationId,
    });

    const savedChat = await newChat.save();
    const getChat = await Chat.findById(savedChat._id).populate("sender", "name email");
    

    return res.status(200).json({
      message: "Message sent",
      content: getChat,
    });
  } catch (err) {
    return res.status(500).json(err);
  }
});

export default router;
