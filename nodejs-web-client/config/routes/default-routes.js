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
      res.render("config/list/" + req.params.view, {
        btnAdd: lang.message("btnAdd", req, res),
        btnClose: lang.message("btnClose", req, res),
        btnDelete: lang.message("btnDelete", req, res),
        btnPrint: lang.message("btnPrint", req, res),
        btnReturn: lang.message("btnReturn", req, res),
        btnSave: lang.message("btnSave", req, res),
        lblAddress: lang.message("lblAddress", req, res),
        lblBirthday: lang.message("lblBirthday", req, res),
        lblEmail: lang.message("lblEmail", req, res),
        lblHref: lang.message("lblHref", req, res),
        lblIcon: lang.message("lblIcon", req, res),
        lblMobile: lang.message("lblMobile", req, res),
        lblMenuName: lang.message("lblMenuName", req, res),
        lblMenuParent: lang.message("lblMenuParent", req, res),
        lblName: lang.message("lblName", req, res),
        lblOrder: lang.message("lblOrder", req, res),
        lblPassword: lang.message("lblPassword", req, res),
        lblPermissionName: lang.message("lblPermissionName", req, res),
        lblPhone: lang.message("lblPhone", req, res),
        lblRePassword: lang.message("lblRePassword", req, res),
        lblSurname: lang.message("lblSurname", req, res),
        lblUserName: lang.message("lblUserName", req, res),
        msgFirst: lang.message("msgFirst", req, res),
        msgLast: lang.message("msgLast", req, res),
        msgListing: lang.message("msgListing", req, res),
        msgMenu: lang.message("msgMenu", req, res),
        msgMenuPermissions: lang.message("msgMenuPermissions", req, res),
        msgMenuPerPage: lang.message("msgMenuPerPage", req, res),
        msgNext: lang.message("msgNext", req, res),
        msgNewMenu: lang.message("msgNewMenu", req, res),
        msgNewPermission: lang.message("msgNewPermission", req, res),
        msgNewUser: lang.message("msgNewUser", req, res),
        msgNoMenuFound: lang.message("msgNoMenuFound", req, res),
        msgNoPermissionsFound: lang.message("msgNoPermissionsFound", req, res),
        msgNoUsersFound: lang.message("msgNoUsersFound", req, res),
        msgOf: lang.message("msgOf", req, res),
        msgPermission: lang.message("msgPermission", req, res),
        msgPermissionsOf: lang.message("msgPermissionsOf", req, res),
        msgPermissionsPerPage: lang.message("msgPermissionsPerPage", req, res),
        msgPrevious: lang.message("msgPrevious", req, res),
        msgUser: lang.message("msgUser", req, res),
        msgUsersPerPage: lang.message("msgUsersPerPage", req, res),
        phSearch: lang.message("phSearch", req, res),
        thCreate: lang.message("thCreate", req, res),
        thDelete: lang.message("thDelete", req, res),
        thEmail: lang.message("thEmail", req, res),
        thExecute: lang.message("thExecute", req, res),
        thHref: lang.message("thHref", req, res),
        thIcon: lang.message("thIcon", req, res),
        thId: lang.message("thId", req, res),
        thMenu: lang.message("thMenu", req, res),
        thMobile: lang.message("thMobile", req, res),
        thName: lang.message("thName", req, res),
        thOrder: lang.message("thOrder", req, res),
        thParent: lang.message("thParent", req, res),
        thRead: lang.message("thRead", req, res),
        thSurname: lang.message("thSurname", req, res),
        thUpdate: lang.message("thUpdate", req, res),
        titleClickToShortByThisColumn: lang.message(
          "titleClickToShortByThisColumn",
          req,
          res
        ),
        titleDeleteMenu: lang.message("titleDeleteMenu", req, res),
        titleDeletePermission: lang.message("titleDeletePermission", req, res),
        titleDeleteSelected: lang.message("titleDeleteSelected", req, res),
        titleDeleteUser: lang.message("titleDeleteUser", req, res),
        titleFilterUsers: lang.message("titleFilterUsers", req, res),
        titleModifyData: lang.message("titleModifyData", req, res),
        titleMenuPerPage: lang.message("titleMenuPerPage", req, res),
        titleNewMenu: lang.message("titleNewMenu", req, res),
        titleNewPermission: lang.message("titleNewPermission", req, res),
        titleNewUser: lang.message("titleNewUser", req, res),
        titlePermissionsPerPage: lang.message(
          "titlePermissionsPerPage",
          req,
          res
        ),
        titlePrintDivMenu: lang.message("titlePrintDivMenu", req, res),
        titlePrintDivPermissions: lang.message(
          "titlePrintDivPermissions",
          req,
          res
        ),
        titlePrintDivUsers: lang.message("titlePrintDivUsers", req, res),
        titlePrintList: lang.message("titlePrintList", req, res),
        titleShowData: lang.message("titleShowData", req, res),
        titleUserPermissions: lang.message("titleUserPermissions", req, res),
        titleUsersPerPage: lang.message("titleUsersPerPage", req, res)
      });
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
