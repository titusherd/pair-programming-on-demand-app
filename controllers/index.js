const { Driver, User, Order, Category } = require("../models")
const formatCurrency = require("../helper/formatCurrency")
const { Op } = require('sequelize')
const bcrypt = require('bcryptjs');



class Controller {
    static home(req, res) {
        res.render("home-page")
    }

    static loginForm(req, res) {
        let {result} = req.query
        res.render('login-page', {result});
    }

    static login(req, res) {
        const {email, password} = req.body
        User.findOne({
            where: {email}
        })
        .then(user => {
            const isValidPassword = bcrypt.compareSync(password, user.password);
            if (!user) {
                const err = `Email not found`
                return res.redirect(`/login?result=${err}`)
            } else if (!isValidPassword) {
                const errP = `Wrong password`
                return res.redirect(`/login?result=${errP}`)
            } else {
                req.session.user= {userId: user.id, role: user.role}
                return res.redirect(`/`)
            }
        })
        .catch(err => {
            res.send(err);
        })
    }

    static logout(req, res) {
        req.session.destroy((err) => {
            if (err) {
                res.send(err);
            } else {
                const result = `Logged out successfully`
                res.redirect(`/login?result=${result}`)
            }
        })
    }

    static registerForm(req, res) {
        let {error} = req.query;
        let errors;
        if(error) {
            errors = error.split(",")
        }
        res.render('registration-page', {errors});
    }

    static registration(req, res) {
        // console.log(req.body);
        let {fullName, email, password, role} = req.body;
        // console.log(fullName, email, password, role);
        User.create({
            fullName,
            email,
            password,
            role
        })
        .then(newUser => {
            // res.send(newUser)
            const result = 'Registered Successfully'
            res.redirect(`/login?result=${result}`)
        })
        .catch(err => {
            // console.log(err.name);
            if (err.name == 'SequelizeValidationError') {
                const errors = err.errors.map(el => el.message).toString();
                res.redirect(`/register?error=${errors}`)
            } else {
                res.send(err);
            }   
        })
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