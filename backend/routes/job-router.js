const { JobService } = require('../services')
const BaseRouter = require('./base-router')
const JobModel = require("../models/role")
const JobDescriptor = require("../validation/role-validation")

class JobRouter extends BaseRouter {

}

module.exports = new JobRouter(JobModel, JobService, JobDescriptor).router