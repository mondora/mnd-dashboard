angular.module("dashboardDemo", ["mnd.dashboard"])

.controller("MainController", function ($scope) {
	$scope.menu = {
		items: [
			{
				title: "home",
				href: "http://www.mondora.com"
			},
			{
				title: "cloud",
				href: "http://www.mondora.com"
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
						href: "http://reddit.com"
					},
					{
						title: "AaS",
						href: "http://xkcd.com"
					}
				]
			}
		]
	};
});
