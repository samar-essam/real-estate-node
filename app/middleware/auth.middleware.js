const userModel = require("../../db/models/user.model")
const roleModel = require("../../db/models/role.model")
const urlModel = require("../../db/models/urls")
const myHelper = require("../../app/helper")
const jwt = require("jsonwebtoken")
const auth = async(req, res, next) => {
    try{
        const token = req.header("Authorization").replace("Bearer ", "")
        const decodedToken = jwt.verify(token, process.env.tokenPass)
        const userData = await userModel.findOne({
            _id: decodedToken._id,
            "tokens.token": token
        })
        
        if(!userData) throw new Error("invalid token")
            
            const roleId = userData.role.toString()
        const allowedUrl = await urlModel.find({roles : roleId})
        const url = allowedUrl.find((u) => u.link === req.url )

       req.allowedUrl = url
        req.user = userData
        req.token = token
        next()
    }
    catch(e){
        myHelper.resHandler(res, 500, false, e.message, "unauthorized")
    }
}

const allowedRoles = async (req , res , next) => {
try {
    
    console.log(req.params);
    console.log(req.allowedUrl);
   
        if (req.allowedUrl.link === req.url ) {

            next()
        }
        else{
            myHelper.resHandler(res, 500, false, "unauthorized", "unauthorized")
        }
     
  
} catch (e) {
    myHelper.resHandler(res, 500, false, e.message, "unauthorized")
}
    
    
    


}
module.exports = {auth , allowedRoles}