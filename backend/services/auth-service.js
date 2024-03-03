const AuthModel = require("../models/auth")
const BaseService = require("./base-service")
const jwt = require('jsonwebtoken')
const { SECRET_KEY } = require('../config')


class AuthService extends BaseService {
    constructor(AuthModel) {
        super(AuthModel);
    }

    generateToken(user, expiresIn = "1h") {
        const payload = {
            id: user.id,
            username: user.username,
            email: user.email
        };

        const token = jwt.sign(payload, SECRET_KEY, { expiresIn });

        return token;
    }

    async authenticate(email, password) {

        try {
            const user = await this.findOne("email", email)
            const token = this.generateToken(user)

            if (user.password === password) {
                return token
            }
        } catch (error) {
            return res.status(500).send(error)
        }

        return false
    }
}

module.exports = new AuthService(AuthModel)