import mongoose from "mongoose";

const { Schema, model } = mongoose;

const ConversationSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    members: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
    type: {
      type: String,
      default: "CHAT",
      // set validation to only be CHAT / GROUP / CHANNEL
      validate: {
        validator: function (v) {
          return v === "CHAT" || v === "GROUP" || v === "CHANNEL";
        },
        message: (props) =>
          `${props.value} is not a valid type! only accepts CHAT, GROUP, CHANNEL`,
      },
      required: true,
    },
    
  },
  { timestamps: true }
);

export default model("Conversation", ConversationSchema);
