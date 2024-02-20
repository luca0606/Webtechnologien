const { UserService } = require('../services')
const BaseRouter = require('./base-router')
const { UserSchema } = require("../models/user")
const UserDescriptor = require("../validation/user-validation")

class UserRouter extends BaseRouter {


}

module.exports = new UserRouter(UserSchema, UserService, UserDescriptor).router