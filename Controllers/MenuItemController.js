const MenuItemModel = require('../Models/MenuItemModel');

module.exports.getMenuByRestId = async (request,response)=>{
    let rest_id = request.params.rest_id
    try{
        let menu = await MenuItemModel.find({restaurantId:rest_id});
        if(menu){
            response.status(200).send({
                status:true,
                menu
            })
        }else{
            response.status(200).send({
                status:false,
                message:"No menu to show"
            });
        }
    }catch{
        response.status(500).send({
            status:false,
            message:"Server error. "+error
        });
    }
    
}