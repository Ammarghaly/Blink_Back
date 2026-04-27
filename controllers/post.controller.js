import Post from "../models/Post.model.js";
import AppError from "../utils/AppError.js";
import { uploadToImgBB } from "../utils/uploadImage.js";

export const createPost = async (req, res, next) => {
  try {
    const { title, content } = req.body;

    let imageUrl = "";
    if (req.file) {
      imageUrl = await uploadToImgBB(req.file.buffer);
    }

    const post = await Post.create({
      title,
      content,
      image: imageUrl,
      author: req.user._id,
    });

    res.status(201).json({ success: true, post });
  } catch (err) {
    next(err);
  }
};

export const getPosts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const [posts, total] = await Promise.all([
      Post.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("author", "name email image")
        .populate("comments.user", "name image"),
      Post.countDocuments(),
    ]);

    res.json({
      success: true,
      total,
      page,
      pages: Math.ceil(total / limit),
      posts,
    });
  } catch (err) {
    next(err);
  }
};

export const getPostById = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("author", "name email image")
      .populate("comments.user", "name image");

    if (!post) return next(new AppError("Post not found", 404));

    res.json({ success: true, post });
  } catch (err) {
    next(err);
  }
};
export const getPostsUserById = async (req, res, next) => {
  try {
    const post = await Post.find({ author: req.params.id })
      .populate("author", "name email image")
      .populate("comments.user", "name image")
      .sort({ createdAt: -1 });

    res.json({ success: true, post });
  } catch (err) {
    next(err);
  }
};

export const addComment = async (req, res, next) => {
  try {
    const { text } = req.body;

    const post = await Post.findById(req.params.id);
    if (!post) return next(new AppError("Post not found", 404));

    post.comments.push({ user: req.user._id, text });
    await post.save();

    await post.populate("comments.user", "name image");

    res.status(201).json({
      success: true,
      comments: post.comments.sort((a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      )
    });
  } catch (err) {
    next(err);
  }
};  

export const toggleLike = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return next(new AppError("Post not found", 404));

    const userId = req.user._id.toString();
    const alreadyLiked = post.likes.some((id) => id.toString() === userId);

    if (alreadyLiked) {
      post.likes = post.likes.filter((id) => id.toString() !== userId);
    } else {
      post.likes.push(req.user._id);
    }

    await post.save();

    res.json({
      success: true,
      likesCount: post.likes.length,
      liked: !alreadyLiked,
    });
  } catch (err) {
    next(err);
  }
};

export const updatePost = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    let imageUrl = "";
    if (req.file) {
      imageUrl = await uploadToImgBB(req.file.buffer);
    }

    const post = await Post.findById(req.params.id);
    if (!post) return next(new AppError("Post not found", 404));

    if (post.author.toString() !== req.user._id.toString()) {
      return next(new AppError("You are not allowed to update this post", 403));
    }

    post.title = title || post.title;
    post.content = content || post.content;
    post.image = imageUrl || post.image;

    await post.save();

    res.json({ success: true, post });
  } catch (err) {
    next(err);
  }
};

export const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return next(new AppError("Post not found", 404));

    if (post.author.toString() !== req.user._id.toString()) {
      return next(new AppError("You are not allowed to delete this post", 403));
    }

    await post.deleteOne();

    res.json({ success: true, message: "Post deleted successfully" });
  } catch (err) {
    next(err);
  }
};
