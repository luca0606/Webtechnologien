const mongoose = require('mongoose')

mongoose.set("strictQuery", true);

const username = "webtech_admin"
const password = "p5vNj2wOkVtHqsFO"

mongoose.connect(`mongodb+srv://webtech_admin:${password}@recruitingcluster.yiy3brk.mongodb.net/?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true })
var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
    console.log('we are connected to mongodb!')
})
