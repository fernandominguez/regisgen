/* ntable-scroll - v1.0.0 - 2016-09-03 */
var mod;

mod = angular.module("table-scroll", []);

mod.directive("tableScroll", [
  "$rootScope", "$timeout", function($rootScope, $timeout) {
    return {
      link: function(scope, elem, attrs) {
        var checkWhenEnabled, handler, numItems, scrollEnabled;
        $container = angular.element(".table-scroll");
        if (attrs.tableScrollNumItems != null) {
          scope.$watch(attrs.tableScrollNumItems, function(value) {
            $container.css({
              "display": "block",
              "height": ((value-1)*62)+"px",
              "margin-top": "2em",
              "overflow-y": "scroll"
            });
            return numItems = parseInt(value, 10);
          });
        }
        scrollEnabled = true;
        checkWhenEnabled = false;
        if (attrs.tableScrollDisabled != null) {
          scope.$watch(attrs.tableScrollDisabled, function(value) {
            scrollEnabled = !value;
            if (scrollEnabled && checkWhenEnabled) {
              checkWhenEnabled = false;
              return handler();
            }
          });
        }
        handler = function() {
          var elementBottom, remaining, shouldScroll, containerBottom;
          shouldScroll = true;
          if (shouldScroll && scrollEnabled) {

            if ($rootScope.$$phase) {
              return scope.$eval(attrs.tableScroll);
            } else {
              return scope.$apply(attrs.tableScroll);
            }
          } else if (shouldScroll) {
            return checkWhenEnabled = true;
          }
        };
        $container.on("scroll", handler);
        scope.$on("$destroy", function() {
          return $container.off("scroll", handler);
        });
        return $timeout((function() {
          if (attrs.tableScrollImmediateCheck) {
            if (scope.$eval(attrs.tableScrollImmediateCheck)) {
              return handler();
            }
          } else {
            return handler();
          }
        }), 0);
      }
    };
  }
]);
