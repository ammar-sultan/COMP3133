const mongoose = require("mongoose");
const validator = require("validator");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    minlength: [4, "Username must be at least 4 characters long."],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, "Invalid email format."],
  },
  address: {
    street: { type: String, required: true },
    suite: { type: String },
    city: {
      type: String,
      required: true,
      validate: {
        validator: (value) => /^[A-Za-z\s]+$/.test(value),
        message: "City can only contain letters and spaces.",
      },
    },
    zipcode: {
      type: String,
      required: true,
      validate: {
        validator: (value) => /^\d{5}-\d{4}$/.test(value),
        message: "Zipcode must follow the format: DDDDD-DDDD.",
      },
    },
    geo: {
      lat: { type: String },
      lng: { type: String },
    },
  },
  phone: {
    type: String,
    required: true,
    validate: {
      validator: (value) => /^1-\d{3}-\d{3}-\d{4}$/.test(value),
      message: "Phone number must follow the format: 1-DDD-DDD-DDDD.",
    },
  },
  website: {
    type: String,
    required: true,
    validate: {
      validator: (value) =>
        validator.isURL(value, {
          protocols: ["http", "https"],
          require_protocol: true,
        }),
      message: "Website URL must start with http or https.",
    },
  },
  company: {
    name: { type: String, required: true },
    catchPhrase: { type: String },
    bs: { type: String },
  },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
