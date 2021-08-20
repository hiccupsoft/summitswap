require("dotenv").config({ path: ".env" });
const express = require("express");
const userAPI = require("./routes/User");
const { connect, set } = require("mongoose");
var cors = require("cors");
const app = express();

//middlewares

app.use(express.json());
const { PORT, MONGODB_URL } = process.env;

const StartApplication = async () => {
  try {
    app.use(cors());
    await connect(MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify:true
    });
    process.env.NODE_ENV === "development" ? set("debug", true) : "";
    console.log({ message: "DB connection established" });
    app.set("port", PORT || 3001);
    //setting up routes
    app.use(userAPI);
    app.listen(PORT, () => {
      console.log(`summitswap server listening at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error(err);
    // StartApplication()
  }
};

StartApplication();
