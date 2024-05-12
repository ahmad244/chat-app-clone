import { log } from "console";
import Conversation from "../models/Conversation.js";

export default function socketLogic(io) {
  io.on("connection", (socket) => {
    const id = socket.handshake.query.id;
    console.log(
      "user connected with id: ",
      id,
      "\n with socket id: ",
      socket.id
    );
    socket.join(id);

    socket.on("send-message", async ({  chat }) => {
      log("send-message", {  chat });

      const selectedConversation = await Conversation.findById(chat.conversation);

      const recipients = selectedConversation.members.map((m) => m.toString());

      // console.log("Conversation", selectedConversation, " members ", selectedConversation.members.map((m) => m.toString()));

      recipients.forEach((recipient) => {
        // const newRecipients = recipients.filter((r) => r !== recipient);
        // newRecipients.push(id);

        // console.log("receive-message,", {
        //   chat,
        // });
        console.log("recipient", recipient);

        socket.broadcast.to(recipient).emit("receive-message", {
          chat,
        });
      });
    });
  });
}
