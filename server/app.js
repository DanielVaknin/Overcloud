const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");
//const users = require("./api/users");
const cloud = require("./api/cloud");
const auth = require("./api/auth");
const express = require("express");
const app = express();
const cors = require("cors");
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');
const uri =
  "mongodb+srv://admin:HMQrrUjrqpnYNJ4R@cluster0.0d9xj.mongodb.net/" +
  "OverCloud?authSource=admin&replicaSet=atlas-5cxd80-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true";
const options = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose
  .connect(uri, options)
  .then(() => console.log("Now connected to MongoDB!"))
  .catch((err) => console.error("Something went wrong", err));

app.use(express.json());
app.use(
  cors({
    origin: (_origin, callback) => {
      return callback(null, true);
    },
    credentials: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//app.use("/api/users", users);
app.use("/api/cloud-accounts", cloud);
app.use("/api/auth", auth);
app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    console.log(err.message);
    if (!err.message) err.message = 'Oh No, Something Went Wrong!'
    res.status(statusCode).send( {status: "error", error: err.message} )
})

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));
