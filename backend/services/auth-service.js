const AuthModel = require("../models/auth")
const BaseService = require("./base-service")

class AuthService extends BaseService {

}

module.exports = new AuthService(AuthModel)