const lang = require("../services/lang");
const passport = require("passport");

module.exports = function(app) {
  // Display Login Page
  app.get("/", (req, res) => {
    var locale = req.cookies.lang ? req.cookies.lang : res.getLocale();
    var urlLocale = locale == "es" ? "en" : "es";
    res.render("index", {
      title: lang.message("App Title", locale, res),
      language: lang.message("Language", locale, res),
      register: lang.message("Signup", locale, res),
      phUsername: lang.message("phUsername", locale, res),
      phPassword: lang.message("phPassword", locale, res),
      btnSignin: lang.message("Signin", locale, res),
      userName: req.user ? req.user.username : undefined,
      name: req.user ? req.user.name : undefined,
      surname: req.user ? req.user.surname : undefined,
      locale: urlLocale,
      flashMessage: req.flash("flashMessage")
    });
  });
  // Change App language to English
  app.get("/en", (req, res) => {
    res.cookie("lang", "en");
    res.redirect("/");
  });
  // Change App language to Spanish
  app.get("/es", (req, res) => {
    res.cookie("lang", "es");
    res.redirect("/");
  });
  // Display Authenticated Username
  app.get("/username", passport.authenticationMiddleware(), (req, res) => {
    res.status(200).json({
      userName: req.user ? req.user.username : undefined,
      name: req.user ? req.user.name : undefined,
      surname: req.user ? req.user.surname : undefined
    });
  });
  // Display Rolename for the Authenticated User
  app.get("/rolename", passport.authenticationMiddleware(), (req, res) => {
    res.status(200).json({
      roleid: req.user ? req.user.roleId : undefined,
      rolename: req.user ? req.user.roleName : undefined
    });
  });
  // Display Registry Templates
  app.get(
    "/v/registry/:view",
    passport.authenticationMiddleware(),
    (req, res) => {
      res.render("registry/list/" + req.params.view);
    }
  );
  // Display Departments Templates
  app.get(
    "/v/departments/:view",
    passport.authenticationMiddleware(),
    (req, res) => {
      res.render("registry/list/" + req.params.view);
    }
  );
  // Display Thirdparties Templates
  app.get(
    "/v/thirdparties/:view",
    passport.authenticationMiddleware(),
    (req, res) => {
      res.render("registry/list/" + req.params.view);
    }
  );
  // Display Config Templates
  app.get(
    "/v/config/:view",
    passport.authenticationMiddleware(),
    (req, res) => {
      res.render("config/list/" + req.params.view);
    }
  );
  // Display Navbar Templates
  app.get(
    "/v/layouts/navbars/:view",
    passport.authenticationMiddleware(),
    (req, res) => {
      res.render("layouts/navbars/" + req.params.view);
    }
  );
};
