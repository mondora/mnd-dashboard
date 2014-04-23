angular.module("dashboardDemo", ["mnd.dashboard"])

.controller("MainController", function ($scope) {
	console.log("Main");
	$scope.m = "M";
	console.log($scope);
})

.controller("SidebarController", function ($scope) {
	$scope.fun = function () {
		console.log("Fun!");
	};
	$scope.menu = {
		items: [
			{
				title: "home",
				ngClick: "fun"
			},
			{
				title: "cloud",
			},
			{
				title: "governance",
				href: "http://www.mondora.com"
			},
			{
				title: "team",
				href: "http://www.mondora.com"
			},
			{
				title: "formazione",
				href: "http://www.mondora.com"
			},
			{
				title: "community",
				href: "http://www.mondora.com"
			},
			{
				title: "my mondora",
				type: "submenu",
				items: [
					{
						title: "pomodoro",
						href: "http://www.mondora.com"
					},
					{
						title: "AaS",
						href: "http://www.mondora.com"
					}
				]
			}
		]
	};
})

.controller("ToggleSidebarController", function ($scope) {
})

.controller("ContentController1", function ($scope) {
	console.log("C1");
	$scope.m = "C1";
	console.log($scope);
})
.controller("ContentController2", function ($scope) {
	console.log("C2");
	$scope.m = "C2";
	console.log($scope);
});
