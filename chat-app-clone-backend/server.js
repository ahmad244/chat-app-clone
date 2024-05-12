import http from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

// import userRoute from "./routes/user.js";
import authRoute from "./routes/auth.js";
import contactRoute from "./routes/contact.js";
import conversationRoute from "./routes/conversation.js"; 
import chatRoute from "./routes/chat.js";
import socketLogic from "./routes/socket.js";

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });

const app = express();
const httpServer = http.createServer(app);

const corsOptions = {
  origin: process.env.ORIGIN_URL,
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["Set-Cookie"],
  methods: ["GET", "POST", "PUT", "DELETE"],
};

app.use(express.json());
app.use(cookieParser());

//Rest API part
app.use(cors(corsOptions));
// app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/contact", contactRoute);
app.use("/api/conversation", conversationRoute);
app.use("/api/chat", chatRoute);

///dummy hello world route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Socket part
const io = new Server(httpServer, {
  cors: corsOptions,
});

socketLogic(io);

//Starting Server part
const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
