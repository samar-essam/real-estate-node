const mongoose = require("mongoose")
const roleSchema = mongoose.Schema({
    title :{
        type : String ,
        required:true ,
        unique : true  

    },
    permissions :
        {
            type : Object ,
            required : true
        }
},{
    timestamps:true
})


const ROLES = mongoose.model("ROLE", roleSchema)
module.exports= ROLES