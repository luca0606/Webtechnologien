const { AuthService } = require('../services')
const BaseRouter = require('./base-router')
const AuthModel = require("../models/auth")

class AuthRouter extends BaseRouter {

}

module.exports = new AuthRouter(AuthModel, AuthService).router