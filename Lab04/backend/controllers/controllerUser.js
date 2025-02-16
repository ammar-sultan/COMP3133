const User = require("../models/User");

exports.createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ message: "User successfully created.", user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
