const mongoose = require("mongoose")
const URLS = mongoose.model("URL", {
    // userId:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     required: true,
    //     ref:"User"
    // },
    link:{
        type : String ,
        required : true,
        // lowercase:true,
    },
    method :[{
        type : String ,
        required : true,
        lowercase:true,    
    }],
    query :[{
        type : String ,
        lowercase:true,  
        default : ""  
    }],
    params :[{
        type : String ,
        lowercase:true, 
        default : ""   
    }],
    roles :[{
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"Role"   
    }],

})
module.exports= URLS