const UserRouter = require("./user-router")
const RoleRouter = require("./role-router")
const AuthRouter = require("./auth-router")
const JobRouter = require("./job-router")

module.exports = app => {
    app.use("/user", UserRouter)
    app.use("/role", RoleRouter)
    app.use("/auth", AuthRouter)
    app.use("/job", JobRouter)
}