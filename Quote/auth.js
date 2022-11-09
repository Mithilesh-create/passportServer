const express = require("express");
const cors = require("cors");
const auth = express();
const { hashSync, compareSync } = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../schema/User");
auth.use(express.json());
auth.use(cors());

auth.get("/", (req, res) => {
  res.status(200).json("Hello");
});
auth.post("/register", async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const checkUseremail = await User.findOne({ email });
    if (checkUseremail) return res.status(200).send("Email already exists");
    const passwordHashed = hashSync(`${password}`, 10);
    const createNewUser = await User.create({
      username,
      email,
      password: passwordHashed,
    });
    const data = {
      username: createNewUser.username,
      id: createNewUser._id,
    };
    const token = jwt.sign(data, process.env.SECRET_KEY, { expiresIn: "1d" });
    return res.status(201).json({
      message: "Success",
      data: {
        token: "Bearer " + token,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});
auth.post("/login", async (req, res) => {
  try {
    const { password, email } = req.body;
    const checkUseremail = await User.findOne({ email });
    if (!checkUseremail) return res.status(404).send("User does not exist");
    const passwordHashed = compareSync(`${password}`, checkUseremail.password);
    if (!passwordHashed) return res.status(200).send("Incorrect password");

    const data = {
      username: checkUseremail.username,
      id: checkUseremail._id,
    };
    const token = jwt.sign(data, process.env.SECRET_KEY, { expiresIn: "1d" });
    return res.status(201).json({
      message: "Success",
      data: {
        token: "Bearer " + token,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});
module.exports = auth;
