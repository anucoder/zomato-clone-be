const RestaurantModel = require("../Models/RestaurantModel");

module.exports.getRestaurantList = async (request, response) => {
  try{
    let restaurantList = await RestaurantModel.find();
    response.status(200).send({
      status : true,
      restaurantList
    });
  }
  catch{
    response.send(500).send({
      status:false,
      error
    });
  }
};


// API for Restaurant Product Details page:
module.exports.getRestaurantDetailsById = async (request, response) => {
  let rest_id = request.params.id;
  try{
    let restaurantDetails = await RestaurantModel.findOne({_id:rest_id});
    if(restaurantDetails){
      response.status(200).send({
        status : true,
        restaurantDetails
      });
    }else{
      response.status(200).send({
        status : false,
        message:"restaurant not found"
      });
    }    
  }
  catch{
    response.send(500).send({
      status:false,
      error,
      message : "Server error, Contact to admin"
    });
  }
};

//API for Restaurant List by Location ID
module.exports.getRestaurantListByLocId = async (request,response)=>{
  let locid = request.params.loc_id;
  try{
    let restaurantListByLoc = await RestaurantModel.find({location_id:locid});
    if(restaurantListByLoc){
      response.status(200).send({
        status : true,
        restaurantListByLoc
      });
    }else{
      response.status(200).send({
        status : false,
        message:"restaurant not found"
      });
    } 
  }catch{
      response.send(500).send({
      status:false,
      error,
      message : "Server error, Contact to admin"
    });
  }
};
// API for Restaurant search page with filters, sort and pagination as input parameters

module.exports.filterData = async (request,response)=>{

  let {meal_type, location, cuisine, hcost, lcost, sort, page } = request.body;

  let filter = {};
  if(sort===undefined) sort=1;
  if(page===undefined) page=1;
  let no_of_records = 2;

  if(location!==undefined) filter["location_id"]=location;
  if(meal_type !== undefined) filter["mealtype_id"] = meal_type;
  if(cuisine!== undefined) filter["cuisine_id"] = { $in: cuisine };
  if (hcost !== undefined && lcost !== undefined)
    filter["min_price"] = { $gte: lcost, $lte: hcost };

  console.log(filter);
    let result = await RestaurantModel.find(filter,{name:1,city:1,locality:1,min_price:1,cuisine:1,image:1}).sort({
      min_price: sort,
    });
    let pages = Math.ceil(result.length/2);
    let result_page = result.splice((page*2)-2,no_of_records)
    // let result_page = result
    if(result_page.length!=0){
      response.status(200).send({
        status: true,
        result_page,
        pages
      });
    }
    else{
      response.status(200).send({
        status: false,
        message:"No restaurants to show. Modify search"
      });
    }
    
};
