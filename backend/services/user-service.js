const BaseService = require("./base-service");
const { UserModel } = require("../models/user");
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

class UserService extends BaseService {}

const userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("UserModel", userSchema);

module.exports = new UserService(UserModel);
