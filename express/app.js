const port = require('./config/appConfig')
const express = require('express')
const bodyParser = require('body-parser')
const routes = require("./routes")
const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use('', routes)

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
})