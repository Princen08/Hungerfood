const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/userSchema");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const verifyJWT = require("../middleware/auth");

router.post("/signup", async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const hashedPassword = await bcrypt.hash(password, 10);
  const formData = new User({
    name: name,
    email: email,
    password: hashedPassword,
  });

  const user = await formData.save();
  const id = user._id;
  const token = jwt.sign({ id }, "jwtSecret", {
    expiresIn: 3000,
  });

  return res.json({ success: true, message: "User sign-up sucessfully.", data: { token: token, user: user } });
});

router.post("/signin", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.json({success: false, message: "Email or password does not matches, Please try again."});
  }
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.json({success: false, message: "Email or password does not matches, Please try again."});
  }
  const id = user._id;
  const token = jwt.sign({ id }, "jwtSecret", {
    expiresIn: 3000,
  });
  return res.json({ success: true, message: "User sign-in sucessfully.", data: { token: token, user: user } });
});

router.post("/verify", async (req, res) => {
  const email = req.body.email;
  const otp = req.body.otp;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_ID,
      pass: process.env.PASSCODE,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_ID,
    to: email,
    subject: "OTP Verification for Hunger Food",
    text:
      "Thank you for choosing us Use the " +
      otp +
      " as OTP to complete your Sign up procedures.",
  };

  const isUser = await User.findOne({ email: email });

  if (isUser) {
    return res.json({ success: false, message: "User already exist, please try to log in." })
  } else {
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return res.json({ success: false, message: "Error, while sending a mail." })
      } else {
        return res.json({ success: true, message: "Mail sent sucessfully." })
      }
    });
  }
});

router.get("/isLoggedIn", verifyJWT, (req, res) => {
   return res.json({ success: true, message: "User already logged in." })
});

module.exports = router;
