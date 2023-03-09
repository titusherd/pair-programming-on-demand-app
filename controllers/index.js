const { Driver, User, Order, Category } = require("../models")
const formatCurrency = require("../helper/formatCurrency")
const { Op } = require('sequelize')



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
        const { search } = req.query
        let options = {
            include: [Category]
        }

        if (search) {
            options.where = {
                fullName: { [Op.iLike]: `%${search}%` }
            }
        }

        Driver.findAll(options)
            .then(data => {
                //Helper

                // res.send(data)
                res.render("manager-page", { data, formatCurrency })
            })
            .catch(err => res.send(err))

    }

    static addDriver(req, res) {
        const { errors } = req.query
        res.render("add-driver-form", { errors })
    }

    static createDriver(req, res) {
        // res.render("")
        const { fullName, CategoryId } = req.body

        Driver.create({ fullName, CategoryId })
            .then(() => res.redirect("/manager"))
            .catch(err => {
                if (err.name === 'SequelizeValidationError') {
                    const errMsg = err.errors.map(el => {
                        return el.message
                    })
                    console.log(errMsg);
                    res.redirect(`/drivers/add?errors=${errMsg}`)
                } else {
                    res.send(err)
                }
            })
    }

    static editDriver(req, res) {
        const { id } = req.params
        // res.send(id)

        Driver.findByPk(id, {
            include: [Category]
        })
            .then(data => {
                // res.send(data)
                res.render("edit-driver-form", { data })
            })
            .catch()
    }

    static updateDriver(req, res) {
        const { id } = req.params
        const { fullName, money, point } = req.body
        // res.send(req.body)
        Driver.update({ fullNam: fullName, money: money, point: point }, {
            where: {
                id: id
            }
        })
            .then(() => {
                res.redirect("/manager")
            })
            .catch(err => res.send(err))

    }

    static destroy(req, res) {
        // console.log(req.params);
        // res.send(req.params)
        // res.send(req.params)
        const { id } = req.params

        Driver.destroy({
            where: {
                id
            }
        })
            .then(() => res.redirect("/manager"))
            .catch(err => res.send(err))
    }


}

module.exports = Controller