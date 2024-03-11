const { JobService } = require('../services')
const BaseRouter = require('./base-router')
const JobModel = require("../models/job")
const JobDescriptor = require("../validation/job-validator")

class JobRouter extends BaseRouter {

}

module.exports = new JobRouter(JobModel, JobService, JobDescriptor).router