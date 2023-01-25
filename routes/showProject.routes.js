const showProject = require("../app/controller/showProject.controller")
const {auth } = require("../app/middleware/auth.middleware")
const upload = require("../app/middleware/fileUpload.middleware")
const router = require("express").Router()
// project
router.post("/addShow", auth , upload.single("img") , showProject.addProject)
router.patch("/editShow/:id", auth , upload.single("img")  , showProject.editProject)
router.delete("/deleteShow/:id", auth , showProject.deleteProject)
router.get("/getAllShow" ,auth , showProject.getAllProjects)
router.get("/getSingleShow/:id" ,auth , showProject.getSingleProject )
// router.patch("/showImage/:id",auth, upload.single("img"), showProject.uploadImage1)
module.exports = router 