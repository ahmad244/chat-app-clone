import mongoose from "mongoose";


const { Schema, model } = mongoose;

const ChatSchema = new Schema(
    {
        sender: {
          type: Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        message: {
          type: String,
          required: true,
        },
        read: {
          type: [
            {
              type: Schema.Types.ObjectId,
              ref: "User",
            },
          ],
          default: [],
        },
        conversation: {
            type: Schema.Types.ObjectId,
            ref: "Conversation",
            required: true,
        }
      },
)

export default model("Chat", ChatSchema);