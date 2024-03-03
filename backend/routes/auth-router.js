const { AuthService } = require('../services')
const BaseRouter = require('./base-router')
const AuthModel = require("../models/auth")

class AuthRouter extends BaseRouter {

    constructor(AuthModel, AuthService) {
        super(AuthModel, AuthService)

        this.router.post("/login", async (req, res) => {

            const { email, password } = req.body;

            try {
                const token = await this.service.authenticate(email, password)
                // Jwt token can be used for each request if it is needed.
                if (token) {
                    res.status(200).send(true);
                }
            } catch (error) {
                return res.status(500).send(error)
            }

        });

    }


}

module.exports = new AuthRouter(AuthModel, AuthService).router