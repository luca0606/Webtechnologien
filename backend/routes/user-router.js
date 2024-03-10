const { UserService } = require('../services')
const BaseRouter = require('./base-router')
const UserModel = require("../models/user")

class UserRouter extends BaseRouter {
    å
    constructor(UserModel, UserService) {
        super(UserModel, UserService)

        // check if user already exists in the database by email
        // and if not, create a new user
        this.router.post("/register", async (req, res) => {
            const { email } = req.body;

            try {
                const user = await this.service.getUserFromUserModelByEmail(email)
                if (user) {
                    console.log("User already exists")
                    return res.status(400).send("User already exists")
                }
                const newUser = await this.service.insert(req.body)
                res.status(201).send(newUser);
            } catch (error) {
                console.log(error)
                return res.status(500).send(error)
            }
        });
    }

}

module.exports = new UserRouter(UserModel, UserService).router