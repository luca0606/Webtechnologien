const mongoose = require("mongoose")

const AuthSchema = new mongoose.Schema({
    userId: String,
    email: String,
    password: String
},
    { collection: "auth" }
)

module.exports = mongoose.model("AuthModel", AuthSchema)
