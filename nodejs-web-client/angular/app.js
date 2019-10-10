angular
  .module("ngregisgen", [
    "ngRoute",
    "ngMessages",
    "ui.bootstrap",
    "table-scroll",
    "ngFileUpload",
    "ngregisgen.app-services",
    "ngregisgen.departments-services",
    "ngregisgen.logout-services",
    "ngregisgen.menu-services",
    "ngregisgen.permission-services",
    "ngregisgen.registry-services",
    "ngregisgen.thirdparties-services",
    "ngregisgen.user-services",
    "ngregisgen.departments-controllers",
    "ngregisgen.menu-controllers",
    "ngregisgen.permission-controllers",
    "ngregisgen.registry-controllers",
    "ngregisgen.thirdparties-controllers",
    "ngregisgen.tree-controllers",
    "ngregisgen.user-controllers"
  ])
  .config([
    "$routeProvider",
    function($routeProvider) {
      $routeProvider.when("/logout", {
        resolve: { controller: "LogoutFactory" }
      });
      $routeProvider.when("/tree", {
        templateUrl: "v/layouts/navbars/tree",
        controller: "TreeCtrl"
      });
      $routeProvider.when("/config/menus", {
        templateUrl: "v/config/menus",
        controller: "MenuListCtrl"
      });
      $routeProvider.when("/config/permissions", {
        templateUrl: "v/config/permissions",
        controller: "PermissionListCtrl"
      });
      $routeProvider.when("/config/users", {
        templateUrl: "v/config/users",
        controller: "UserListCtrl"
      });
      $routeProvider.when("/registry/departments", {
        templateUrl: "v/departments/departments",
        controller: "DepartmentListCtrl"
      });
      $routeProvider.when("/registry/thirdparties", {
        templateUrl: "v/thirdparties/thirdparties",
        controller: "ThirdpartyListCtrl"
      });
      $routeProvider.when("/registry", {
        templateUrl: "v/registry/registry",
        controller: "RegistryListCtrl"
      });
      //  $routeProvider.otherwise({redirectTo: "/config/users"});
    }
  ])
  .directive("confirmPwd", function($interpolate, $parse) {
    return {
      require: "ngModel",
      link: function(scope, elem, attr, ngModelCtrl) {
        var pwdToMatch = $parse(attr.confirmPwd);
        var pwdFn = $interpolate(attr.confirmPwd)(scope);
        scope.$watch(pwdFn, function(newVal) {
          ngModelCtrl.$setValidity(
            "password",
            ngModelCtrl.$viewValue == newVal
          );
        });
        ngModelCtrl.$validators.password = function(modelValue, viewValue) {
          var value = modelValue || viewValue;
          return value == pwdToMatch(scope);
        };
      }
    };
  })
  .directive("printDiv", function() {
    return {
      restrict: "A",
      link: function(scope, element, attrs) {
        element.bind("click", function(evt) {
          evt.preventDefault();
          if (!attrs.disabled) {
            PrintElem(attrs.printDiv, attrs.printDivType, attrs.printDivTitle);
          }
        });
        function PrintElem(elem, type, title) {
          $(elem).printThis({
            loadCSS: "/themes/default/css/print.css",
            head: type == "list" ? true : false,
            headerContent:
              "<div class='row'>" +
              "<div class='col-md-2'>" +
              "<img src='/themes/default/img/logo.jpg' style='width:75%;height:75%;'/>" +
              "</div>" +
              "<div class='col-md-8' style='margin:0;padding:0;'>" +
              "<h4>Registro General</h4>" +
              "<h5>" +
              (title ? title : "") +
              "</h5>" +
              "</div>" +
              "</div>"
          });
        }
      }
    };
  })
  .filter("startFrom", function() {
    return function(input, start) {
      if (input) {
        start = +start;
        return input.slice(start);
      }
      return [];
    };
  });
