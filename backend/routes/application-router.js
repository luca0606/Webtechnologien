const { ApplicationService } = require('../services')
const BaseRouter = require('./base-router')
const ApplicationModel = require("../models/application")

class ApplicationRouter extends BaseRouter {

}

module.exports = new ApplicationRouter(ApplicationModel, ApplicationService).router