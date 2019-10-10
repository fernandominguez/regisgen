const config = require("../config");
const axios = require("axios");
const i18n = require("i18n");
const passport = require("passport");
const LocalStrategy = require("passport-local-roles").Strategy;

module.exports = () => {
  passport.use(
    "local-roles",
    new LocalStrategy(
      {
        usernameField: "username",
        passwordField: "password",
        roleField: "role",
        passReqToCallback: true
      },
      (req, username, password, role, callback) => {
        var locale = req.cookies.lang ? req.cookies.lang : i18n.getLocale();
        axios
          .get(config.API_HOST + "/api/auth/:credentials", {
            params: {
              username: username,
              password: password,
              role: role,
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
