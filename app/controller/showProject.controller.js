const showProjectModel = require("../../db/models/showProject")
const myHelper = require("../../app/helper")
const fs = require("fs")
const upload = require("../middleware/fileUpload.middleware")
const multer = require("multer")


class ShowProject{
        // add project
        static addProject = async (req , res) => {
            try{
                const projectData = new showProjectModel(req.body)
                projectData.image = req.file.path
                await projectData.save()
                myHelper.resHandler(res, 200, true, projectData, "project added successfully")
            }
            catch(e){
                myHelper.resHandler(res, 500, false, e, e.message)
            }
        }
        // edit project
        static editProject = async(req,res)=>{
            try
            {
            
              const projectData = await showProjectModel.findByIdAndUpdate({_id :req.params.id }, {$set :{...req.body}}) ;
              projectData.image = req.file.path
                await projectData.save()
                myHelper.resHandler(res, 200, true, projectData, "updated")
            }
            catch(e){
                myHelper.resHandler(res, 500, false, e, e.message)
            }
        }
        // delete project
        static deleteProject = async(req,res)=>{
            try
            {
            
              const projectData = await showProjectModel.findByIdAndDelete(req.params.id ) ;
                await projectData.save()
                myHelper.resHandler(res, 200, true, projectData, "updated")
            }
            catch(e){
                myHelper.resHandler(res, 500, false, e, e.message)
            }
        }
        // get all projects
        static getAllProjects = async (req , res) => {
            try{  
            const projectData = await showProjectModel.find()
                myHelper.resHandler(res, 200, true, projectData, "user added successfully")
            }
            catch(e){
                myHelper.resHandler(res, 500, false, e, e.message)
            }
        }
        // get single project
        static getSingleProject = async (req , res) => {
            try{
                const projectData = await showProjectModel.findById({_id : req.params.id})
                myHelper.resHandler(res, 200, true, projectData, "user added successfully")
            }
            catch(e){
                myHelper.resHandler(res, 500, false, e, e.message)
            }
        }

        // add project image
        // static uploadImage1 = async(req, res) =>{
        //     try{
        //         // const project = await showProjectModel.findById(req.params.id)
        //         const newProject = await showProjectModel.findByIdAndUpdate({_id :req.params.id }, {$set :{...req.body}})
        //         newProject.image = req.file.path
        //         await newProject.save()
        //         myHelper.resHandler(res, 200, true, newProject, "updated")
        //     }
        //     catch(e){
        //         myHelper.resHandler(res, 500, false, e, e.message)
        //     }
        // }
}

module.exports = ShowProject