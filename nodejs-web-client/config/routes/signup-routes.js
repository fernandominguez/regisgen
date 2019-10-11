let config = require("../config");
let lang = require("../services/lang");
let axios = require("axios");
let jwt = require("jwt-simple");
let passport = require("passport");

module.exports = app => {
  /**
   * Display Logout
   **/
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  /**
   * Display Roles Form
   **/
  app.get("/roles", passport.authenticationMiddleware(), (req, res) => {
    var defaultLocale = res.getLocale();
    var locale = req.cookies.lang ? req.cookies.lang : defaultLocale;
    if (!req._passport.session.user) {
      res.redirect("/");
    } else {
      axios
        .get(config.API_HOST + "/api/user-roles/:id", {
          headers: {
            authorization: req._passport.session.user.token
          },
          params: {
            id: req.user.id,
            locale: locale
          }
        })
        .then(data => {
          if (!data || !data.data || data.data.length < 1) {
            res.redirect("/");
          } else {
            if (data.data.length > 1) {
              res.render("roles", {
                title: lang.message("App Title", req, res),
                username: req.user ? req.user.username : undefined,
                password: req.user ? req.user.password : undefined,
                lblRole: lang.message("lblRole", locale, res),
                btnSelect: lang.message("btnSelect", locale, res),
                roles: data.data,
                flashMessage: req.flash("flashMessage")
              });
            } else {
              res.redirect("/");
            }
          }
        })
        .catch(err => {
          res.redirect("/");
        });
    }
  });

  /**
   * Receive Signin Form Data
   **/
  app.post(
    "/signin",
    passport.authenticate("local-login", {
      successRedirect: "/roles",
      failureRedirect: "/",
      failureFlash: true
    })
  );

  /**
   * Display Signup Form
   **/
  app.get("/signup", (req, res) => {
    var defaultLocale = res.getLocale();
    var locale = req.cookies.lang ? req.cookies.lang : defaultLocale;
    res.render("signup", {
      title: lang.message("App Title", req, res),
      userName: req.user ? req.user.username : undefined,
      message: lang.message("Registration Form", req, res),
      phUsername: lang.message("phUsername", req, res),
      phName: lang.message("phName", req, res),
      phSurname: lang.message("phSurname", req, res),
      phBirthday: lang.message("phBirthday", req, res),
      phEmail: lang.message("phEmail", req, res),
      phPhone: lang.message("phPhone", req, res),
      phMobile: lang.message("phMobile", req, res),
      phAddress: lang.message("phAddress", req, res),
      phPassword: lang.message("phPassword", req, res),
      phRepassword: lang.message("phRepassword", req, res),
      btnSignup: lang.message("Sign up", req, res),
      flashMessage: req.flash("flashMessage"),
      locale: locale
    });
  });

  /**
   * Receive Roles Form Data
   **/
  app.post(
    "/selectrole",
    passport.authenticate("local-roles", { failureRedirect: "/roles" }),
    (req, res) => {
      res.redirect("/");
    }
  );

  /**
   * Receive Signup Form Data
   **/
  app.post(
    "/signup",
    passport.authenticate("local-signup", { failureRedirect: "/signup" }),
    (req, res) => {
      res.redirect("/");
    }
  );
};
