var app = angular.module("ngregisgen.tree-controllers", []);

app.controller("TreeCtrl", [
  "$rootScope",
  "$scope",
  "MenusFactory",
  "$http",
  function($rootScope, $scope, MenusFactory, $http) {
    $http.get("/username").then(function(data) {
      $scope.username = data.data.name;
    });
    $http.get("/rolename").then(function(data) {
      $rootScope.role = data.data;
      if ($rootScope.role) {
        $scope.username = $rootScope.role.rolename
        ? $scope.username + " (" + $rootScope.role.rolename + ")"
        : $scope.username;
        $rootScope.menus = MenusFactory.tree.query(
          { role: $rootScope.role.roleid },
          function(res, headers) {
            $("#menu-toggle").click(function(e) {
              e.preventDefault();
              $("#wrapper").toggleClass("toggled");
            });
            $("#menu-toggle-2").click(function(e) {
              e.preventDefault();
              $("#wrapper").toggleClass("toggled-2");
              collapse(0, $rootScope.menus);
            });
          }
        );
      }
    });
    $scope.changeClass = function(menu) {
      if (menu.class == "clicked") {
        menu.class = "";
      } else {
        menu.class = "clicked";
      }
    };
    $scope.showChildren = function(menu, menus) {
      menu.active = !menu.active;
      collapse(menu.id, menus);
    };
    $scope.selectMenu = function(crude) {
      $rootScope.menuCrude = crude;
    };
    var collapse = function(menu, branches) {
      if (branches) {
        branches.forEach(function(branch) {
          if (branch.id != menu) {
            branch.active = false;
            branch.class = "";
            collapse(branch.id, branch.children);
          }
        });
      }
    };
  }
]);
