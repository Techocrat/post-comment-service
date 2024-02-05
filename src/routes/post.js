import express from "express";
import { createPost, getFeedPosts, getUserPosts, addComment } from "../controllers/post.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* POST */
router.post("/:userId/create", verifyToken, createPost);
router.post("/:postId/comment", verifyToken, addComment);

/* READ */
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);


export default router;
