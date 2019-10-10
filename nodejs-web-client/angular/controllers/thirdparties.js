var app = angular.module("ngregisgen.thirdparties-controllers", []);

app.controller("ThirdpartyListCtrl", ["$rootScope", "$scope", "ThirdpartiesFactory", "ThirdpartyFactory", "$location", "$window", "$timeout",
  function ($rootScope, $scope, ThirdpartiesFactory, ThirdpartyFactory, $location, $window, $timeout) {
    $scope.menuCrude = $rootScope.menuCrude;
    $scope.thirdparties = ThirdpartiesFactory.query({},
      function(res, headers) {
        $scope.allIdsSelected = false;
        $scope.anyIdsSelected = false;
        $scope.currentPage = 1;
        $scope.entryLimit = 10;
        $scope.filteredItems = $scope.thirdparties.length;
        $scope.totalItems = $scope.thirdparties.length;
        $("#selectPages").val($scope.entryLimit);
        $("#selectPages").selectpicker("render");
        $("#selectPages").selectpicker("show");
      }
    );
    $scope.newThirdparty = function () {
      alert("newThirdparty");
      $scope.thirdparty = {};
      $scope.isNew = true;
      $scope.isView = false;
      $scope.flashMessage = null;
      $scope.saving = null;
      $scope.thirdpartyForm.$setPristine();
    };
    $scope.viewThirdparty = function (thirdpartyId) {
      $scope.thirdpartyForm.$setPristine();
      $scope.thirdparty = ThirdpartyFactory.thirdparty.read({id: thirdpartyId});
      $scope.isNew = false;
      $scope.isView = true;
      $scope.flashMessage = null;
      $scope.saving = null;
    };
    $scope.editThirdparty = function (thirdpartyId) {
      $scope.thirdpartyForm.$setPristine();
      $scope.thirdparty = ThirdpartyFactory.thirdparty.read({id: thirdpartyId});
      $scope.isNew = false;
      $scope.isView = false;
      $scope.flashMessage = null;
      $scope.saving = null;
    };
    $scope.deleteThirdparty = function (thirdpartyId) {
      if (!thirdpartyId) {
        thirdpartyId = $scope.thirdparty.id;
      }
      if ($window.confirm("¿Estás seguro que deseas eliminar este tercero?")) {
        ThirdpartyFactory.thirdparty.delete({ id: thirdpartyId });
        $timeout(function() {
          $scope.thirdparties = RegistryFactory.query({},
            function(res, headers) {
              $scope.allIdsSelected = false;
              $scope.anyIdsSelected = false;
              $scope.filteredItems = $scope.thirdparties.length;
              $scope.totalItems = $scope.thirdparties.length;
              $("#selectPages").selectpicker("show");
            }
          );
        }, 500);
      }
    };
    $scope.deleteSelectedThirdparties = function () {
      if ($scope.anyIdsSelected) {
        if ($window.confirm("¿Estás seguro que deseas eliminar estos terceros?")) {
          var ids = ($scope.filtered.length > $scope.entryLimit ? $scope.entryLimit : $scope.filtered.length);
          for (var i=0; i<ids; i++) {
            if ($scope.filtered[i].isChecked) {
              ThirdpartyFactory.thirdparty.delete({ id: $scope.filtered[i].id });
            }
          }
          $timeout(function() {
            $scope.thirdparties = RegistryFactory.query({},
              function(res, headers) {
                $scope.allIdsSelected = false;
                $scope.anyIdsSelected = false;
                $scope.filteredItems = $scope.thirdparties.length;
                $scope.totalItems = $scope.thirdparties.length;
                $("#selectPages").selectpicker("show");
              }
            );
          }, 500);
        }
      }
    };
    $scope.addThirdparty = function (valid) {
      alert("addThirdparty");
      if (valid) {
        thirdpartyData = JSON.stringify($scope.thirdparty);
        alert(thirdpartyData);
        $scope.saving = "Guardando ..."
        ThirdpartyFactory.thirdparty.create( { data: thirdpartyData },
          function(res, headers) {
            $scope.saving = "¡¡ Tercero Creado !!";
            $timeout(function() {
              $("#thirdpartyModal").modal("hide");
              $scope.thirdparties = RegistryFactory.query({},
                function(res, headers) {
                  $scope.allIdsSelected = false;
                  $scope.anyIdsSelected = false;
                  $scope.filteredItems = $scope.thirdparties.length;
                  $scope.totalItems = $scope.thirdparties.length;
                  $("#selectPages").selectpicker("show");
                  $scope.saving = null;
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
    $scope.updateThirdparty = function (valid) {
      if (valid) {
        thirdpartyData = JSON.stringify($scope.thirdparty);
        $scope.saving = "Guardando ..."
        ThirdpartyFactory.thirdparty.update({ data: thirdpartyData },
          function(res, headers) {
            $scope.saving = "¡¡ Guardado !!";
            $timeout(function() {
              $("#thirdpartyModal").modal("hide");
              $scope.flashMessage = null;
              $scope.thirdparties = RegistryFactory.query({},
                function(res, headers) {
                  $scope.allIdsSelected = false;
                  $scope.anyIdsSelected = false;
                  $scope.filteredItems = $scope.thirdparties.length;
                  $scope.totalItems = $scope.thirdparties.length;
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
    $scope.checkThirdparty = function (id) {
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
