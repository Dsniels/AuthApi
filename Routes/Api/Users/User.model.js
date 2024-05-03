const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  nombre: {
    type: String,
    required: true,
  },
  apellido: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    default: "User",
  },
  Date: {
    type: Date,
    default: Date.now,
  },
  imagen: {
    type: String,
    default: "",
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
