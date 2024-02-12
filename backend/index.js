const express = require("express")
const bodyParser = require("body-parser")
const axios = require("axios");
console.log(axios)
const PORT = process.env.PORT || 3001;
const app = express()

app.use(bodyParser.json())
app.use(axios)
require("./mongo-connection")
require("./routes/routers")(app)


require("./corsPolicy")(app)

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
    console.log(`Click here: http://127.0.0.1:${PORT}`)
})