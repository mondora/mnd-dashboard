var gulp	= require("gulp");
var plugins	= require("gulp-load-plugins")();

gulp.task("styles", function () {
	gulp.src("styles/dashboard.scss")
		.pipe(plugins.sass())
		.pipe(plugins.autoprefixer("last 2 version"))
		.pipe(plugins.rename("dashboard.css"))
		.pipe(gulp.dest("dist/"))
		.pipe(plugins.minifyCss())
		.pipe(plugins.rename("dashboard.min.css"))
		.pipe(gulp.dest("dist/"));
});

gulp.task("scripts", function () {
	gulp.src("src/**/*.js")
		.pipe(plugins.ngmin())
		.pipe(plugins.concat("dashboard.js"))
		.pipe(gulp.dest("dist/"));
});

gulp.task("templates", function () {
	gulp.src("templates/**/*.html")
		.pipe(plugins.ngHtml2js({
			moduleName: "mnd.dashboard",
			prefix: "template/"
		}))
		.pipe(plugins.concat("dashboard.template-cache.js"))
		.pipe(gulp.dest("dist/"));
});

gulp.task("final", function () {
	gulp.src(["dist/dashboard.js", "dist/dashboard.template-cache.js"])
		.pipe(plugins.concat("dashboard-tpls.js"))
		.pipe(gulp.dest("dist/"))
		.pipe(plugins.uglify())
		.pipe(plugins.rename("dashboard-tpls.min.js"))
		.pipe(gulp.dest("dist/"));
});

gulp.task("default", function () {
	gulp.watch("styles/dashboard.scss", ["styles"]);
	gulp.watch("src/**/*.js", ["scripts"]);
	gulp.watch("templates/**/*.html", ["templates"]);
	gulp.watch(["dist/dashboard.template-cache.js", "dist/dashboard.js"], ["final"]);
});
