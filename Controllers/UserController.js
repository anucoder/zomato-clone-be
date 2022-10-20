const UserModel = require("../Models/UserModel");

module.exports.Login = async (request,response) =>{
  let data = request.body;
  try{

    let result = await UserModel.findOne({email:data.email,password:data.password});
    if(result===null)
    {
      response.status(200).send({
        status: false,
        message:"Wrong username or password"
      });
    }
    else{
      response.status(200).send({
        status: true,
        message:"login successfully"
      });
    }   

  }catch (error) {
    response.status(500).send({
      status: false,
      error,
    });
  }
  
}

module.exports.SignUp = async (request,response) => {
  let data = request.body;
  try {
    let newUser = new UserModel({
      full_name: data.full_name,
      email: data.email,
      mobile: data.mobile,
      password: data.password,
    });
    let result = await newUser.save();

    response.status(200).send({
      status: true,
      result,
    });
  } catch (error) {
    response.status(500).send({
      status: false,
      error,
    });
  }
};
