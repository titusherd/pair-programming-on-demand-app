const { Category, Driver, Order, User } = require("./models")

Order.findAll({
    include: [{
        model: User,
        as: "Customer"
    }]
})
    .then(data => console.log(data))

