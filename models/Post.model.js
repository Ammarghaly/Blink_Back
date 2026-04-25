import mongoose from "mongoose";


const commentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

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
    default: null,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  comments: [commentSchema],
},{timestamps:true});
export default mongoose.model("Post", PostSchema);