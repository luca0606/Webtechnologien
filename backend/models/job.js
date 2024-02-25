const mongoose = require("mongoose")

const jobSchema = new mongoose.Schema({
    userId: String,
    email: String,
    password: String
},
    { collection: "jobs" }
)

module.exports = mongoose.model("jobModel", jobSchema)