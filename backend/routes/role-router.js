const { RoleService } = require('../services')
const BaseRouter = require('./base-router')
const RoleModel = require("../models/role")
const RoleDescriptor = require("../validation/role-validation")

class RoleRouter extends BaseRouter {

}

module.exports = new RoleRouter(RoleModel, RoleService, RoleDescriptor).router