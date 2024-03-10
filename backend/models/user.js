const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator");

const BaseOption = {
    discriminatorKey: "user",
    collection: "users",
    timestamps: true,
}

const UserSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    recruiterRole: Boolean
},
    BaseOption
)

UserSchema.plugin(uniqueValidator);
module.exports = mongoose.model("UserModel", UserSchema)

