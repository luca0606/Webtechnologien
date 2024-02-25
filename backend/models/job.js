const mongoose = require("mongoose")

const jobSchema = new mongoose.Schema({
    jobtitle: String,
    jobdescription: String,
    jobrequirements: String,
    benefits: String,
    salaryRangeMin: Number,
    salaryRangeMax: Number,
    vacancyFilled: Boolean, 
    vacancyActive: Boolean
},
    { collection: "jobs" }
)

module.exports = mongoose.model("jobModel", jobSchema)