const BaseService = require("./base-service")
const { UserModel } = require("../models/user")

class UserService extends BaseService {

}

module.exports = new UserService(UserModel)