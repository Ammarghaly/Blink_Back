import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: "",
  },
});
export default mongoose.model("User", userSchema);