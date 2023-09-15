const router = require("express").Router();
const RazorPay = require("razorpay");
const crypto = require("crypto");

router.post("/", async (req, res) => {
  try {
    const instance = new RazorPay({
      key_id: "rzp_test_i9xW1rAkBXrwXe",
      key_secret: "IJ1yleEKMs6yZ9lVlM5tJkWF",
    });

    const options = {
      amount: req.body.amount * 100,
      currency: "INR",
      receipt: crypto.randomBytes(10).toString("hex"),
    };
    instance.orders.create(options, (error, order) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong!" });
      }
      res.status(200).json({ data: order });
    });
  } catch (err) {
    console.log(err);
  }
});

router.post("/verify", async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", "IJ1yleEKMs6yZ9lVlM5tJkWF")
      .update(sign.toString())
      .digest("hex");
    if (razorpay_signature === expectedSign) {
      return res.status(200).json({ message: "success" });
    } else {
      return res.status(200).json({ message: "fail" });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
