import { Router } from "express";
import { verifyToken } from "./verifyToken.js";
import User from "../models/User.js";
import mongoose from "mongoose";

const router = Router();

router.post("/add", verifyToken, async (req, res) => {
  const userId = req.user._id;
  const contactId = req.body.contactId;

  try {
    if (
      !mongoose.Types.ObjectId.isValid(userId) ||
      !mongoose.Types.ObjectId.isValid(contactId)
    ) {
      return res.status(400).json({ message: "Invalid ID format" });
    } else if (userId === contactId) {
      return res
        .status(403)
        .json({ message: "You cannot add yourself as a contact" });
    }

    const user = await User.findById(userId);
    const contact = await User.findById(contactId);

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    } else if (!user.contacts.includes(contactId)) {
      await user.updateOne({ $push: { contacts: contactId } });
      return res.status(200).json({ message: "Contact has been added" });
    } else {
      return res.status(403).json({ message: "You already have this contact" });
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.get("/", verifyToken, async (req, res) => {
  // console.log("get contacts userId: ", req.user._id, "email: ", req.user.email);
  try {
    const result = await User.findOne({ _id: req.user._id })
      .populate("contacts", "email name phoneNumber")
      .exec();

    return res.status(200).json(result.contacts);
  } catch (err) {
    return res.status(500).json(err);
  }
});

export default router;
