const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    favorites: { type: Array },
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", UserSchema);
