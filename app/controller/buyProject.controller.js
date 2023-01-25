const buyProjectModel = require("../../db/models/buyProjects.model")
const myHelper = require("../../app/helper")
const { ObjectId } = require('mongodb');

class Project {
    // add project
    static addProject = async (req , res) => {
        try{
            const projectData = new buyProjectModel(req.body)
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
        
          const projectData = await buyProjectModel.findByIdAndUpdate({_id :req.params.id }, {$set :{...req.body}}) ;
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
        
          const projectData = await buyProjectModel.findByIdAndDelete(req.params.id ) ;
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
        const projectData = await buyProjectModel.find()
            myHelper.resHandler(res, 200, true, projectData, "user added successfully")
        }
        catch(e){
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }
    // get single project
    static getSingleProject = async (req , res) => {
        try{
            console.log(req.params);
        const projectData = await buyProjectModel.findById({_id : req.params.id})
        console.log(projectData);
            myHelper.resHandler(res, 200, true, projectData, "user added successfully")
        }
        catch(e){
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }
    // add Building
    static addBuilding = async (req , res ) => {
        try {
            const { numberArea , id } = req.params
            const {buildingNum , numOfFloors} = req.body
            const project = await buyProjectModel.findById(id)
            if(project){
                
                const area = project.area.find(e => e.numberArea === numberArea) 
                // console.log(area.buildings);
                const building = area.buildings.find(e => e.numberBuilding === req.body.numberBuilding) 
                console.log(building);
                if(area) {
                    if(!building){
                        area.buildings.push(req.body)
                        console.log(area.buildings);
                        await project.save()
                        // const newBuilding = await buyProjectModel.updateOne({numberArea : nomOfArea } , req.body)
                        myHelper.resHandler(res , 200 , true , project , "added building successfully")
                    }else{
                        myHelper.resHandler(res, 500, false, "error", "building is already found ")
                    }
                    
                }
                else{
                    myHelper.resHandler(res, 500, false, "error", "area is not found ")
                }
            }else{
                myHelper.resHandler(res, 500, false, "error", "project is not ")
            }
            
        } catch (e) {
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }
    // edit building
    static editBuilding = async(req,res)=>{
        try {
            

            const { id } = req.params
            const buildingId = new ObjectId(req.params.idBuilding);
            const {addressBuilding} = req.body
            const address = addressBuilding.split("")
            const numArea = address[0]
            const numBuilding = address[1]

            const project = await buyProjectModel.findById(id)
            if(project){
                
                const area = project.area.find(e => e.numberArea === numArea) 
                // console.log(area.buildings);
                const building = area.buildings.find(e => e._id == buildingId) 
                console.log(building);
                if(area) {
                    if(building){
                        console.log(building);
                        const newBuilding = building.replace()
                        // const newBuilding = await buyProjectModel.updateOne({numberArea : nomOfArea } , req.body)
                        myHelper.resHandler(res , 200 , true , newBuilding , "added building successfully")
                    }else{
                        myHelper.resHandler(res, 500, false, "error", "building is already found ")
                    }
                    
                }
                else{
                    myHelper.resHandler(res, 500, false, "error", "area is not found ")
                }
            }else{
                myHelper.resHandler(res, 500, false, "error", "project is not ")
            }
            
        } catch (e) {
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }
    // delete building
    static deleteBuilding = async(req , res) => {
        try {
            

            const { id } = req.params
            const buildingId = new ObjectId(req.params.idBuilding);
            const {addressBuilding} = req.body
            const address = addressBuilding.split("")
            const numArea = address[0]
            const numBuilding = address[1]
            const project = await buyProjectModel.findById(id)
            if(project){
                const area = await buyProjectModel.aggregate([
                    {
                      $match: {
                        "area.numberArea": numArea,
                      },
                    },
                    {
                      $unwind: "$area",
                    },
                    
                  
                    {
                      $match: {
                        "area.numberArea": numArea,
                      },
                    },
                    {
                      $group: {
                        numArea: "$numberArea",
                        data: {
                          $push: "$area",
                        },
                      },
                    },
                  ]);
                  console.log(area.data);
                // const area = project.area.find(e => e.numberArea === numArea) 
                // const building = area.buildings.find(e => e._id == buildingId) 
                // console.log(building);
                if(area) {
                    if(building){
                       
                    }else{
                        myHelper.resHandler(res, 500, false, "error", "building is already found ")
                    }
                    
                }
                else{
                    myHelper.resHandler(res, 500, false, "error", "area is not found ")
                }
            }else{
                myHelper.resHandler(res, 500, false, "error", "project is not ")
            }
            
        } catch (e) {
            myHelper.resHandler(res, 500, false, e, e.message)
        }

    }
    static addArea = async (req , res) => {
        try{
            const projectData = await buyProjectModel.findById(req.params.id)
            if(!projectData.area) projectData.area=[]
            const area = projectData.area.find(e => e.numberArea === req.body.numberArea) 
            console.log(area);
            if(!area)
            {
                projectData.area.push(req.body)
                await projectData.save()
                myHelper.resHandler(res, 200, true, projectData, "updated")
            }else{
                myHelper.resHandler(res, 500, false, "error", "area is already found")
            }
            
        }
        catch(e){
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    
    }
    static addUnitData = async (req , res) => {
        try{
            
            // const projectData = await buyProjectModel.findOneAndUpdate({id :req.params.id }, req.body )
            // const data = await projectData.save()
            //     console.log(projectData);
                myHelper.resHandler(res, 200, true, data, "user added successfully")
            }
            catch(e){
                myHelper.resHandler(res, 500, false, e, e.message)
            }
    }
    static buyUnit = async (req, res) => {
        
        try {
            const id = new ObjectId(req.params.id);
          const getData = await buyProjectModel.aggregate([
            {
              $match: {
                "project.area.buildings.floors.units._id": id,
              },
            },
            {
              $unwind: "$project",
            },
            {
              $unwind: "$project.area",
            },
            {
              $unwind: "$project.area.buildings",
            },
            {
              $unwind: "$project.area.buildings.floors",
            },
            {
              $unwind: "$project.area.buildings.floors.units",
            },
            {
              $match: {
                "project.area.buildings.floors.units._id": id,
              },
            },
            {
              $group: {
                _id: "$_id",
                data: {
                  $push: "$project.area.buildings.floors.units",
                },
              },
            },
          ]);
         const data = getData[0].data[0].status ="bought"
          console.log(getData[0].data[0]);
        //   await getData[0].data[0].status.save()
          myHelper.resHandler(res, 200, true, getData, "unit added successfully");
        } catch (e) {
          myHelper.resHandler(res, 500, false, e, e.message);
        }
      };
    
  

}

module.exports = Project