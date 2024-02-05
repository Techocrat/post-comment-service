import Post from "../models/Post.js";
import User from "../models/User.js";

/* CREATE */
export const createPost = async (req, res) => {
  try {
    const { userId } = req.params;
    const { description } = req.body;

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create a new post
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      likes: {},
      comments: [],
    });

    await newPost.save();

    // Return the newly created post
    res.status(201).json({ message: "Post created successfully", post: newPost });
  } catch (err) {
    console.error("Error creating post:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/* READ */
export const getFeedPosts = async (req, res) => {
  try {
    // Fetch all posts
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (err) {
    console.error("Error fetching feed posts:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;

    // Fetch posts for a specific user
    const posts = await Post.find({ userId });

    if (posts.length === 0) {
      return res.status(404).json({ message: "User has no posts" });
    }

    res.status(200).json(posts);
  } catch (err) {
    console.error("Error fetching user posts:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/* CREATE COMMENT */
export const addComment = async (req, res) => {
    try {
      const { postId } = req.params;
      const { userId, text } = req.body;
  
      // Check if user and post exist
      const user = await User.findById(userId);
      const post = await Post.findById(postId);

      if (!user || !post) {
        return res.status(404).json({ message: "User or Post not found" });
      }
  
      // Add comment to the post
      const newComment = {
        userId,
        text,
      };

      post.comments.push(newComment);
      await post.save();
  
      // Return the updated post with the new comment
      res.status(201).json({ message: "Comment added successfully", post });
    } catch (err) {
      console.error("Error adding comment:", err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
