angular.module('mnd.dashboard', [
  'ui.bootstrap',
  'mnd.multi-transclude'
]).factory('MndSidebarService', function () {
  var sidebarOpen = false;
  return {
    getSidebarStatus: function () {
      return sidebarOpen;
    },
    toggleSidebarStatus: function () {
      sidebarOpen = !sidebarOpen;
    }
  };
}).directive('mndSidebar', [
  'MndSidebarService',
  function (MndSidebarService) {
    return {
      restrict: 'EA',
      templateUrl: 'template/sidebar.html',
      replace: true,
      transclude: true,
      scope: { menu: '=' },
      link: function ($scope) {
        $scope.isSubmenu = function (item) {
          return item.type === 'submenu';
        };
        $scope.toggleSubmenu = function (item) {
          if (item.type === 'submenu') {
            item.open = !item.open;
          }
        };
        $scope.sidebarOpen = MndSidebarService.getSidebarStatus();
        $scope.$on('sidebarStatusChanged', function () {
          $scope.sidebarOpen = MndSidebarService.getSidebarStatus();
        });
      }
    };
  }
]).directive('mndToggleSidebar', [
  'MndSidebarService',
  function (MndSidebarService) {
    return {
      restrict: 'EA',
      templateUrl: 'template/toggle-sidebar.html',
      replace: true,
      transclude: true,
      scope: {},
      link: function ($scope) {
        $scope.sidebarOpen = MndSidebarService.getSidebarStatus();
        $scope.toggle = function () {
          MndSidebarService.toggleSidebarStatus();
          $scope.$parent.$broadcast('sidebarStatusChanged');
        };
        $scope.$on('sidebarStatusChanged', function () {
          $scope.sidebarOpen = MndSidebarService.getSidebarStatus();
        });
      }
    };
  }
]).directive('mndContent', [
  'MndSidebarService',
  function (MndSidebarService) {
    return {
      restrict: 'EA',
      templateUrl: 'template/content.html',
      replace: true,
      transclude: true,
      scope: {},
      link: function ($scope) {
        $scope.sidebarOpen = MndSidebarService.getSidebarStatus();
        $scope.$on('sidebarStatusChanged', function () {
          $scope.sidebarOpen = MndSidebarService.getSidebarStatus();
        });
      }
    };
  }
]);
(function(module) {
try {
  module = angular.module('mnd.dashboard');
} catch (e) {
  module = angular.module('mnd.dashboard', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('template/content.html',
    '<div id="mnd-content" ng-class="{\'sidebar-open\': sidebarOpen}" ng-transclude></div>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('mnd.dashboard');
} catch (e) {
  module = angular.module('mnd.dashboard', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('template/sidebar.html',
    '<div id="mnd-sidebar" ng-class="{\'sidebar-open\': sidebarOpen}">\n' +
    '	<div mnd-multi-transclude="before"></div>\n' +
    '	<ul class="nav">\n' +
    '		<li ng-repeat="item in menu.items" ng-click="toggleSubmenu(item)" class="mnd-clickable">\n' +
    '			<a ng-href="{{item.href}}">\n' +
    '				<span class="mnd-width-20" ng-if="item.icon">\n' +
    '					<i class="fa {{item.icon}}"></i>\n' +
    '				</span>\n' +
    '				{{item.title}}\n' +
    '				<span ng-if="isSubmenu(item)" class="pull-right">\n' +
    '					<i ng-if="!item.open"class="fa fa-angle-left"></i>\n' +
    '					<i ng-if="item.open"class="fa fa-angle-down"></i>\n' +
    '				</span>\n' +
    '			</a>\n' +
    '			<ul ng-if="isSubmenu(item)" collapse="!item.open" class="nav nav-second-level">\n' +
    '				<li ng-repeat="subitem in item.items">\n' +
    '					<a ng-href="{{subitem.href}}">\n' +
    '						<span class="mnd-width-20"></span>\n' +
    '						<span class="mnd-width-20" ng-if="subitem.icon">\n' +
    '							<i class="fa {{subitem.icon}}"></i>\n' +
    '						</span>\n' +
    '						{{subitem.title}}\n' +
    '					</a>\n' +
    '				</li>\n' +
    '			</ul>\n' +
    '		</li>\n' +
    '	</ul>\n' +
    '	<div mnd-multi-transclude="after"></div>\n' +
    '</div>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('mnd.dashboard');
} catch (e) {
  module = angular.module('mnd.dashboard', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('template/toggle-sidebar.html',
    '<div id="mnd-toggle-sidebar" ng-class="{\'sidebar-open\': sidebarOpen}">\n' +
    '	<div id="mnd-show-sidebar" ng-click="toggle()">\n' +
    '		<i class="fa fa-bars" ng-show="!sidebarOpen"></i>\n' +
    '		<i class="fa fa-times" ng-show="sidebarOpen"></i>\n' +
    '	</div>\n' +
    '	<div mnd-multi-transclude="center"></div>\n' +
    '</div>\n' +
    '');
}]);
})();
