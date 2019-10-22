var services = angular.module("ngregisgen.departments-services", ["ngResource"]);

services.factory("DepartmentsFactory", function ($resource) {
  return $resource("/departments", {}, {
    query: { method: "GET", isArray: true }
  })
});

services.factory("DepartmentFactory", function ($resource) {
  return {
    department: $resource("/department/:id/:data", {}, {
      create: { method: "POST", params: { data: "@data" } },
      read: { method: "GET", params: { id: "@id" } },
      update: { method: "PUT", params: { data: "@data" } },
      delete: { method: "DELETE", params: { id: "@id" } }
    })
  };
});
