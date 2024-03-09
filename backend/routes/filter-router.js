const { FilterService } = require('../services')
const BaseRouter = require('./base-router')
const { FilterSchema } = require("../models/user")

class FilterRouter extends BaseRouter {

}

module.exports = new FilterRouter(FilterSchema, FilterService).router