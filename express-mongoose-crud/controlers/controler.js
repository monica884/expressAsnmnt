
const dotenv=require("dotenv");
dotenv.config();
const User = require("../models/user.model");
const Post = require("../models/post.model");

const { use } = require("../routes/user.routes");

async function getAllUsers(req, res) {
  try {
    const users = await User.find().populate("Post");
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "failed to get all users " });
  }
}

async function getUser(req, res) {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId).populate("Post");
    if (!user) return res.status(404).json({ message: `user not found for id:${userId}` });
    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "failed to get user" });
  }
}


async function updateUser(req, res) {
  try {
    const userId = req.params.id;
    const { FullName, Email, Password, Contacts, Post } = req.body;
    const pass=bcrypt.hash(Password,10);
    const updated = await User.findByIdAndUpdate(userId, { FullName, Email, pass, Contacts, Post }, { new: true });
    if (!updated) return res.status(404).json({ message: `failed to update because it is not found` });
    return res.status(200).json(updated);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "failed to update user" });
  }
}

async function deleteUser(req, res) {
  try {
    const userId = req.params.id;
    const deleted = await User.findByIdAndDelete(userId);
    if (!deleted) return res.status(404).json({ message: `failed to delete because it is not found` });
    return res.status(200).json(deleted);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Failed to delete user` });
  }
}

module.exports = {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser
}