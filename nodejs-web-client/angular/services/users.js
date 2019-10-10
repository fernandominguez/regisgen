var services = angular.module("ngregisgen.user-services", ["ngResource"]);

services.factory("UsersFactory", function ($resource) {
  return $resource("/config/users", {}, {
    query: { method: "GET", isArray: true }
  })
});

services.factory("UserFactory", function ($resource) {
  return {
    user: $resource("/config/user/:id/:data", {}, {
      create: { method: "POST", params: { data: "@data" } },
      read: { method: "GET", params: { id: "@id" } },
      update: { method: "PUT", params: { data: "@data" } },
      delete: { method: "DELETE", params: { id: "@id" } }
    }),
    permissions: $resource("/config/user-permissions/:data", {}, {
      update: { method: "PUT", params: { data: "@data" } }
    })
  };
});
