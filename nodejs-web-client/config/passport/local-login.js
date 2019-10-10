const config = require("../config");
const axios = require("axios");
const bcrypt = require("bcryptjs");
const i18n = require("i18n");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

module.exports = () => {
  passport.use(
    "local-login",
    new LocalStrategy(
      {
        usernameField: "username",
        passwordField: "password",
        passReqToCallback: true
      },
      (req, username, password, callback) => {
        var locale = req.cookies.lang ? req.cookies.lang : i18n.getLocale();
        axios
          .get(config.API_HOST + "/api/auth/:credentials", {
            params: {
              username: username,
              password: bcrypt.hashSync(password, config.SALT),
              locale: locale
            }
          })
          .then(res => {
            callback(null, res.data.token);
          })
          .catch(err => {
            callback(
              null,
              false,
              req.flash("flashMessage", err.response.data.message)
            );
          });
      }
    )
  );
};
