const express = require("express")
const bodyParser = require("body-parser")

const PORT = process.env.PORT || 3000 || 3002;
const app = express()

app.use(bodyParser.json())
require("./mongo-connection")
require("./corsPolicy")(app)
require("./routes/routers")(app)

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
    console.log(`Click here: http://127.0.0.1:${PORT}`)
})