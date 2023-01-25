const roleModel = require("../../db/models/role.model")
const myHelper = require("../../app/helper")

class ROle {
    static addRole = async (req , res) => {
        try{
            const roleData = new roleModel(req.body)
            await roleData.save()
            myHelper.resHandler(res, 200, true, roleData, "user added successfully")
        }
        catch(e){
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }
    static editR = async (req , res) => {
        try{
            const roleData = new roleModel(req.body)
            await roleData.save()
            myHelper.resHandler(res, 200, true, roleData, "user added successfully")
        }
        catch(e){
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }

}

module.exports = ROle