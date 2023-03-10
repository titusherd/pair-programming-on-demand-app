const express = require('express')
const app = express()
const session = require('express-session')
const port = 3001
const Controller = require("./controllers")


app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }));




app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        sameSite: true
    }
}))

const isLoggedIn = function (req, res, next) {
    console.log(req.session);
    if (!req.session.user) {
        const err = 'Please log in first';
        res.redirect(`/login?result=${err}`)
    } else {
        next()
    }
}

const isDriver = function (req, res, next) {
    // console.log(req.session);
    if (!req.session.user) {
        const err = 'Please log in first';
        res.redirect(`/login?result=${err}`)
    } else if (!req.session.user.userId || req.session.user.role === 'Customer') {
        const err = 'No access';
        res.redirect(`/login?result=${err}`)
    } else {
        next()
    }
}

app.get('/', Controller.home)
app.get('/login', Controller.loginForm)
app.post('/login', Controller.login)
app.get('/register', Controller.registerForm)
app.post('/register', Controller.registration)

// app.get('/manager', Controller.manager)
// app.post('/drivers/add', Controller.createDriver)



// butuh login untuk access
app.use(isLoggedIn)

app.get('/customers', Controller.customers)
app.get('/logout', Controller.logout)

// butuh role driver untuk access


app.use(isDriver)

app.get('/drivers', Controller.drivers)

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