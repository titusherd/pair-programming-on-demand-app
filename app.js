const express = require('express')
const app = express()
const port = 3000
const Controller = require("./controllers")


app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }));

app.get('/', Controller.home)
app.get('/login', Controller.login)
app.get('/drivers', Controller.drivers)
app.get('/customers', Controller.customers)
app.get('/manager', Controller.manager)
// GET '/', -> home page 
// GET '/login' -> login page
// GET '/drivers' -> drivers page 
// GET '/customers' -> customers page

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})