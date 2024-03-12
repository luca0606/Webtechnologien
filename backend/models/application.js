const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    applicationTitle: String,
    jobId: String,
    filePath: String,
    status: String,
  },
  { collection: "application" }
);

module.exports = mongoose.model("applicationModel", applicationSchema);
