const config = require("./config/config");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const multipart = require("connect-multiparty");
const express = require("express");
const expressSession = require("express-session");
const i18n = require("i18n");
const passport = require("passport");
const flash = require("connect-flash");

const app = express();

// Languages
i18n.configure({
  locales: ["es", "en"],
  defaultLocale: "es",
  directory: "./config/locales"
});

// Include Authentication Strategies
require("./config/passport/passport");

app.set("view engine", "pug");
app.set("views", "./views");
app.use(express.static("./angular"));
app.use(express.static("./node_modules"));
app.use(express.static("./public"));
app.use(express.static("./tmp/download"));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  expressSession({
    secret: config.SECRET_KEY,
    resave: false,
    saveUninitialized: false
  })
);
app.use(i18n.init);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(multipart({ uploadDir: config.UPLOAD_DIR }));

// Include all Routes
require("./config/routes/routes")(app);

const client = app.listen(config.PORT, function() {
  const port = client.address().port;
  console.log("%s http://localhost:%s", i18n.__("Listening at"), port);
});

module.exports.getApp = app;
