let api = require("../services/api");
let files = require("../services/files");
let passport = require("passport");

module.exports = app => {
  app.get("/file/download/:file", passport.authenticationMiddleware(), (req, res) => {
    files.download(req, res);
  });

  app.post("/file/upload", passport.authenticationMiddleware(), (req, res) => {
    files.uploadToTmp(req, res);
  });

  app.get("/files/:id", passport.authenticationMiddleware(), (req, res) => {
    api.get("/api/registry-files/:id", { id: req.params.id }, req, res);
  });

  app.post("/files/:data", passport.authenticationMiddleware(), (req, res) => {
    files.uploadToServer(req, res);
  });
};
