const projectBuilding = require("../app/controller/buyProject.controller")
const {auth, allowedRoles} = require("../app/middleware/auth.middleware")
const router = require("express").Router()
// project
router.post("/addProject", auth , allowedRoles , projectBuilding.addProject)
router.patch("/editProject/:id", auth , allowedRoles , projectBuilding.editProject)
router.delete("/deleteProject/:id", auth , allowedRoles , projectBuilding.deleteProject)
router.get("/getAllProject" , projectBuilding.getAllProjects)
router.get("/getSingleProject/:id" , projectBuilding.getSingleProject )

// areas
router.patch("/addArea/:id" , projectBuilding.addArea)

// buildings
router.post("/addBuilding/:id/:numberArea"  , projectBuilding.addBuilding)
router.patch("/editBuilding/:id/:idBuilding"  , projectBuilding.editBuilding)
router.delete("/deleteBuilding/:id/:idBuilding"  , projectBuilding.deleteBuilding)
router.patch("/buyUnit/:id" , projectBuilding.buyUnit)


module.exports = router