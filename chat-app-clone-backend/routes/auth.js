import { Router } from "express";
import User from "../models/User.js";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
import { generateResponseObject, setTokenCookie } from "../utils/authUtils.js";

const router = Router();

//REGISTER
router.post("/register", async (req, res) => {
  console.log("register user api call", req.params, req.body);

  try {
    const newUser = new User({
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      password: CryptoJS.AES.encrypt(
        req.body.password,
        process.env.PASS_SEC
      ).toString(),
    });
    const savedUser = await newUser.save();

    const responseObj = generateResponseObject(savedUser);

    setTokenCookie(res, savedUser.accessToken);

    res.status(201).json(responseObj);
  } catch (err) {
    console.log("error in register user api call", err);
    res.status(500).json(err);
  }
});

//LOGIN

router.post("/login", async (req, res) => {
  console.log("login user api call", req.params, req.body);
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json("Wrong credentials!");
    }

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );
    const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    console.log("OriginalPassword", OriginalPassword);

    console.log("req.body.password", req.body.password);
    console.log(
      "OriginalPassword !== req.body.password",
      OriginalPassword !== req.body.password
    );

    if (OriginalPassword !== req.body.password) {
      return res.status(401).json("Wrong credentials!");
    }

    const responseObj = generateResponseObject(user);

    console.log("cookie token is ", responseObj.accessToken);

    setTokenCookie(res, responseObj.accessToken);

    console.log("user login success", responseObj);

    return res.status(200).json(responseObj);
  } catch (err) {
    console.log("error in login user api call", err);
    return res.status(500).json(err);
  }
});

export default router;
