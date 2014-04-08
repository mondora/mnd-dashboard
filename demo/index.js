angular.module("dashboardDemo", ["mnd.dashboard"])

.controller("MainController", function ($scope) {
	$scope.menu = {
		items: [
			{
				title: "Social networks",
				icon: "fa-users",
				type: "submenu",
				items: [
					{
						title: "Google Plus",
						href: "https://plus.google.com",
						icon: "fa-google-plus"
					},
					{
						title: "Facebook",
						href: "https://facebook.com",
						icon: "fa-facebook"
					},
					{
						title: "Twitter",
						href: "https://twitter.com",
						icon: "fa-twitter"
					}
				]
			},
			{
				title: "Time wasting sites",
				icon: "fa-clock-o",
				type: "submenu",
				items: [
					{
						title: "Reddit",
						href: "http://reddit.com"
					},
					{
						title: "xkcd",
						href: "http://xkcd.com"
					}
				]
			},
			{
				title: "Website",
				href: "http://mondora.com",
				icon: "fa-globe"
			}
		]
	};
});
