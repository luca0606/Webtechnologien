const mongoose = require("mongoose")

const RoleSchema = new mongoose.Schema({
    roleName: String,
    roleCode: String,
    description: String
},
    { collection: "role" }

)

RoleSchema.plugin(require('mongoose-autopopulate'))

module.exports = mongoose.model("RoleModel", RoleSchema)
