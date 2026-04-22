import mongoose from "mongoose";


const commentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
   text: String,
});


const PostSchema = new mongoose.Schema({
  title: {
    required: true,
    type: String,
  },
  content: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: "",
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  comments: [commentSchema],
});
export default mongoose.model("Post", PostSchema);