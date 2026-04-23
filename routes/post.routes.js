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
import {
  validate,
  createPostSchema,
  commentSchema,
} from "../middleware/validate.middleware.js";

const router = express.Router();

router.post("/", protect, upload.single("image"), validate(createPostSchema), createPost);
router.get("/", getPosts);
router.get("/:id", getPostById);
router.put("/:id", protect, updatePost);
router.delete("/:id", protect, deletePost);
router.post("/:id/comment", protect, validate(commentSchema), addComment);
router.put("/:id/like", protect, toggleLike);

export default router;
