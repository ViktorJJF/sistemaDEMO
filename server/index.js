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
app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
  );
  if ("OPTIONS" == req.method) {
    res.send(200);
  } else {
    next();
  }
});

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
    resave: false,
    saveUninitialized: true,
    vcookie: {
      httpOnly: true,
      maxAge: 2419200000,
    }, // configure when sessions expires
  })
);
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user_id, done) {
  // done(null, user_id);
  done(null, true);
});

passport.deserializeUser(function (user_id, done) {
  // done(null, user_id);
  done(null, false);
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
