const gulp = require("gulp");
const concat = require("gulp-concat");
const autoprefixer = require("gulp-autoprefixer");
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const del = require('del');
const browserSync = require('browser-sync').create();
const babel = require('gulp-babel');


const cssFiles = [
    "./node_modules/normalize.css/normalize.css",
    "./src/css/some.css",
    "./src/css/other.css",
];

const jsFiles = [
    "./node_modules/moment/moment.js",
    "./node_modules/jquery/dist/jquery.min.js",
    "./src/js/lib.js",
    "./src/js/some.js"
];


function styles() {
    return gulp.src(cssFiles)
                .pipe(concat("all.css"))
                .pipe(autoprefixer({
                    browsers: ['> 0.1%'],
                    cascade: false
                }))
                .pipe(cleanCSS({
                    level: 2
                }))
                .pipe(gulp.dest("./dist/css"))
                // .pipe(browserSync.stream());
}

function scripts() {
    return gulp.src(jsFiles)
                .pipe(babel())
                .pipe(concat("all.js"))
                .pipe(uglify({
                    toplevel: true
                }))
                .pipe(gulp.dest("./dist/js"))
                // .pipe(browserSync.stream());
}


function clean() {
    return del(["dist/*"])
}

function watch() {
    // browserSync.init({
    //     server: {
    //         baseDir: "./"
    //     }
    // });
    gulp.watch('./src/css/**/*.css', styles);
    gulp.watch('./src/js/**/*.js', scripts);
    // gulp.watch('./*.html', browserSync.reload);
}

gulp.task('styles', styles);
gulp.task('scripts', scripts);

gulp.task('build', gulp.series(
    clean,
    gulp.parallel('styles', 'scripts')
));

gulp.task('watch', watch);

gulp.task('dev', gulp.series('build', 'watch'));



