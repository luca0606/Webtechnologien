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

// UserSchema.plugin(require('mongoose-autopopulate'))

module.exports.UserModel = mongoose.model("UserModel", UserSchema)

