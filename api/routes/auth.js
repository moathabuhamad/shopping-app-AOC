const router = require("express").Router();

const { Signup, Login } = require("../controllers/authController");

//SIGNUP
router.post("/signup", Signup);

//Login
router.post("/login", Login);

module.exports = router;
