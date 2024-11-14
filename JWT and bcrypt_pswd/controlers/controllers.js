const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const jwt=require("jsonwebtoken");
dotenv.config();
const User = require('../models/user.model');

async function getAllUsers(req, res) {
  try {
    const users = await User.find()
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "failed to get all users " });
  }
}

async function getUser(req, res) {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId)
    if (!user) return res.status(404).json({ message: `user not found for id:${userId}` });
    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "failed to get user" });
  }
}

async function login(req, res) {
  try {
    console.log(req.body);
    const users = await User.find({ Email: req.body.Email });
    console.log(users);
    if (users.length != 0) {
      const user = users[0];

      if (await bcrypt.compare(
        req.body.Password,//simple string from user
        user.Password//encrypted password from database
      )) 
      
      {  //JWT
        const key = process.env.JWT_SECRET_KEY
        const payLoad = { _id: user._id };
        const expiresInSeconds = Number(process.env.JWT_TOKEN_EXPIRES_IN);
        const token = await jwt.sign(payLoad, key, { expiresIn: expiresInSeconds });
        res.header(process.env.JWT_TOKEN_HEADER, token);
        return res.status(200).json({ token: token, user: users[0] });
      }
    }
    return res.status(404).json({ message: `invalid email or password` });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "failed to get user" });
  }
}


async function addUser(req, res) {
  try {
    const obj = {
      FullName: req.body.FullName,
      Email: req.body.Email,
      Password: await bcrypt.hash(req.body.Password, 10),
      Contacts: req.body.Contacts
    };
    const created = await User.create(obj);
    res.header("location", `${req.originalUrl}/${created._id}`);
    res.status(201).json(created);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "failed to add user" });
  }
}

async function updateUser(req, res) {
  try {
    const userId = req.params.id;
    const { Name, Email, Password, Contacts } = req.body;
    //await missing in   const pass=bcrypt.hash(Password,10);
    const pass = bcrypt.hash(Password, 10);
    const updated = await User.findByIdAndUpdate(userId, { Name, Email, pass, Contacts }, { new: true });
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
  login,
  addUser,
  updateUser,
  deleteUser
}