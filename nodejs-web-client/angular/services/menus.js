var services = angular.module("ngregisgen.menu-services", ["ngResource"]);

services.factory("MenusFactory", function($resource) {
  return {
    menus: $resource("/config/menus", {}, {
      query: { method: "GET", isArray: true }
    }),
    others: $resource("/config/menus/others/:id", {}, {
      query: { method: "GET", params: { id: "@id" }, isArray: true }
    }),
    tree: $resource("/tree/:role", {}, {
      query: { method: "GET", params: { role: "@role" }, isArray: true }
    })
  };
});

services.factory("MenuFactory", function($resource) {
  return {
    menu: $resource("/config/menu/:id/:data", {}, {
      create: { method: "POST", params: { data: "@data" } },
      read: { method: "GET", params: { id: "@id" } },
      update: { method: "PUT", params: { data: "@data" } },
      delete: { method: "DELETE", params: { id: "@id" } }
    }),
    permissions: $resource("/menu-crude/:menu/:role", {}, {
      crude: { method: "GET", params: { menu: "@menu", role: "@role" } }
    })
  };
});
