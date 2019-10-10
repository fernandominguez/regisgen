const config = require("../config");
const axios = require("axios");
const bcrypt = require("bcryptjs");
const dateformat = require("dateformat");
const moment = require("moment");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

module.exports = () => {
  passport.use(
    "local-signup",
    new LocalStrategy(
      {
        usernameField: "username",
        passwordField: "password",
        passReqToCallback: true
      },
      (req, username, password, callback) => {
        var date = moment(req.body.birthday, "DD/MM/YYYY");
        var birthday = dateformat(date.toDate(), "yyyy-mm-dd HH:MM:ss.L");
        const User = {
          username: username,
          password: bcrypt.hashSync(password, config.SALT),
          repassword: bcrypt.hashSync(req.body.repassword, config.SALT),
          name: req.body.name,
          surname: req.body.surname,
          birthday: birthday,
          email: req.body.email,
          phone: req.body.phone,
          mobile: req.body.mobile,
          address: req.body.address
        };

        var locale = req.cookies.lang ? req.cookies.lang : i18n.getLocale();
        axios
          .post(config.API_HOST + "/api/user", {
            data: User,
            locale: locale
          })
          .then(res => {
            if (!res.data.err) {
              return callback(null, res.data.data);
            } else {
              return callback(
                null,
                false,
                req.flash("flashMessage", res.data.err.message)
              );
            }
          })
          .catch(err => {
            return callback(err);
          });
      }
    )
  );
};
