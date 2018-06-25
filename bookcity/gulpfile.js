var gulp = require('gulp');
var sass = require('gulp-sass');
var server = require('gulp-webserver');
var sequence = require('gulp-sequence').use(gulp);
var url = require('url');
var fs = require('fs');
var path = require('path');

var mock = require('./mock/');


gulp.task('css', function () {
    return gulp.src(['src/scss/*.scss','!src/scss/common.scss'])
        .pipe(sass())
        .pipe(gulp.dest('src/css'));
});

gulp.task('watch', function () {
    gulp.watch('src/scss/*.scss', ['css']);
});

gulp.task('server', function () {
    gulp.src('src')
        .pipe(server({
            port: 8000,
            // open: true,
            livereload: true,
            middleware: function (req, res, next) {
                if (req.url === '/favicon.ico') {
                    return false;
                }
                var pathname = url.parse(req.url).pathname;
                pathname = pathname === '/' ? '/index.html' : pathname;
                if (/\/api\//.test(req.url)) {
                    res.end(JSON.stringify(mock(req.url)));
                } else {
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)));
                }
            }
        }));
});

gulp.task('default', function (cb) {
    sequence(['css'], 'watch', 'server', cb); 
});