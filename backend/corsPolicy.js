const cors = require("cors")
// define allowed urls to make request from this api. 
const whitelist = ["http://localhost:4200"]
const corsOptions = {

    origin: function (origin, callback) {
        if (!origin || whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            console.log("cors error")
            callback(new Error('Not allowed by CORS'))
        }
    }
}
const PORT = process.env.PORT || 3000;
module.exports = app => {

    app.use(cors(corsOptions))
    app.get("/", cors(corsOptions), (req, res) => {
        res.send(`Welcome to Recruiting Api. The Front End will be added`)
    })
}