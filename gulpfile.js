var gulp = require('gulp');

var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');

gulp.task('sass', function () {
    gulp.src('scss/*.scss')
        .pipe(plumber())
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(prefix({
            browsers: ['last 6 versions', 'ie 9'],
            cascade: false,
            remove: false
        }))
        .pipe(plumber())
        .pipe(gulp.dest('css'));
});

gulp.task('watch', ['sass'], function () {
    gulp.watch('scss/**/*.scss', ['sass']);
});

gulp.task('default', ['sass'], function () {
});
