import { Router } from "express";
import { verifyToken } from "../utils/authUtils.js";
import Conversation from "../models/Conversation.js";
import mongoose from "mongoose";

const router = Router();

router.post("/create", verifyToken, async (req, res) => {
  try {
    const newConversation = new Conversation({
      name: req.body.name,
      members: [req.user._id, ...req.body.memberIds],
    });
    await newConversation.save();

    return res
      .status(200)
      .json({ message: "Conversation created successfully" });
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.get("/", verifyToken, async (req, res) => {
  try {
    const convoResponse = await Conversation.find({
      members: { $in: [req.user._id] },
    })
      .populate("members", "email");

    if (convoResponse) {
      return res.status(200).json(convoResponse);
    } else {
      return res.status(404).json({ message: "No conversations found" });
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.get("/:id", verifyToken, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid ID " });
    }

    const convoResponse = await Conversation.findOne({
      _id: req.params.id,
      members: { $in: [req.user._id] },
    })
      .populate("members", "email")
    // TODO populate chats and their sender name/email
      // .populate("chats")
      // .populate("chats.sender", "email");

    if (convoResponse) {
      return res.status(200).json(convoResponse);
    } else {
      return res.status(404).json({ message: "No conversations found" });
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});


export default router;
