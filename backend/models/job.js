const mongoose = require("mongoose")

const jobSchema = new mongoose.Schema({
    benefits: String,
    jobDescription: String,
    jobRequirements: String,
    jobTitle: String,
    location: String,
    salaryRangeMax: Number,
    salaryRangeMin: Number,
    vacancyActive: Boolean
},
    { collection: "jobs" }
)

module.exports = mongoose.model("jobModel", jobSchema)