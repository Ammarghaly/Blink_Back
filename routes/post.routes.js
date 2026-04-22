import express from "express";
import {
  createPost,
  addComment,
  getPosts,
  toggleLike,
  getPostById,
  updatePost,
  deletePost,
} from "../controllers/post.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";

const router = express.Router();

router.post("/", protect, upload.single("image"), createPost);router.post("/", protect, createPost);
router.get("/", getPosts);
router.post("/:postId/comment", protect, addComment);
router.put("/:postId/like", protect, toggleLike);
router.get("/:id", getPostById);
router.put("/:id", protect, updatePost);
router.delete("/:id", protect, deletePost);

export default router;
