const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename = require("gulp-rename");
const htmlmin = require('gulp-htmlmin');
const minify = require('gulp-minify');
const babel = require('gulp-babel');


gulp.task('server', function () {

    browserSync({
        server: {
            baseDir: "dist"
        }
    });

    gulp.watch("dist/*.html").on('change', browserSync.reload);
});

gulp.task('watch', function () {
    gulp.watch("src/sass/**/*.+(scss|sass|css)", gulp.parallel('styles'));
    gulp.watch("src/*.html").on('change', gulp.parallel('minifyHtml'));

});

gulp.task('styles', function () {
    return gulp.src("./src/sass/**/*.+(scss|sass)")
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(rename({ suffix: '.min', prefix: '' }))
        .pipe(autoprefixer())
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.stream());
});

gulp.task('minifyHtml', () => {
    return gulp.src('src/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('dist/'));
});

gulp.task('compress', function () {
    return gulp.src('src/js/app.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(minify())
        .pipe(gulp.dest('dist/js/'))
});

gulp.task('files-js', function () {
    return gulp.src('src/js/*.min.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(gulp.dest('dist/js'))
});

gulp.task('img', function () {
    return gulp.src('src/img/*')
        .pipe(gulp.dest('dist/img/'))
});

gulp.task('img-form', function () {
    return gulp.src('src/img/form/*')
        .pipe(gulp.dest('dist/img/form/'))
});

gulp.task('img-header', function () {
    return gulp.src('src/img/header/*')
        .pipe(gulp.dest('dist/img/header/'))
});

gulp.task('img-main', function () {
    return gulp.src('src/img/main/*')
        .pipe(gulp.dest('dist/img/main/'))
});

gulp.task('img-parallax', function () {
    return gulp.src('src/img/parallax/*')
        .pipe(gulp.dest('dist/img/parallax/'))
});

gulp.task('video', function () {
    return gulp.src('src/video/*')
        .pipe(gulp.dest('dist/video/'))
});

gulp.task('default', gulp.parallel('watch', 'server', 'styles', 'minifyHtml', 'files-js', 'compress', 'img', 'img-form', 'img-header', 'img-main', 'img-parallax', 'video'));