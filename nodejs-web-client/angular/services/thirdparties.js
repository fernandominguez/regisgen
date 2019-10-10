var services = angular.module("ngregisgen.thirdparties-services", ["ngResource"]);

services.factory("ThirdpartiesFactory", function ($resource) {
  return $resource("/thirdparties", {}, {
    query: { method: "GET", isArray: true }
  })
});

services.factory("ThirdpartyFactory", function ($resource) {
  return {
    thirdparty: $resource("/thirdparty/:id/:data", {}, {
      create: { method: "POST", params: { data: "@data" } },
      read: { method: "GET", params: { id: "@id" } },
      update: { method: "PUT", params: { data: "@data" } },
      delete: { method: "DELETE", params: { id: "@id" } }
    })
  };
});
