var app = angular.module("ngregisgen.departments-controllers", []);

app.controller("DepartmentListCtrl", ["$rootScope", "$scope", "DepartmentsFactory", "DepartmentFactory", "$location", "$window", "$timeout",
  function ($rootScope, $scope, DepartmentsFactory, DepartmentFactory, $location, $window, $timeout) {
    $scope.menuCrude = $rootScope.menuCrude;
    $scope.departments = DepartmentsFactory.query({},
      function(res, headers) {
        $scope.allIdsSelected = false;
        $scope.anyIdsSelected = false;
        $scope.currentPage = 1;
        $scope.entryLimit = 10;
        $scope.filteredItems = $scope.departments.length;
        $scope.totalItems = $scope.departments.length;
        $("#selectPages").val($scope.entryLimit);
        $("#selectPages").selectpicker("render");
        $("#selectPages").selectpicker("show");
      }
    );
    $scope.newDepartment = function () {
      $scope.department = {};
      $scope.isNew = true;
      $scope.isView = false;
      $scope.flashMessage = null;
      $scope.saving = null;
      $scope.departmentForm.$setPristine();
    };
    $scope.viewDepartment = function (departmentId) {
      $scope.departmentForm.$setPristine();
      $scope.department = DepartmentFactory.department.read({id: departmentId});
      $scope.isNew = false;
      $scope.isView = true;
      $scope.flashMessage = null;
      $scope.saving = null;
    };
    $scope.editDepartment = function (departmentId) {
      $scope.departmentForm.$setPristine();
      $scope.department = DepartmentFactory.department.read({id: departmentId});
      $scope.isNew = false;
      $scope.isView = false;
      $scope.flashMessage = null;
      $scope.saving = null;
    };
    $scope.deleteDepartment = function (departmentId) {
      if (!departmentId) {
        departmentId = $scope.department.id;
      }
      if ($window.confirm("¿Estás seguro que deseas eliminar este departamento?")) {
        DepartmentFactory.department.delete({ id: departmentId });
        $timeout(function() {
          $scope.departments = RegistryFactory.query({},
            function(res, headers) {
              $scope.allIdsSelected = false;
              $scope.anyIdsSelected = false;
              $scope.filteredItems = $scope.departments.length;
              $scope.totalItems = $scope.departments.length;
              $("#selectPages").selectpicker("show");
            }
          );
        }, 500);
      }
    };
    $scope.deleteSelectedDepartments = function () {
      if ($scope.anyIdsSelected) {
        if ($window.confirm("¿Estás seguro que deseas eliminar estos departamentos?")) {
          var ids = ($scope.filtered.length > $scope.entryLimit ? $scope.entryLimit : $scope.filtered.length);
          for (var i=0; i<ids; i++) {
            if ($scope.filtered[i].isChecked) {
              DepartmentFactory.department.delete({ id: $scope.filtered[i].id });
            }
          }
          $timeout(function() {
            $scope.departments = RegistryFactory.query({},
              function(res, headers) {
                $scope.allIdsSelected = false;
                $scope.anyIdsSelected = false;
                $scope.filteredItems = $scope.departments.length;
                $scope.totalItems = $scope.departments.length;
                $("#selectPages").selectpicker("show");
              }
            );
          }, 500);
        }
      }
    };
    $scope.addDepartment = function (valid) {
      if (valid) {
        departmentData = JSON.stringify($scope.department);
        $scope.saving = "Guardando ..."
        DepartmentFactory.department.create( { data: departmentData },
          function(res, headers) {
            $scope.saving = "¡¡ Departamento Creado !!";
            $timeout(function() {
              $("#departmentModal").modal("hide");
              $scope.departments = RegistryFactory.query({},
                function(res, headers) {
                  $scope.allIdsSelected = false;
                  $scope.anyIdsSelected = false;
                  $scope.filteredItems = $scope.departments.length;
                  $scope.totalItems = $scope.departments.length;
                  $("#selectPages").selectpicker("show");
                }
              );
            }, 500);
          },
          function(err) {
            $scope.saving = null;
            $scope.flashMessage = err.data.error.error;
          }
        );
      }
    };
    $scope.updateDepartment = function (valid) {
      if (valid) {
        departmentData = JSON.stringify($scope.department);
        $scope.saving = "Guardando ..."
        DepartmentFactory.department.update({ data: departmentData },
          function(res, headers) {
            $scope.saving = "¡¡ Guardado !!";
            $timeout(function() {
              $("#departmentModal").modal("hide");
              $scope.flashMessage = null;
              $scope.departments = RegistryFactory.query({},
                function(res, headers) {
                  $scope.allIdsSelected = false;
                  $scope.anyIdsSelected = false;
                  $scope.filteredItems = $scope.departments.length;
                  $scope.totalItems = $scope.departments.length;
                  $("#selectPages").selectpicker("show");
                }
              );
            }, 500);
          },
          function(err) {
            $scope.saving = null;
            $scope.flashMessage = err.data.error.error;
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
    $scope.checkDepartment = function (id) {
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
