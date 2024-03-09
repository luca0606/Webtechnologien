const mongoose = require("mongoose")

const FilterSchema = new mongoose.Schema({
    filterId: String,
    title: String,
    requirement: String,
    location: String,
    salaryRange: String,
    vacancyActive: String,
    filterSelected: Boolean,
    userId: String,
},
    { collection: "filter" }
)

module.exports = mongoose.model("FilterModel", FilterSchema)
