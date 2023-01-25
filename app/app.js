const express = require("express")
const path = require("path")
const cors = require("cors")
const app = express()
app.use(cors())
require("../db/connect")
app.use(express.json())
app.use(express.static(path.join(__dirname, "../uploads")))
const userRoutes = require("../routes/user.routes")
const roleRoutes = require("../routes/role.route")
const urlRoutes = require("../routes/urls.route")
const buyProject =  require ("../routes/buyProject.route")
const showProject =  require ("../routes/showProject.routes")
const payment =  require ("../routes/payment.routes")
app.use("/api/user/",  userRoutes)
app.use(roleRoutes)
app.use(urlRoutes)
app.use(buyProject)
app.use(showProject)
app.use(payment)
app.all("*", (req, res)=> {
    res.status(404).send({
        apisStatus:false,
        message:"Invalid URL",
        data: {}
    })
})
module.exports=app