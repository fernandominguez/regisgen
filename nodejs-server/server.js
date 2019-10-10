let config = require("./config/config");
let bodyParser = require("body-parser");
let cookieParser = require("cookie-parser");
let express = require("express");
let i18n = require("i18n");
let flash = require("connect-flash");

let app = express();

// Languages
i18n.configure({
  locales: config.LOCALES,
  defaultLocale: config.DEFAULT_LOCALE,
  directory: config.LOCALES_PATH
});

app.use(cookieParser());
app.use(bodyParser.json());
app.use(i18n.init);
app.use(flash());

// Include all Routes
require("./config/routes/routes")(app);

let server = app.listen(config.PORT, () => {
  var port = server.address().port;
  console.log("%s http://localhost:%s", i18n.__("Listening at"), port);
});

module.exports.getApp = app;
