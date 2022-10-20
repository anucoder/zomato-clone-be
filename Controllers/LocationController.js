const LocationModel = require("../Models/LocationModel");

module.exports.getLocationList = async (request, response) => {
  try {
    let loclist = await LocationModel.find();
    if (loclist) {
      response.status(200).send({
        status: true,
        loclist,
      });
    } else {
      response.status(200).send({
        status: false,
        message: "No locations to show",
      });
    }
  } catch {
    response.send(500).send({
        status:false,
        error
    });
  }
};
