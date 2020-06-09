const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const session = require("express-session"); //session managment
const MongoStore = require("connect-mongo")(session);
const passport = require("passport");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

// dotenv

require("dotenv").config();

//Middleware
// app.use(cors());

// parse application/x-www-form-urlencoded
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

// parse application/json
app.use(bodyParser.json());
app.use(cookieParser());
// app.use(
//   cors({
//     credentials: true,
//   })
// );

mongoose.connect(
  process.env.DBSTRING,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  (err, res) => {
    if (err) throw err;
    console.log("DB online ONLINE");
  }
);

app.use(
  session({
    secret: "ijegoierjgoiemrjgoiem",
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
    }),
    resave: true,
    saveUninitialized: true,
    cookie: {
      domain: ".domain.com",
      maxAge: 24 * 6 * 60 * 10000,
    },
    // vcookie: {
    //   httpOnly: true,
    //   maxAge: 2419200000,
    // }, // configure when sessions expires
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://localhost:8080");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, X-AUTHENTICATION, X-IP, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET,POST,DELETE,PUT,OPTIONS");
  next();
});

passport.serializeUser(function (user_id, done) {
  console.log("llego esto prro en serialize: ", user_id);
  done(null, user_id);
});

passport.deserializeUser(function (user_id, done) {
  console.log("llego esto prro en deserialize: ", user_id);
  done(null, user_id);
});

const routes = require("./routes/api/api.js");
app.use("/api", routes);

//Handle Production
if (process.env.NODE_ENV === "production") {
  //static folder
  app.use(express.static(__dirname + "/public"));
  //Handle SPA
  app.get(/.*/, (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
  });
}
process.env.PORT = process.env.PORT || 3000;
app.listen(process.env.PORT, () => {
  console.log(`Server starting on port ${process.env.PORT}`);
});
