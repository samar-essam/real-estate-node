const mongoose = require("mongoose")
const projectSchema = mongoose.Schema({ 
  image : {
    type : String ,
    required : true
  },
  title:{
    type : String ,
    required : true
  },
  address:{
    type : String ,
    required : true
  }
   
},{
    timestamps:true
})


const showProject = mongoose.model("Project", projectSchema)
module.exports= showProject