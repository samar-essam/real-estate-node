const URL = require("../app/controller/url.controller")
const router = require("express").Router()

router.post("/addURL", URL.addUrl) ;

module.exports = router