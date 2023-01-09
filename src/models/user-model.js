import mongoose from "mongoose";

const { Schema, model } = mongoose;

const UserSchema = new Schema({
  name: { type: String, required: true },
});

export default model("User", UserSchema);
