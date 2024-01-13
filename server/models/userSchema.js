const mongoose = require("mongoose");

const ReactFormDataSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", ReactFormDataSchema);
module.exports = User;
