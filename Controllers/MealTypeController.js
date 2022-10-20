const MealTypeModel = require('../Models/MealTypeModel');

module.exports.getMealTypes = async (request,response)=>{
    try{
        let mealtypes = await MealTypeModel.find();
        if(mealtypes){
            response.status(200).send({
                status:true,
                mealtypes
            })
        }else{
            response.status(200).send({
                status:false,
                message:"No mealtypes to show"
            });
        }
    }catch{
        response.status(500).send({
            status:false,
            message:"Server error. "+error
        });
    }
    
}