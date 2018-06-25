var gulp = require('gulp');
var sass = require('gulp-sass');
var server = require('gulp-webserver');
var fs = require('fs');
var path = require('path');
var url = require('url');
var mockJson = require('./mock/index')
gulp.task('server', function() {
    gulp.src('src')
        .pipe(server({
            port: 6060,
            host: 'localhost',
            open: true,
            middleware: function(req, res, next) {
                if (req.url === '/favicon.ico') {
                    return;
                }
                var pathname = url.parse(req.url, true).pathname;
                pathname = pathname === '/' ? 'index.html' : pathname;
                if (/\/api\//.test(pathname)) {
                    res.end(JSON.stringify(mockJson(req.url)));
                } else {
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)))
                }
            }
        }))
})
gulp.task('sass', function() {
    gulp.src('src/scss/*.{sass,scss}')
        .pipe(sass())
        .pipe(gulp.dest('src/css'))
});
gulp.task('change', function() {
    gulp.watch('src/scss/*.{sass,scss}', ['sass']);
})

gulp.task('default', ['change', 'server', 'sass']);