const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();
const clean = require('gulp-clean');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const cleanCSS = require('gulp-clean-css');
const jsmin = require('gulp-js-minify');
const concat = require('gulp-concat');
const imagemin = require('gulp-imagemin');


function css() {
    return gulp.src('./src/scss/styles.scss')
        .pipe(sourcemaps.init())
        .pipe(concat('styles.min.css'))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 2 versions'],
            cascade: false
        }))
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS())
        .pipe(sourcemaps.write())     
        .pipe(gulp.dest('./dist/css'));
        
}

function js() { 
    return gulp.src('./src/js/*.js')
        .pipe(sourcemaps.init())
        .pipe(concat('scripts.min.js'))
        .pipe(jsmin())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist/js'));
}

function img() {
    return gulp.src('./src/img/*')
		.pipe(imagemin())
		.pipe(gulp.dest('./dist/img'))
}

function clearDest() {
    return gulp.src('./dist', {allowEmpty: true}).pipe(clean())
}

function watch() {
    browserSync.init({
        server: "./"
    })
    gulp.watch('./src/**/*.*', gulp.series(css, js)).on('change', browserSync.reload)
    gulp.watch('*.html').on('change', browserSync.reload)
}


exports.build = gulp.series(clearDest, css, js, img)
exports.dev = watch

