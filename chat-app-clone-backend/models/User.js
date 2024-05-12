import mongoose from "mongoose";

const { Schema, model } = mongoose;

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: function (v) {
          return /^[_a-z0-9-]+(.[a-z0-9-]+)*(.[a-z0-9-]{2,4})@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$/.test(
            v
          );
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      minlength: [3, "Name must be at least 3 characters long"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone number is required"],
      minlength: [10, "Phone number must be at least 10 characters long"],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    img: { type: String },
    isActive: {
      type: Boolean,
      default: true,
    },
    contacts: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

export default model("User", UserSchema);
