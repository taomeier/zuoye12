var gulp = require('gulp');
var sass = require('gulp-sass');
var minCss = require('gulp-clean-css');
var minJs = require('gulp-uglify');
var minHtml = require('gulp-htmlmin');
var autoprefixer = require('gulp-autoprefixer');
var server = require('gulp-webserver');
var sequence = require('gulp-sequence');
var clean = require('gulp-clean');
var querystring = require('querystring');
var mock = require('./mock');
var userInfo = [{
    user: 'xyk',
    pwd: '123456',
    isLogin: false
}];

gulp.task('minCss', function() {
    return gulp.src('src/scss/*.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ["last 2 versions", "Android >= 4.0"]
        }))
        .pipe(minCss())
        .pipe(gulp.dest('src/css'))
});
gulp.task('srcCss', function() {
    return gulp.src('src/scss/*.min.css')
        .pipe(gulp.dest('src/css'))
});
//打包
gulp.task('buildCss', function() {
    return gulp.src('src/scss/**/*.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ["last 2 versions", "Android >= 4.0"]
        }))
        .pipe(minCss())
        .pipe(gulp.dest('build/css'))
});
gulp.task('copyCss', function() {
    return gulp.src('src/scss/*.min.css')
        .pipe(gulp.dest('build/css'))
});
gulp.task('copyHtml', function() {
    return gulp.src('src/**/*.html')
        .pipe(gulp.dest('build'))
});
gulp.task('minJs', function() {
    return gulp.src('src/js/{common,app}/*.js')
        .pipe(minJs())
        .pipe(gulp.dest('build/js'))
});
gulp.task('copyJs', function() {
    return gulp.src(['src/js/**/*.js', '!src/js/{common,app}/*.js'])
        .pipe(gulp.dest('build/js'))
});
gulp.task('copyImgs', function() {
    return gulp.src('src/imgs/*.{jpg,png}')
        .pipe(gulp.dest('build/imgs'))
});
gulp.task('server', function() {
    gulp.src('build')
        .pipe(server({
            port: 8080,
            middleware: function(req, res, next) {
                if (req.url === '/login') {
                    var arr = [];
                    req.on('data', function(chunk) {
                        arr.push(chunk)
                    });
                    req.on('end', function() {
                        var params = querystring.parse(Buffer.concat(arr).toString());
                        var mask = false;
                        userInfo.forEach(function(item, index) {
                            if (item.user === params.user && item.pwd === params.pwd) {
                                mask = true;
                                item.isLogin = true;
                                res.end(JSON.stringify({ code: 0, msg: '登录成功' }));
                            }
                        });
                        if (!mask) {
                            res.end(JSON.stringify({ code: 1, msg: '用户名或密码错误，请重新输入！' }));
                        }
                        next()
                    });
                    return false;
                } else if (req.url === '/isLogin') {
                    var arr = [];
                    req.on('data', function(chunk) {
                        arr.push(chunk)
                    });
                    req.on('end', function() {
                        var params = querystring.parse(Buffer.concat(arr).toString());
                        var mask = false;
                        userInfo.forEach(function(item, index) {
                            if (item.user === params.user) {
                                mask = true;
                                res.end(JSON.stringify({ code: 0, result: item.isLogin }));
                            }
                        });
                        if (!mask) {
                            res.end(JSON.stringify({ code: 2, msg: '未登录' }));
                        }
                        next()
                    });
                    return false;
                }
                if (/\/api/g.test(req.url)) {
                    var data = mock(decodeURI(req.url));
                    res.end(JSON.stringify(data))
                }
                next();
            }
        }))
});
gulp.task('watch', function() {
    gulp.watch('src/scss/*.scss', ['minCss']);
    gulp.watch('src/js/{common,app}/*.js', ['minJs']);
    gulp.watch('src/**/*.html', ['copyHtml']);
});
gulp.task('default', function(cb) {
    sequence('minCss', 'srcCss', 'buildCss', 'copyCss', 'copyHtml', 'minJs', 'copyJs', 'copyImgs', 'server', 'watch', cb)
});