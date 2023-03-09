const { Category, Driver, Order, User } = require("./models")

User.findAll({
    include: [Order]
})
    .then(data => console.log(data))

