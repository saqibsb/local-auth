const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");
const cors = require("cors");
const mongoose = require("mongoose");
const errorHandler = require("errorhandler");

//Configure mongoose's promise to global promise
mongoose.promise = global.Promise;

//Configure isProduction variable
const isProduction = process.env.NODE_ENV === "production";

//Initiate our app
const app = express();

//Configure our app
app.use(cors());
app.use(require("morgan")("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.use(function(req, res) {
//   res.setHeader("Content-Type", "application/json");
//   res.write("you posted:\n");
//   res.end(JSON.stringify(req.body, null, 2));
// });

app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "passport-tutorial",
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false
  })
);

if (!isProduction) {
  app.use(errorHandler());
}

//Configure Mongoose
mongoose.connect(
  "mongodb+srv://local-auth:admin@cluster0-39n0j.mongodb.net/local-auth?retryWrites=true&w=majority"
);
mongoose.set("debug", true);

//mongodb+srv://fyp-dev:admin@cluster0-xkerc.mongodb.net/<dbname>?retryWrites=true&w=majority

//Models & routes
require("./models/Users");
require("./config/passport");
app.use(require("./routes"));

//Error handlers & middlewares
if (!isProduction) {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);

    res.json({
      errors: {
        message: err.message,
        error: err
      }
    });
  });
}

// app.get("/", (req, res) => {
//   res.send({
//     Id: "hurrra "
//   });
// });

app.use((err, req, res, next) => {
  res.status(err.status || 500);

  res.json({
    errors: {
      message: err.message,
      error: {}
    }
  });
});

app.listen(8000, () => console.log("Server running on http://localhost:8000/"));
