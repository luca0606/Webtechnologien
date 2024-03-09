const mongoose = require("mongoose")

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

module.exports = mongoose.model("UserModel", UserSchema)

