var app = angular.module("ngregisgen.user-controllers", []);

app.controller("UserListCtrl", ["$rootScope", "$scope", "UsersFactory", "UserFactory", "PermissionsFactory", "$location", "$window", "$timeout", "$filter",
  function ($rootScope, $scope, UsersFactory, UserFactory, PermissionsFactory, $location, $window, $timeout, $filter) {
    $scope.menuCrude = $rootScope.menuCrude;
    $scope.users = UsersFactory.query({},
      function(res, headers) {
        $scope.allIdsSelected = false;
        $scope.anyIdsSelected = false;
        $scope.currentPage = 1;
        $scope.entryLimit = 10;
        $scope.filteredItems = $scope.users.length;
        $scope.totalItems = $scope.users.length;
        $("#selectPages").val($scope.entryLimit);
        $("#selectPages").selectpicker("render");
        $("#selectPages").selectpicker("show");
      }
    );
    $scope.newUser = function () {
      $scope.user = {};
      $scope.isNew = true;
      $scope.isView = false;
      $scope.flashMessage = null;
      $scope.saving = null;
      $scope.userForm.$setPristine();
    };
    $scope.viewUser = function (userId) {
      $scope.userForm.$setPristine();
      $scope.user = UserFactory.user.read({id: userId}, function(res, headers) {
        $scope.user.birthday = $.format.date($scope.user.birthday, "dd/MM/yyyy");
      });
      $scope.isNew = false;
      $scope.isView = true;
      $scope.flashMessage = null;
      $scope.saving = null;
    };
    $scope.editUser = function (userId) {
      $scope.userForm.$setPristine();
      $scope.user = UserFactory.user.read({id: userId}, function(res, headers) {
        $scope.user.birthday = $.format.date($scope.user.birthday, "dd/MM/yyyy");
      });
      $scope.isNew = false;
      $scope.isView = false;
      $scope.flashMessage = null;
      $scope.saving = null;
    };
    $scope.editPermissions = function (userId) {
      $scope.user = UserFactory.user.read({id: userId},
        function(data) {
          var allpermissions = PermissionsFactory.permissions.query(function(res, permissions) {
            var userpermissions = PermissionsFactory.user.query({id: userId}, function(res, up) {
              allpermissions.forEach(function (permission) {
                var userPermissions = $filter('filter')(userpermissions, { "id-permission": permission.id });
                userPermissions.forEach(function(userpermission) {
                  permission.isChecked = true;
                });
              });
              $scope.user.permissions = allpermissions;
            });
          });
        }
      );
      $scope.flashMessage = null;
      $scope.saving = null;
    };
    $scope.deleteUser = function (userId) {
      if (!userId) {
        userId = $scope.user.id;
      }
      if ($window.confirm("¿Estás seguro que deseas eliminar este usuario?")) {
        UserFactory.user.delete({ id: userId }, function(res, headers) {
          $timeout(function() {
            $scope.users = UsersFactory.query({},
              function(res, headers) {
                $scope.allIdsSelected = false;
                $scope.anyIdsSelected = false;
                $scope.filteredItems = $scope.users.length;
                $scope.totalItems = $scope.users.length;
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
    $scope.deleteSelectedUsers = function () {
      if ($scope.anyIdsSelected) {
        if ($window.confirm("¿Estás seguro que deseas eliminar estos usuarios?")) {
          var ids = ($scope.filtered.length > $scope.entryLimit ? $scope.entryLimit : $scope.filtered.length);
          for (var i=0; i<ids; i++) {
            if ($scope.filtered[i].isChecked) {
              UserFactory.user.delete({ id: $scope.filtered[i].id });
            }
          }
          $timeout(function() {
            $scope.users = UsersFactory.query({},
              function(res, headers) {
                $scope.allIdsSelected = false;
                $scope.anyIdsSelected = false;
                $scope.filteredItems = $scope.users.length;
                $scope.totalItems = $scope.users.length;
                $("#selectPages").selectpicker("show");
              }
            );
          }, 500);
        }
      }
    };
    $scope.addUser = function (valid) {
      if (valid) {
        $scope.user.username = $("#inputUserName").val();
        $scope.user.password = $scope.user.newpassword;
        userData = JSON.stringify($scope.user);
        $scope.saving = "Guardando ..."
        UserFactory.user.create( { data: userData },
          function(res, headers) {
            $scope.saving = "¡¡ Usuario Creado !!";
            $timeout(function() {
              $("#userModal").modal("hide");
              $scope.users = UsersFactory.query({},
                function(res, headers) {
                  $scope.allIdsSelected = false;
                  $scope.anyIdsSelected = false;
                  $scope.filteredItems = $scope.users.length;
                  $scope.totalItems = $scope.users.length;
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
    $scope.updateUser = function (valid) {
      if (valid) {
        $scope.user.password = $scope.user.newpassword;
        userData = JSON.stringify($scope.user);
        $scope.saving = "Guardando ..."
        UserFactory.user.update({ data: userData },
          function(res, headers) {
            $scope.saving = "¡¡ Guardado !!";
            $timeout(function() {
              $("#userModal").modal("hide");
              $scope.flashMessage = null;
              $scope.users = UsersFactory.query({},
                function(res, headers) {
                  $scope.allIdsSelected = false;
                  $scope.anyIdsSelected = false;
                  $scope.filteredItems = $scope.users.length;
                  $scope.totalItems = $scope.users.length;
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
    $scope.updateUserPermissions = function () {
      userData = JSON.stringify($scope.user);
      $scope.saving = "Guardando ..."
      UserFactory.permissions.update({ data: userData },
        function(res, headers) {
          $scope.saving = "¡¡ Guardado !!";
          $timeout(function() {
            $("#permissionsModal").modal("hide");
            $scope.flashMessage = null;
          }, 500);
        },
        function(err) {
          $scope.saving = null;
          $scope.flashMessage = err.data.error.message;
        }
      );
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
    $scope.checkAllPermissions = function () {
      for (var i=0; i<$scope.user.permissions.length; i++) {
        $scope.user.permissions[i].isChecked = $scope.allPermissionsSelected;
      }
    };
    $scope.checkUser = function (id) {
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
