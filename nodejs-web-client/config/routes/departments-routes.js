let api = require("../services/api");
let passport = require("passport");

module.exports = app => {
  app.delete(
    "/department/:id",
    passport.authenticationMiddleware(),
    (req, res) => {
      api.delete("/api/department/:id", { id: req.params.id }, req, res);
    }
  );

  app.get(
    "/department/:id",
    passport.authenticationMiddleware(),
    (req, res) => {
      api.get("/api/department/:id", { id: req.params.id }, req, res);
    }
  );

  app.post(
    "/department/:data",
    passport.authenticationMiddleware(),
    (req, res) => {
      api.post("/api/department", JSON.parse(req.params.data), req, res);
    }
  );

  app.put(
    "/department/:data",
    passport.authenticationMiddleware(),
    (req, res) => {
      api.put("/api/department", JSON.parse(req.params.data), req, res);
    }
  );

  app.get("/departments", passport.authenticationMiddleware(), (req, res) => {
    api.get("/api/departments/", null, req, res);
  });
};
