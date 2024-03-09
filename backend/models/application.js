const mongoose = require("mongoose")

const applicationSchema = new mongoose.Schema({
    applicationTitle: String,
    jobId: String,
    filePath: String,
},
    { collection: "application" }
)

module.exports = mongoose.model("applicationModel", applicationSchema)