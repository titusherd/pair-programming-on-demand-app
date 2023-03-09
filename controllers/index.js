const { Driver, Customer, Order, Category } = require("../models")

class Controller {
    static home(req, res) {
        res.render("home-page")
    }
    static login(req, res) {
        res.render("login-page")
    }
    static customers(req, res) {
        res.render("customers-page")
    }
    static drivers(req, res) {
        res.render("drivers-page")

    }
    static manager(req, res) {
        // res.render("manager-page")
        Driver.findAll({
            include: []
        })
            .then(data => {
                res.send(data)
            })
            .catch(err => res.send(err))

    }
}

module.exports = Controller