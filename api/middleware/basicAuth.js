"use strict";
const User = require("../models/User");
const bcrypt = require("bcrypt");
const base64 = require("base-64");
const jwt = require("jsonwebtoken");

const basicAuth = async (req, res, next) => {
  if (req.headers["authorization"]) {
    let basicHeaderParts = req.headers.authorization.split(" ");
    let encodedPart = basicHeaderParts.pop();
    let decoded = base64.decode(encodedPart);
    let [enteredName, enteredPassword] = decoded.split(":");
    
    try {
      let user = await User.findOne({
        username: enteredName,
      });
      if (!user) {
        res.status(401).json("Wrong username!");
        return;
      }
      const match = await bcrypt.compare(enteredPassword, user.password);
      if (match) {
        let accessToken = jwt.sign(
          {
            id: user._id,
          },
          process.env.JWT_SEC,
          { expiresIn: "3d" },
        );
        let { password, ...others } = user._doc;
        res.status(200).json({ ...others, accessToken });
      } else {
        res.status(401).json("Wrong Password!");
        return;
      }
    } catch (err) {
      res.status(500).send(err);
    }
  }
};

module.exports = basicAuth;
