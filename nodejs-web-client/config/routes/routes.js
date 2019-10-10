module.exports = app => {
  // All default routes
  require("./default-routes")(app);

  // All signup / signin routes
  require("./signup-routes")(app);

  require("./departments-routes")(app);
  require("./files-routes")(app);
  require("./menus-routes")(app);
  require("./permissions-routes")(app);
  require("./registry-routes")(app);
  require("./thirdparties-routes")(app);
  require("./users-routes")(app);
};
