import Post from "../models/Post.js";
import User from "../models/User.js";

/* CREATE */
export async function createPost(req, res) {
  try {
    const { userId, description, picturePath } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });
    await newPost.save();

    const post = await Post.find();
    res.status(201).json(post);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
}

/* READ */
export async function getFeedPosts(req, res) {
  try {
    const post = await Post.find();
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

export async function getUserPosts(req, res) {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

/* UPDATE */

export async function likePost(req, res) {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);
    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

/* DELETE */

export async function deletePost(req, res) {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    const deletedPost = await Post.deleteOne(post);
    if (deletedPost.deletedCount === 0) {
      return res.status(404).send({ message: "Post not found" });
    }

    res.status(200).json(deletedPost);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
}
