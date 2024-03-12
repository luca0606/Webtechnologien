const { JobService } = require('../services')
const BaseRouter = require('./base-router')
const JobModel = require("../models/job")

class JobRouter extends BaseRouter {

}

module.exports = new JobRouter(JobModel, JobService).router