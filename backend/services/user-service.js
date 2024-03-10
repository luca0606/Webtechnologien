const BaseService = require("./base-service")
const UserModel = require("../models/user")

class UserService extends BaseService {
    constructor(UserModel) {
        super(UserModel)
    }

    async getUserFromUserModelByEmail(email) {
        try {
            const user = await UserModel.findOne({ email: email });
            return user;
        } catch (error) {
            console.error("Error By User Search:", error);
            throw error;
        }
    }

}

module.exports = new UserService(UserModel)
