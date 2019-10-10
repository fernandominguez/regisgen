let api = require("../services/api");
let config = require("../config");
let bcrypt = require("bcryptjs");
let passport = require("passport");

module.exports = app => {
  app.delete(
    "/config/user/:id",
    passport.authenticationMiddleware(),
    (req, res) => {
      api.delete("/api/user/:id", { id: req.params.id }, req, res);
    }
  );

  app.get(
    "/config/user/:id",
    passport.authenticationMiddleware(),
    (req, res) => {
      api.get("/api/user/:id", { id: req.params.id }, req, res);
    }
  );

  app.get("/config/users", passport.authenticationMiddleware(), (req, res) => {
    api.get("/api/users/", null, req, res);
  });

  app.get(
    "/config/user-permissions/:id",
    passport.authenticationMiddleware(),
    (req, res) => {
      api.get("/api/user-permissions/:id", { id: req.params.id }, req, res);
    }
  );

  app.post(
    "/config/user/:data",
    passport.authenticationMiddleware(),
    (req, res) => {
      var userData = JSON.parse(req.params.data);
      if (userData.password) {
        userData.password = bcrypt.hashSync(userData.password, config.SALT);
      }
      if (userData.newpasword) {
        userData.newpassword = bcrypt.hashSync(
          userData.newpassword,
          config.SALT
        );
      }
      if (userData.repassword) {
        userData.repassword = bcrypt.hashSync(userData.repassword, config.SALT);
      }
      api.post("/api/user", JSON.stringify(userData), req, res);
    }
  );

  app.put(
    "/config/user/:data",
    passport.authenticationMiddleware(),
    (req, res) => {
      var userData = JSON.parse(req.params.data);
      if (userData.password) {
        userData.password = bcrypt.hashSync(userData.password, config.SALT);
      }
      if (userData.newpassword) {
        userData.newpassword = bcrypt.hashSync(userData.newpassword, config.SALT);
      }
      if (userData.repassword) {
        userData.repassword = bcrypt.hashSync(userData.repassword, config.SALT);
      }
      api.put("/api/user", JSON.stringify(userData), req, res);
    }
  );

  app.put(
    "/config/user-permissions/:data",
    passport.authenticationMiddleware(),
    (req, res) => {
      api.put("/api/user-permissions", req.params.data, req, res);
    }
  );
};
