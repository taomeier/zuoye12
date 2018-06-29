var gulp = require('gulp');
var sass = require('gulp-sass');
var server = require('gulp-webserver');
var sequence = require('gulp-sequence').use(gulp);
var url = require('url');
var fs = require('fs');
var path = require('path');
var querystring = require('querystring');

var mock = require('./mock/');
var logPath = path.join(__dirname, 'mock/login/login.json');

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
                } else if (req.url === '/log/login' || req.url === '/log/register') {
                    var arr = [];
                    req.on('data', function (chunk) {
                        arr.push(chunk);
                    });
                    req.on('end', function () {
                        var data = querystring.parse(Buffer.concat(arr).toString());
                        
                        var oldObj = JSON.parse(fs.readFileSync(logPath).toString());
                        if (req.url === '/log/login') {
                            var flag = oldObj.library.some(function (v, i) {
                                return v.user === data.user && v.pass === data.pass
                            });
                            if (flag) {
                                res.end(JSON.stringify({ c: 1, mes: '登录成功' }));
                            } else {
                                res.end(JSON.stringify({ c: 0, mes: '账户密码有误' }));
                            } 
                        } else if (req.url === '/log/register') {
                            oldObj.library.forEach(function (v, i) {
                                var flag = oldObj.library.some(function (v, i) {
                                    return v.user === data.user;
                                });
                                if (flag) {
                                    res.end(JSON.stringify({ c: 0, mes: '该用户已存在' }));
                                } else {
                                    oldObj.library.push(data)
                                    fs.writeFileSync(logPath, JSON.stringify(oldObj));
                                    res.end(JSON.stringify({ c: 1, mes: '注册成功' }));
                                } 
                            });
                       }
                        res.end(JSON.stringify({ c: 1 }));
                        next();
                    });
                    return false;
                } else {
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)));
                }
            }
        }));
});

gulp.task('default', function (cb) {
    sequence(['css'], 'watch', 'server', cb); 
});