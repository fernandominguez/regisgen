var services = angular.module("ngregisgen.logout-services", []);

services.factory("LogoutFactory", ["$http", "$window",
  function($http, $window) {
    $http.get("/logout").then(function(data, status) {
      $window.location.reload();
    });
  }
]);
