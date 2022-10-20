const express = require("express");

const router = express.Router();
const restaurant = require("../Controllers/RestaurantController");
const location = require("../Controllers/LocationController")
const mealtype = require("../Controllers/MealTypeController")
const menuItem = require("../Controllers/MenuItemController")
const user = require('../Controllers/UserController')
const payment = require("../Controllers/PaymentController")

router.get("/", (request, response) => {
  response.status(200).send("Hello Express JS");
}); // Default

//restaurents
router.get("/api/get-restaurants", restaurant.getRestaurantList);
router.get("/api/get-restaurant-details/:id", restaurant.getRestaurantDetailsById);
router.get("/api/get-restaurants-by-loc-id/:loc_id",restaurant.getRestaurantListByLocId)
router.post("/api/filter", restaurant.filterData);

//location
router.get("/api/get-location-list",location.getLocationList)

//mealtype
router.get("/api/get-meal-types",mealtype.getMealTypes)

//menuItems
router.get("/api/get-menu-items-by-restId/:rest_id",menuItem.getMenuByRestId)

//User
router.post('/api/sign-up',user.SignUp)
router.post("/api/login",user.Login)

//payment
router.post("/api/payment/gen-order",payment.getOrderId)
router.post("/api/payment/verify",payment.verifyPayment)

module.exports = router;
