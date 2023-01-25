const urlModel = require("../../db/models/urls")
const myHelper = require("../../app/helper")

class URL {
    static addUrl = async (req , res) => {
        try{
            const urlData = new urlModel(req.body)
            await urlData.save()
            myHelper.resHandler(res, 200, true, urlData, "user added successfully")
        }
        catch(e){
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }

}

module.exports = URL