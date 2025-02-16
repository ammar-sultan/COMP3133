const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  uid: {
    type: Number,
    required: true,
    unique: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
    min: 0,
  },
});

module.exports = mongoose.model("User", userSchema);
