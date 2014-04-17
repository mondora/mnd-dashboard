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