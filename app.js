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
app.get('/drivers/add', Controller.addDriver)

app.post('/drivers/add', Controller.createDriver)
app.get('/manager/:id/delete', Controller.destroy)
app.get('/manager/:id/edit', Controller.editDriver)
app.post('/manager/:id/edit', Controller.updateDriver)
// GET '/', -> home page 
// GET '/login' -> login page
// GET '/drivers' -> drivers page 
// GET '/customers' -> customers page

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})