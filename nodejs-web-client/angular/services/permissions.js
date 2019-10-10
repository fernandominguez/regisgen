var services = angular.module("ngregisgen.permission-services", ["ngResource"]);

services.factory("PermissionsFactory", function ($resource) {
  return {
    permissions: $resource("/config/permissions", {}, {
      query: { method: "GET", isArray: true }
    }),
    user: $resource("/config/user-permissions/:id", {}, {
      query: { method: "GET", params: { id: "@id" }, isArray: true }
    })
  };
});

services.factory("PermissionFactory", function ($resource) {
  return $resource("/config/permission/:id/:data", {}, {
    create: { method: "POST", params: { data: "@data" } },
    read: { method: "GET", params: { id: "@id" } },
    update: { method: "PUT", params: { data: "@data" } },
    delete: { method: "DELETE", params: { id: "@id" } },
  })
});
