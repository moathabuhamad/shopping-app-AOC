const basicAuth = require("../middleware/basicAuth");
const CreateNewUser = require("../service/userTable");

exports.Signup = async (req, res) => {
  savedUser = await CreateNewUser(req, res);
};

exports.Login = async (req, res) => {
  activeUser = await basicAuth(req, res);
};
