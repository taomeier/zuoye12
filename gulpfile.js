var gulp = require('gulp');
var less = require('gulp-less');
var squence = require('gulp-sequence');
var server = require('gulp-webserver');
var mock = require('./src/data/mock.js');
var user = {
    name: "zs",
    pwd: 1234
};
var url = require('url');
gulp.task('testless', function() {
    gulp.src('./src/css/*.less')
        .pipe(less())
        .pipe(gulp.dest("src/css"))
});
gulp.task('change', function() {
    gulp.watch("./src/css/*.less", ["testless"])
});
gulp.task('server', function() {
    gulp.src('src')
        .pipe(server({
            port: 8008,
            host: "localhost",
            // livereload: true,
            // open: true,
            middleware: function(req, res, next) {
                var uname = url.parse(req.url, true);
                if (req.url === "/loginuser") {
                    var arr = [];
                    req.on('data', function(chunk) {
                        arr.push(chunk);
                    });
                    req.on('end', function() {
                        var data = Buffer.concat(arr).toString();
                        var obj = require('querystring').parse(data);
                        res.writeHead(200, { 'Content-Type': 'text/javascript;charset=UTF-8' });
                        console.log(obj);
                        if (obj.user === user.name && obj.pwd == user.pwd) {
                            res.end('{"result":"success"}');
                        } else {
                            res.end('{"result":"error"}');
                        }
                        next();
                    });
                    return false;
                };
                if (/\/book/g.test(uname.pathname)) {
                    res.end(JSON.stringify(mock(req.url)));
                };
                next();
            }
        }))
});
gulp.task('default', function(cd) {
    squence("change", "server", cd)
})