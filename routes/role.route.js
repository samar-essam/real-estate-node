const ROle = require("../app/controller/role.controller")
const router = require("express").Router()

router.post("/addRole", ROle.addRole) ;

module.exports = router