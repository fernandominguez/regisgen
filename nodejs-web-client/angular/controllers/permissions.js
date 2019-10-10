var app = angular.module("ngregisgen.permission-controllers", []);

app.controller("PermissionListCtrl", ["$rootScope", "$scope", "PermissionsFactory", "PermissionFactory", "MenusFactory", "$location", "$window", "$timeout", "$filter",
  function ($rootScope, $scope, PermissionsFactory, PermissionFactory, MenusFactory, $location, $window, $timeout, $filter) {
    $scope.menuCrude = $rootScope.menuCrude;
    $scope.permissions = PermissionsFactory.permissions.query({},
      function(res, headers) {
        $scope.allIdsSelected = false;
        $scope.anyIdsSelected = false;
        $scope.currentPage = 1;
        $scope.entryLimit = 10;
        $scope.filteredItems = $scope.permissions.length;
        $scope.totalItems = $scope.permissions.length;
        $("#selectPages").val($scope.entryLimit);
        $("#selectPages").selectpicker("render");
        $("#selectPages").selectpicker("show");
      }
    );
    $scope.newPermission = function () {
      $scope.permission = {};
      $scope.permission.menus = MenusFactory.menus.query();
      $scope.isNew = true;
      $scope.isView = false;
      $scope.flashMessage = null;
      $scope.saving = null;
      $scope.allCreateSelected = false;
      $scope.allReadSelected = false;
      $scope.allUpdateSelected = false;
      $scope.allDeleteSelected = false;
      $scope.allExecuteSelected = false;
      $scope.permissionForm.$setPristine();
    };
    $scope.viewPermission = function (permissionId) {
      $scope.permissionForm.$setPristine();
      $scope.permission = PermissionFactory.read({id: permissionId},
        function (data) {
          var allmenus = MenusFactory.menus.query(function(err, menus) {
            allmenus.forEach(function(menu) {
              var menuPermissions = $filter('filter')(data.menus, { "id-menu": menu.id });
              menuPermissions.forEach(function(permission) {
                if (permission.crude.search("c") >= 0) { menu.isCreate = true; }
                if (permission.crude.search("r") >= 0) { menu.isRead = true; }
                if (permission.crude.search("u") >= 0) { menu.isUpdate = true; }
                if (permission.crude.search("d") >= 0) { menu.isDelete = true; }
                if (permission.crude.search("e") >= 0) { menu.isExecute = true; }
              });
            });
            $scope.permission.menus = allmenus;
          });
        }
      );
      $scope.isNew = false;
      $scope.isView = true;
      $scope.flashMessage = null;
      $scope.saving = null;
    };
    $scope.editPermission = function (permissionId) {
      $scope.permissionForm.$setPristine();
      $scope.permission = PermissionFactory.read({id: permissionId},
        function (data) {
          var allmenus = MenusFactory.menus.query(function(err, menus) {
            allmenus.forEach(function(menu) {
              var menuPermissions = $filter('filter')(data.menus, { "id-menu": menu.id });
              menuPermissions.forEach(function(permission) {
                if (permission.crude.search("c") >= 0) { menu.isCreate = true; }
                if (permission.crude.search("r") >= 0) { menu.isRead = true; }
                if (permission.crude.search("u") >= 0) { menu.isUpdate = true; }
                if (permission.crude.search("d") >= 0) { menu.isDelete = true; }
                if (permission.crude.search("e") >= 0) { menu.isExecute = true; }
              });
            });
            $scope.permission.menus = allmenus;
            $scope.allCreateSelected = false;
            $scope.allReadSelected = false;
            $scope.allUpdateSelected = false;
            $scope.allDeleteSelected = false;
            $scope.allExecuteSelected = false;
          });
        }
      );
      $scope.isNew = false;
      $scope.isView = false;
      $scope.flashMessage = null;
      $scope.saving = null;
    };
    $scope.deletePermission = function (permissionId) {
      if (!permissionId) {
        permissionId = $scope.permission.id;
      }
      if ($window.confirm("¿Estás seguro que deseas eliminar este permiso?")) {
        PermissionFactory.delete({ id: permissionId }, function(res, headers) {
          $timeout(function() {
            $("#permissionModal").modal("hide");
            $scope.permissions = PermissionsFactory.permissions.query({},
              function(res, headers) {
                $scope.allIdsSelected = false;
                $scope.anyIdsSelected = false;
                $scope.filteredItems = $scope.permissions.length;
                $scope.totalItems = $scope.permissions.length;
                $("#selectPages").selectpicker("show");
              }
            );
          }, 500);
        },
        function(err) {
          $scope.saving = null;
          $scope.flashMessage = err.data.error.message;
        });
      }
    };
    $scope.deleteSelectedPermissions = function () {
      if ($scope.anyIdsSelected) {
        if ($window.confirm("¿Estás seguro que deseas eliminar estos permisos?")) {
          var ids = ($scope.filtered.length > $scope.entryLimit ? $scope.entryLimit : $scope.filtered.length);
          for (var i=0; i<ids; i++) {
            if ($scope.filtered[i].isChecked) {
              PermissionFactory.delete({ id: $scope.filtered[i].id });
            }
          }
          $timeout(function() {
            $scope.permissions = PermissionsFactory.permissions.query({},
              function(res, headers) {
                $scope.allIdsSelected = false;
                $scope.anyIdsSelected = false;
                $scope.filteredItems = $scope.permissions.length;
                $scope.totalItems = $scope.permissions.length;
                $("#selectPages").selectpicker("show");
              }
            );
          }, 500);
        }
      }
    };
    $scope.addPermission = function (valid) {
      if (valid) {
        permissionData = JSON.stringify($scope.permission);
        $scope.saving = "Guardando ..."
        PermissionFactory.create( { data: permissionData },
          function(res, headers) {
            $scope.saving = "¡¡ Permiso Creado !!";
            $timeout(function() {
              $("#permissionModal").modal("hide");
              $scope.permissions = PermissionsFactory.permissions.query({},
                function(res, headers) {
                  $scope.allIdsSelected = false;
                  $scope.anyIdsSelected = false;
                  $scope.filteredItems = $scope.permissions.length;
                  $scope.totalItems = $scope.permissions.length;
                  $("#selectPages").selectpicker("show");
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
    $scope.updatePermission = function (valid) {
      if (valid) {
        permissionData = JSON.stringify($scope.permission);
        $scope.saving = "Guardando ..."
        PermissionFactory.update({ data: permissionData },
          function(res, headers) {
            $scope.saving = "¡¡ Guardado !!";
            $timeout(function() {
              $("#permissionModal").modal("hide");
              $scope.flashMessage = null;
              $scope.permissions = PermissionsFactory.permissions.query({},
                function(res, headers) {
                  $scope.allIdsSelected = false;
                  $scope.anyIdsSelected = false;
                  $scope.filteredItems = $scope.permissions.length;
                  $scope.totalItems = $scope.permissions.length;
                  $("#selectPages").selectpicker("show");
                  $rootScope.menus = MenusFactory.tree.query({ role: $rootScope.role.roleid },
                    function (res, headers) {
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
    $scope.checkAllCreate = function () {
      for (var i=0; i<$scope.permission.menus.length; i++) {
        $scope.permission.menus[i].isCreate = $scope.allCreateSelected;
      }
    };
    $scope.checkAllRead = function () {
      for (var i=0; i<$scope.permission.menus.length; i++) {
        $scope.permission.menus[i].isRead = $scope.allReadSelected;
      }
    };
    $scope.checkAllUpdate = function () {
      for (var i=0; i<$scope.permission.menus.length; i++) {
        $scope.permission.menus[i].isUpdate = $scope.allUpdateSelected;
      }
    };
    $scope.checkAllDelete = function () {
      for (var i=0; i<$scope.permission.menus.length; i++) {
        $scope.permission.menus[i].isDelete = $scope.allDeleteSelected;
      }
    };
    $scope.checkAllExecute = function () {
      for (var i=0; i<$scope.permission.menus.length; i++) {
        $scope.permission.menus[i].isExecute = $scope.allExecuteSelected;
      }
    };
    $scope.checkPermission = function (id) {
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
  }
]);
