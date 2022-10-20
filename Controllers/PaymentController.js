const Razorpay = require("razorpay");

module.exports.getOrderId = (request, response) => {
  var instance = new Razorpay({
    key_id: "rzp_test_rrlnhLgPkYoMK8",
    key_secret: "zbEcWD7Sg9yibI9PdFlxkx4E",
  });
  let {amount} = request.body;
  var options = {
    amount: Number(amount) * 100, // amount in the smallest currency unit
    currency: "INR",
    receipt: "order_rcptid_11",
  };
  instance.orders.create(options, function (err, order) {
    //console.log(order);
    if (err) {
      response.status(500).send({
        status: false,
        message: "Server error",
      });
    } else {
      response.status(200).send({
        status: true,
        order,
      });
    }
  });
};

module.exports.verifyPayment = (request, response) => {
  let { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    request.body;
  let body = razorpay_order_id + "|" + razorpay_payment_id;

  var crypto = require("crypto");
  var expectedSignature = crypto
    .createHmac("sha256", "zbEcWD7Sg9yibI9PdFlxkx4E")
    .update(body.toString())
    .digest("hex");
  console.log("sig received ", razorpay_signature);
  console.log("sig generated ", expectedSignature);
  var result = { status: false };
  if (expectedSignature === razorpay_signature) result = { status: true };
  response.send(result);
};
