define([
    'jquery',
    'swiper',
    'text!banner/banner.html',
    'text!banner/hot.html',
    'text!banner/zhong.html',
    'text!banner/mian.html',
    'text!banner/love.html',
    'text!banner/zhuan.html',
    'temp',
    'lazyload'
], function($, Swiper, text, hot, zhong, mian, love, zhuan, temp, lazyload) {
    var $liBtn = $('.header ul').find('li');
    //向左向右划
    var swiper = new Swiper('.scroll', {
        on: {
            slideChange: function() {
                $liBtn.eq(this.activeIndex).addClass('active').siblings().removeClass('active');
            }
        }
    })

    //切换
    $liBtn.on('click', function() {
        var ind = $(this).index();
        $(this).addClass('active').siblings().removeClass('active');
        swiper.slideTo(ind, 250, false);
    })


    //渲染书城
    $.ajax({
        url: '/api/city',
        dataType: 'json',
        success: jsonList
    })

    //渲染书架
    $.ajax({
        url: '/api/jia',
        dataType: 'json',
        success: jsonJia
    })


    function jsonList(data) {
        console.log(data);
        //轮播
        temp(text, data.items[0].data, '.swiper-scroll');
        var banner = new Swiper('.banner', {
            autoplay: {
                delay: 1500
            },
            loop: true
        })

        //本周最火
        temp(hot, data.items[1], '.newWeek');

        //限时免费
        data.items[5].data.data.map(function(v) {
            v.cover = v.data.cover;
            v.title = v.data.title;
        })
        temp(mian, data.items[5].data.data, '.xianM');

        //重磅推荐
        var index = 1;
        temp(zhong, change(index, data.items[2].data.data), '.tui-jian');

        //女生最爱
        temp(love, change(index, data.items[3].data.data), '.gilr-say');

        // 男生最爱
        temp(love, change(index, data.items[4].data.data), '.boy-say');

        $('.book-city').on('click', '.change-btn', function() {
            var index = $(this).data('id') * 1;
            var ind = $(this).attr('data');
            var obj = data.items[ind];
            index++;
            index = index % (obj.data.count / 5);
            var str = ind == 2 ? zhong : love;
            $(this).data('id', index);
            temp(str, change(index, obj.data.data), '.' + $(this).parents('.huan').prev().attr('class'));
        })

        //精选专题
        temp(zhuan, data.items[6].data.data, '.zhuan-ti');

        //上拉加载
        loadMore('.book-city');

        //图片懒加载
        $('img.lazy').lazyload({
            effect: "fadeIn",
            container: $('.book-city')
        })
    }

    //书架
    function jsonJia(data) {
        console.log(data)
        temp(love, data.items, '.shuJia-content');
        $('img.lazy').lazyload({
            effect: "fadeIn",
            container: $('.book-jia')
        })
        $('.bookPlay-icon').on('click', function() {
            $(this).children().toggleClass('icon-shouqi-01');
            if ($(this).children().hasClass('icon-shouqi-01')) {
                temp(mian, data.items, '.shuJia-content');
            } else {
                temp(love, data.items, '.shuJia-content');
            }
            $('img.lazy').lazyload({
                effect: "fadeIn",
                container: $('.book-jia')
            })
        })
    }

    //截取数组前5项
    function change(ind, arr) {
        var limit = 5;
        var start = ind * limit;
        var end = ind * limit + limit;
        var newarr = arr.slice(start, end);
        newarr.map(function(v, i) {
            v.count = i + 1;
        })
        return newarr;
    }


    //页码
    var pagenum = 0;

    function loadMore(parent) {
        $(parent).on('scroll', function() {
            //可视区域的高度
            var clientHeight = $(this).height();
            //最高滚动距离
            var scrollMax = $(this).children().height() - clientHeight;
            if ($(this).scrollTop() + 30 >= scrollMax) {
                $(this).off('scroll');
                pagenum++;
                render(pagenum);
            }
        })
    }

    //上拉加载
    function render(n) {
        $.ajax({
            url: "/api/loadMore",
            data: {
                pagenum: n,
                limit: 10
            },
            dataType: 'json',
            success: function(data) {
                if (pagenum >= 3) {
                    $('.loading').html('暂无更多')
                } else {
                    temp(love, data.items, '.content-list', 1);
                    loadMore('.book-city');
                    $('img.lazy').lazyload({
                        effect: "fadeIn",
                        container: $('.book-city')
                    })
                }
            }
        })
    }
});