define([
    'jquery',
    'render',
    'swiper',
    'bscroll',
    'text!template/banner.html',
    'text!template/nav.html',
    'text!template/blockHot.html',
    'text!template/five.html',
    'text!template/blockTime.html',
    'text!template/sift.html',
    'text!template/up.html',
    'text!template/self.html'
], function ($, render, swiper, bscroll, banner, nav, blockHot, five, blockTime, sift, up, self) {
    //书城书架的tab切换
    var boxSwiper = new swiper('.bookCity', {
        hashNavigation: {
            watchState: true,
        }
    });
    $('.header-tab a').on('click', function () {
        var ind = $(this).index();
        var x = ind * 50 + 25 + '%';
        $('.header-line').css('left', x);
        $(this).addClass('header-show').siblings().removeClass('header-show');
    });
    
    var bookCityS = new bscroll('.book-city', {//书城的scroll
        scrollY: true,
        probeType: 2
    });
    var bookSelfS = new bscroll('.book-self', {//书架的scroll
        scrollY: true
    });

    //书城渲染
    $.ajax({
        url: '/api/home',
        dataType: 'json',
        success: function (res) {
            // console.log(res);
            var bannerData = res.items[0].data.data.slice(0, 2);//轮播图
            render(banner, bannerData, '.book-city-scroll');

            var bannerSwiper = new swiper('.banner', {
                autoplay: true,
                loop: true
            });

            var navData = res.items[0].data.data.slice(2);//导航
            render(nav, navData, '.nav');

            var hotData = res.items[1];//本周最火
            render(blockHot, hotData, '.hot');

            var index = 0;
            var recData = change(index,res.items[2].data.data);//推荐
            render(five, recData, '.rec-inner');
            
            var girlData = change(index,res.items[3].data.data);//女生最爱
            render(five, girlData, '.girl-inner');

            var boyData = change(index,res.items[4].data.data);//男生最爱
            render(five, boyData, '.boy-inner');

            var timeData = res.items[5];//限时免费
            render(blockTime, timeData, '.time');

            var siftData = res.items[6];//精选专题
            render(sift, siftData, '.sift');
            
            $('.block-wrapper').on('touchstart', '.change-btn', function () {
                var ind = $(this).attr('data-index') * 1;
                var dataInd = $(this).attr('data') * 1;
                var obj = res.items[dataInd];
                ind++
                ind = ind % (obj.data.count / 5);
                $(this).attr('data-index', ind);
                var str = $(this).parent().prev().attr('class');
                render(five, change(ind, obj.data.data) ,'.'+str.slice(11))
            });
            bookCityS.refresh();
        },
        error: function (err) {
            console.warn(err);
        }
    });
    //书架渲染
    $.ajax({
        url: '/api/self',
        dataType: 'json',
        success: function (res) {
            render(self, res.items, '.self-inner');
        },
        error: function (err) {
            console.warn(err);
        }
    });

    function change(ind, arr) {//换一换
        var limit = 5;
        var startind = ind * limit;
        var endind = ind * limit + limit;
        var newArr = arr.slice(startind, endind);
        return newArr;
    }

    // 上拉刷新，下拉加载
    var pagenum = 0;
    scr();
    function scr() {
        bookCityS.on('scroll', function () {
            var y = this.y;
            var MaxY = this.maxScrollY;
            if (y < MaxY - 100) {
                $('.book-city-scroll').attr('data-down', '释放加载');
            } else if (y < MaxY - 50) {
                $('.book-city-scroll').attr('data-down', '下拉加载');
            } else if (y > 100) {
                $('.book-city-scroll').attr('data-up', '释放刷新');
            } else if (y>50) {
                $('.book-city-scroll').attr('data-up', '上拉刷新');
            }
        });

        bookCityS.on('scrollEnd', function () {
            $('.book-city-scroll').attr('data-down', '下拉加载');
            $('.book-city-scroll').attr('data-up', '上拉刷新');
        });

        $('.wraper').on('touchend', function () {
            var up = $('.book-city-scroll').attr('data-up');
            var down = $('.book-city-scroll').attr('data-down');
            if (up === '释放刷新') {
                location.reload();
            }
            if (down === '释放加载') {
                pagenum++;
                if (pagenum <= 3) {
                    loadData(pagenum);
                }
           }
        });
    }

    function loadData(num) {
        $.ajax({
            url: '/api/loadData?pagenum='+pagenum,
            dataType: 'json',
            success: function (res) {
                render(up, res.items, '.up-inner', 1);
                bookCityS.refresh();
            },
            error: function (err) {
                console.warn(err);
            }
        });
    }

    //书架变换
    $('.list-change').on('touchstart', function () {
        $(this).toggleClass('list-change-right');
        var flag = $(this).hasClass('list-change-right');
        if (flag) {
            $('.self-inner').addClass('block-list-change');
            $('.self-list-li').addClass('self-list-li-change');
            $('.self-list-p-authors').hide();
            $('.self-list-p-read').hide();
            $('.self-list-p-new').hide();
        } else {
            $('.self-inner').removeClass('block-list-change');
            $('.self-list-li').removeClass('self-list-li-change');
            $('.self-list-p-authors').show();
            $('.self-list-p-read').show();
            $('.self-list-p-new').show();
        }
    });

    //搜索
    $('main').on('touchstart', '.search', function () {
        $('.x-scroll').addClass('x-move');
        var time = null;
        var i = 0;
        time = setInterval(function () {
            i++;
            if (i === 1) {
                location.href = '../page/search.html';
                clearInterval(time);
            }
        }, 1000);
    });

    $('.wraper').on('touchstart', '.details', function () {
        var id = $(this).attr('id-fiction');
        $('.x-scroll').addClass('x-move');
        var time = null;
        var i = 0;
        time = setInterval(function () {
            i++;
            if (i === 1) {
                location.href = './page/details.html?id=' + id;
                clearInterval(time);
            }
        }, 1000);
    });
});