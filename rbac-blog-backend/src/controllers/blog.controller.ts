import { Request, Response } from "express";
import Blog from "../models/Blog.model";

export const createPost = async (req: Request, res: Response) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }

    const newPost = await Blog.create({
      title,
      content,
      author: req.user?.userId,
    });

    res.status(201).json({
      message: "Post created successfully",
      post: newPost,
    });

  }
  catch (error) {
    res.status(500).json({
      message: "Failed to create post",
      error: error,
    });
  }
}

export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Blog.find().populate("author", "name email");
    res.status(200).json(posts);
  }
  catch (error) {
    res.status(500).json({
      message: "Failed to fetch posts",
      error: error,
    });
  }
}

export const getPostById = async (req: Request, res: Response) => {
  try {
    const postId = req.params.id;
    const post = await Blog.findById(postId).populate("author", "name email");

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json(post);
  }
  catch (error) {
    res.status(500).json({
      message: "Failed to fetch post",
      error: error,
    });
  }
}

export const updatePost = async (req: Request, res: Response) => {
  try {
    const post = await Blog.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true });
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json({
      message: "Post updated successfully",
      post: post,
    });

  }
  catch (error) {
    res.status(500).json({
      message: "Failed to update post",
      error: error,
    });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const post = await Blog.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json({
      message: "Post deleted successfully",
      post: post,
    });
  }
  catch (error) {
    res.status(500).json({
      message: "Failed to delete post",
      error: error,
    });
  }
}
