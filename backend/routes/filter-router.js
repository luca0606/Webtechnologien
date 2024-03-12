const { FilterService } = require('../services')
const BaseRouter = require('./base-router')
const FilterModel = require("../models/filter")

class FilterRouter extends BaseRouter {

}

module.exports = new FilterRouter(FilterModel, FilterService).router