"use strict"; 
const User = require("../models/User");
const errorHandler = require("../error-handlers/500");

const bearerAuth = async (req, res, next) => {
  try {
    if (req.headers["authorization"]) {
      let bearerHeaderParts = req.headers.authorization.split(" ");
      let token = bearerHeaderParts.pop();
      try {
        let user = await database.emplpyees.authenticateBearer(token);
        if (user) {
          req.user = user;
          next();
        } else {
          res.status(500).send("please login again ,invalid token");
        }
      } catch (error) {
        res.status(403).send(`Error from bearerAuth: ${error} `);
      }
    } else {
      next(errorHandler);
    }
  } catch (e) {
    next("invalid Token");
  }
};
module.exports = bearerAuth;
