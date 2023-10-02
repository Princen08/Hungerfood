const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

require("dotenv").config();

app.use(express.json());
app.use(cors());

const url = process.env.ATLAS_URL;

mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB database connection established successfully");
  })
  .catch((err) => console.error(err));




const authRouter = require("./routes/authRouter");
app.use("/auth", authRouter);
const itemRouter = require("./routes/itemRouter");
app.use("/item", itemRouter);
const orderRouter = require("./routes/orderRouter");
app.use("/order", orderRouter);
const paymentRouter = require("./routes/paymentRouter");
app.use("/payment", paymentRouter);

app.get("/", (req, res) => {
  res.json("Hello");
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
