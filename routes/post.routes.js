import express from "express";
import {
  createPost,
  addComment,
  getPosts,
  toggleLike,
  getPostById,
  getPostsUserById,
  updatePost,
  deletePost,
} from "../controllers/post.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";
import {
  validate,
  postSchema,
  commentSchema,
} from "../middleware/validate.middleware.js";

const router = express.Router();

router.post("/", protect, upload.single("image"), validate(postSchema), createPost);
router.get("/", getPosts);
router.get("/:id", getPostById);
router.get("/user/:id",getPostsUserById);
router.patch("/:id", protect,upload.single("image"),validate(postSchema), updatePost);
router.delete("/:id", protect, deletePost);
router.post("/:id/comment", protect, validate(commentSchema), addComment);
router.put("/:id/like", protect, toggleLike);

export default router;
