const mongoose = require("mongoose")

const BaseOption = {
    discriminatorKey: "user",
    collection: "users",
    timestamps: true,
}

const UserSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    title: String,
    roles: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "RoleModel",
        autopopulate: { maxDepth: 2 }
    }]
},
    BaseOption
)

UserSchema.plugin(require('mongoose-autopopulate'))

module.exports.UserModel = mongoose.model("UserModel", UserSchema)

