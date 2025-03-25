const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const logger = require("morgan");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

// route
const mainRoute = require("./routes/index.js");

dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connected to MongoDB");
  } catch (error) {
    throw error;
  }
};

// middlewares
app.use(express.json());
app.use(logger("dev"));
app.use(cors());


app.use("/api", mainRoute);

app.listen(port, () => {
  connect();
  console.log(`App listening on port ${port}`);
});
