var app = angular.module("ngregisgen.menu-controllers", []);

app.controller("MenuListCtrl", ["$rootScope", "$scope", "MenusFactory", "MenuFactory", "AppFactory", "$location", "$window", "$timeout",
  function ($rootScope, $scope, MenusFactory, MenuFactory, AppFactory, $location, $window, $timeout) {
    $scope.menuCrude = $rootScope.menuCrude;
    $scope.icons = AppFactory.fa;
    $scope.menus = MenusFactory.menus.query({},
      function(res, headers) {
        $scope.allIdsSelected = false;
        $scope.anyIdsSelected = false;
        $scope.currentPage = 1;
        $scope.entryLimit = 10;
        $scope.filteredItems = $scope.menus.length;
        $scope.totalItems = $scope.menus.length;
        $("#selectPages").val($scope.entryLimit);
        $("#selectPages").selectpicker("render");
        $("#selectPages").selectpicker("show");
      }
    );
    $scope.newMenu = function () {
      $scope.others = MenusFactory.others.query({id: 0}, function(res, headers) {
        loadSelect("#selectParent", $scope.others, {
          "value":  "id",
          "option": "name",
          "icon":   "icon"
        });
        loadSelect("#selectIcon", $scope.icons, {
          value: "name",
          option: "name",
          icon: "name"
        });
      });
      $scope.menu = {};
      $scope.isNew = true;
      $scope.isView = false;
      $scope.flashMessage = null;
      $scope.saving = null;
      $scope.menuForm.$setPristine();
    };
    $scope.viewMenu = function (menuId) {
      $scope.menuForm.$setPristine();
      $scope.menu = MenuFactory.menu.read({id: menuId}, function(res, headers) {
        $scope.menu.hashedHref = $scope.menu.href.replace("#!", "");
        $("#selectParent").selectpicker("hide");
        $("#selectIcon").selectpicker("hide");
      });
      $scope.isNew = false;
      $scope.isView = true;
      $scope.flashMessage = null;
      $scope.saving = null;
    };
    $scope.editMenu = function (menuId) {
      $scope.menuForm.$setPristine();
      $scope.menu = MenuFactory.menu.read({id: menuId}, function(res, headers) {
        $scope.menu.hashedHref = $scope.menu.href.replace("#!", "");
        $scope.others = MenusFactory.others.query({id: menuId}, function(res, headers) {
          loadSelect("#selectParent", $scope.others, {
            "value":  "id",
            "option": "name",
            "icon":   "icon"
          }, $scope.menu.parent);
          loadSelect("#selectIcon", $scope.icons, {
            "value":  "name",
            "option": "name",
            "icon":   "name"
          }, $scope.menu.icon);
        });
      });
      $scope.isNew = false;
      $scope.isView = false;
      $scope.flashMessage = null;
      $scope.saving = null;
    };
    $scope.deleteMenu = function (menuId) {
      if (!menuId) {
        menuId = $scope.menu.id;
      }
      if ($window.confirm("¿Estás seguro que deseas eliminar este menú?")) {
        MenuFactory.menu.delete({ id: menuId });
        $timeout(function() {
          $scope.menus = MenusFactory.menus.query({},
            function(res, headers) {
              $scope.allIdsSelected = false;
              $scope.anyIdsSelected = false;
              $scope.filteredItems = $scope.menus.length;
              $scope.totalItems = $scope.menus.length;
              $("#selectPages").selectpicker("show");
              if ($rootScope.role) {
                $rootScope.menus = MenusFactory.tree.query({ role: $rootScope.role.roleid });
              }
            }
          );
        }, 500);
      }
    };
    $scope.deleteSelectedMenus = function () {
      if ($scope.anyIdsSelected) {
        if ($window.confirm("¿Estás seguro que deseas eliminar estos menús?")) {
          var ids = ($scope.filtered.length > $scope.entryLimit ? $scope.entryLimit : $scope.filtered.length);
          for (var i=0; i<ids; i++) {
            if ($scope.filtered[i].isChecked) {
              MenuFactory.menu.delete({ id: $scope.filtered[i].id });
            }
          }
          $timeout(function() {
            $scope.menus = MenusFactory.menus.query({},
              function(res, headers) {
                $scope.allIdsSelected = false;
                $scope.anyIdsSelected = false;
                $scope.filteredItems = $scope.menus.length;
                $scope.totalItems = $scope.menus.length;
                $("#selectPages").selectpicker("show");
                if ($rootScope.role) {
                  $rootScope.menus = MenusFactory.tree.query({ role: $rootScope.role.roleid });
                }
              }
            );
          }, 500);
        }
      }
    };
    $scope.addMenu = function (valid) {
      if (valid) {
        $scope.menu.parent = (($("#selectParent").val().length > 0) ? $("#selectParent").val()[0] : "0");
        $scope.menu.icon = (($("#selectIcon").val().length > 0) ? $("#selectIcon").val()[0] : null);
        $scope.menu.href = (($scope.menu.hashedHref) ? "#!" + $scope.menu.hashedHref : "#!");
        menuData = JSON.stringify($scope.menu);
        $scope.saving = "Guardando ..."
        MenuFactory.menu.create( { data: menuData },
          function(res, headers) {
            $scope.saving = "¡¡ Menu Creado !!";
            $timeout(function() {
              $("#menuModal").modal("hide");
              $scope.menus = MenusFactory.menus.query({},
                function(res, headers) {
                  $scope.allIdsSelected = false;
                  $scope.anyIdsSelected = false;
                  $scope.filteredItems = $scope.menus.length;
                  $scope.totalItems = $scope.menus.length;
                  $("#selectPages").selectpicker("show");
                  if ($rootScope.role) {
                    $rootScope.menus = MenusFactory.tree.query({ role: $rootScope.role.roleid });
                  }
                }
              );
            }, 500);
          },
          function(err) {
            $scope.saving = null;
            $scope.flashMessage = err.data.error.message;
          }
        );
      }
    };
    $scope.updateMenu = function (valid) {
      if (valid) {
        $scope.menu.parent = (($("#selectParent").val().length > 0) ? $("#selectParent").val()[0] : "0");
        $scope.menu.icon = (($("#selectIcon").val().length > 0) ? $("#selectIcon").val()[0] : $scope.menu.icon);
        $scope.menu.href = (($scope.menu.hashedHref) ? "#!" + $scope.menu.hashedHref : "#!");
        menuData = JSON.stringify($scope.menu);
        $scope.saving = "Guardando ...";
        MenuFactory.menu.update({ data: menuData },
          function(res, headers) {
            $scope.saving = "¡¡ Guardado !!";
            $timeout(function() {
              $("#menuModal").modal("hide");
              $scope.flashMessage = null;
              $scope.menus = MenusFactory.menus.query({},
                function(res, headers) {
                  $scope.allIdsSelected = false;
                  $scope.anyIdsSelected = false;
                  $scope.filteredItems = $scope.menus.length;
                  $scope.totalItems = $scope.menus.length;
                  $("#selectPages").selectpicker("show");
                  if ($rootScope.role) {
                    $rootScope.menus = MenusFactory.tree.query({ role: $rootScope.role.roleid });
                  }
                }
              );
            }, 500);
          },
          function(err) {
            $scope.saving = null;
            $scope.flashMessage = err.data.error.message;
          }
        );
      }
    };
    $scope.setPage = function (pageNo) {
      $scope.currentPage = pageNo;
    };
    $scope.filter = function () {
      $timeout(function() {
        $scope.filteredItems = $scope.filtered.length;
      }, 10);
    };
    $scope.sort_by = function (predicate) {
      $scope.predicate = predicate;
      $scope.reverse = !$scope.reverse;
    };
    $scope.checkAll = function () {
      var ids = ($scope.filtered.length > $scope.entryLimit ? $scope.entryLimit : $scope.filtered.length);
      for (var i=0; i<ids; i++) {
        $scope.filtered[i].isChecked = $scope.allIdsSelected;
      }
      $scope.anyIdsSelected = $scope.allIdsSelected;
    };
    $scope.checkMenu = function (id) {
      $scope.allIdsSelected = isAllIdsSelected();
      $scope.anyIdsSelected = isAnyIdsSelected();
    };
    function isAllIdsSelected() {
      var ids = ($scope.filtered.length > $scope.entryLimit ? $scope.entryLimit : $scope.filtered.length);
      for (var i=0; i<ids; i++) {
        if (!$scope.filtered[i].isChecked) {
          return false;
        }
      }
      return true;
    }
    function isAnyIdsSelected() {
      var ids = ($scope.filtered.length > $scope.entryLimit ? $scope.entryLimit : $scope.filtered.length);
      for (var i=0; i<ids; i++) {
        if ($scope.filtered[i].isChecked) {
          return true;
        }
      }
      return false;
    }
    function loadSelect(id, data, options, selected) {
      $(id).find("option").remove().end();
      $(id).selectpicker("destroy");
      for (var i=0; i<data.length; i++) {
        $(id).append(
          "<option" +
            (data[i][options["icon"]] ? " data-icon='fa fa-" + data[i][options["icon"]] + "'" : "") +
            " value='" + data[i][options["value"]] + "'" +
          ">" +
            data[i][options["option"]] +
          "</option>");
      };
      if (selected) { $(id).selectpicker("val", selected); };
      $(id).selectpicker("refresh");
      $(id).selectpicker("show");
    }
  }
]);
