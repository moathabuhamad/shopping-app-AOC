"use strict";
const User = require("../models/User");
const bcrypt = require("bcrypt");

const CreateNewUser = async (req, res) => {
  let username = req.body.username;
  let password = await bcrypt.hash(req.body.password, 5);

  console.log("service 1", match);
  let newUser = await new User({
    username: username,
    password: password,
  });
  console.log(newUser.password, req.body.password);
  try {
    let savedUser = await newUser.save();
    res.statusMessage = "Was Created Succefully";
    res.status(201).json(savedUser.username);
  } catch (err) {
    res.statusMessage = "Username Already Exists";
    res.status(409).json(err.keyValue);
  }
};

module.exports = CreateNewUser;
