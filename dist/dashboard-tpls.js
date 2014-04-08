angular.module('mnd.dashboard', ['mnd.multi-transclude']).directive('mndSidebar', function () {
  return {
    restrict: 'EA',
    templateUrl: 'template/sidebar.html',
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
    }
  };
}).directive('mndToggleSidebar', function () {
  return {
    restrict: 'EA',
    templateUrl: 'template/toggle-sidebar.html',
    scope: {},
    link: function ($scope) {
      $scope.toggle = function () {
        var sidebar = angular.element(document.getElementById('mnd-sidebar'));
        var toggle = angular.element(document.getElementById('mnd-toggle-sidebar'));
        var content = angular.element(document.getElementById('mnd-content'));
        if (sidebar.hasClass('show-sidebar')) {
          sidebar.removeClass('show-sidebar');
          toggle.removeClass('show-sidebar');
          content.removeClass('show-sidebar');
        } else {
          sidebar.addClass('show-sidebar');
          toggle.addClass('show-sidebar');
          content.addClass('show-sidebar');
        }
      };
    }
  };
}).directive('mndContent', function () {
  return {
    restrict: 'EA',
    templateUrl: 'template/content.html',
    transclude: true
  };
});
(function(module) {
try {
  module = angular.module('mnd.dashboard');
} catch (e) {
  module = angular.module('mnd.dashboard', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('template/content.html',
    '<div id="mnd-content" ng-transclude></div>\n' +
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
    '<div id="mnd-sidebar">\n' +
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
    '<div id="mnd-toggle-sidebar">\n' +
    '	<div id="mnd-show-sidebar" class="btn btn-sm btn-default" type="button" ng-click="toggle()">\n' +
    '		<i class="fa fa-bars"></i>\n' +
    '	</div>\n' +
    '	<div id="mnd-sidebar-logo"></div>\n' +
    '</div>');
}]);
})();
