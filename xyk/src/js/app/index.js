require(['jquery', 'swiper', 'bscroll', 'render', 'getSlideAngle', 'text!bookTb', 'text!bookLr', 'text!bookMore'], function($, swiper, bscroll, render, getSlideAngle, bookTb, bookLr, bookMore) {
    //初始化页面
    function initPage() {
        $('body').append(bookTb);
        $('body').append(bookLr);
        $.ajax({
            url: '/api/index',
            dataType: 'json',
            success: function(res) {
                //banner数据
                var bannerData = res.items[0].data;
                //本周最火数据
                var weeklistData = res.items[1].data.data;
                //重磅推荐数据
                var heavyData = res.items[2].data.data;
                //重磅推荐第一条数据
                var firstData = [heavyData[0]];
                //女生最爱
                var womanData = res.items[3].data.data;
                //男生最爱
                var manData = res.items[4].data.data;
                //限时免费
                var limitData = res.items[5].data.data;
                //精彩专题
                var splendidData = res.items[6].data.data;
                render(bannerData, $('#bannertpl'), $('.banner-wrap'));
                render(weeklistData, $('#t-b-tpl'), $('.week-table'));
                render(firstData, $('#l-r-tpl'), $('.book-ly'));
                render(heavyData.slice(1), $('#list-tap_tpl'), $('.book-ly'));
                render(womanData, $('#l-r-tpl'), $('.book-woman'));
                render(manData, $('#l-r-tpl'), $('.book-man'));
                render(limitData, $('#limit-tpl'), $('.limit-table'));
                render(splendidData, $('#splendid-tpl'), $('.banner-list'));
                render(womanData, $('#book-frame'), $('.book-frame'));
                bannerSwiper();
            },
            error: function(error) {
                console.warn(error)
            }
        });
    }
    initPage();
    //实例化banner轮播
    function bannerSwiper() {
        var bannerSwiper = new swiper('.banner', {
            autoplay: true,
            loop: true,
            pagination: {
                el: '.swiper-pagination',
            }
        });
    }
    //实例化页面轮播
    var wrapSwiper = new swiper('.wrap-swiper');
    $('.tab-item').on('click', function() {
        var index = $(this).index();
        wrapSwiper.slideTo(index);
        if (index == 1) {
            $('.line').addClass('move');
        } else {
            $('.line').removeClass('move');
        }
        $(this).addClass('active').siblings().removeClass('active');
    });
    var pageNum = 1,
        total,
        count = 10,
        upLoading = '上拉加载更多',
        downRefesh = '下拉可刷新',
        releaseLoad = '释放加载更多',
        releaseRefesh = '松开可刷新',
        noneData = '暂无数据';
    //页面滚动
    var pullScroll = new bscroll('.pull-scroll', {
        scrollY: true,
        probeType: 2,
        click: true
    });
    var _parent = $('.pull-scroll>div');
    var htmlFz = $('html').css('fontSize');
    var realSize = parseFloat(htmlFz) * 44 / 37.5;
    pullScroll.on("scroll", function() {
        if (this.y < this.maxScrollY - realSize) {
            if (total && pageNum > total) {
                _parent.attr('up', noneData)
            } else {
                _parent.attr('up', releaseLoad);
            }
        } else if (this.y < this.maxScrollY - realSize / 2) {
            if (total && pageNum > total) {
                _parent.attr('up', noneData)
            } else {
                _parent.attr('up', upLoading);
            }
        }
        if (this.y > realSize) {
            _parent.attr('down', releaseRefesh);
        } else if (this.y > realSize / 2) {
            _parent.attr('down', downRefesh);
        }
    });
    pullScroll.on('scrollEnd', function() {
        if (total && pageNum > total) {
            _parent.attr('up', noneData);
        } else {
            _parent.attr('up', upLoading);
        }

        _parent.attr('down', downRefesh);
    });
    pullScroll.on('touchEnd', function() {
        if (_parent.attr('up') === releaseLoad) {
            if (total && pageNum > total) {
                return false;
            } else {
                loadMore(pageNum);
                pageNum++;
            }
        }
        if (_parent.attr('down') === releaseRefesh) {
            location.reload();
        }
    });

    function loadMore(pageNum) {
        $('body').append(bookMore);
        $.ajax({
            url: '/api/recommend',
            dataType: 'json',
            data: {
                pageNum: pageNum,
                count: count
            },
            success: function(res) {
                console.log(res);
                render(res.items, $('#book-more-tpl'), $('.book-more-list'));
                pullScroll.refresh();
                total = res.total / count;
            },
            error: function(error) {
                console.warn(error);
            }
        });
    }
    //滑动处理  
    var startX, startY;
    document.addEventListener('touchstart', function(ev) {
        startX = ev.touches[0].pageX;
        startY = ev.touches[0].pageY;
    }, false);
    document.addEventListener('touchend', function(ev) {
        var endX, endY;
        endX = ev.changedTouches[0].pageX;
        endY = ev.changedTouches[0].pageY;
        var direction = getSlideAngle(startX, startY, endX, endY);
        switch (direction) {
            case 3:
                wrapSwiper.slideTo(1);
                $('.line').addClass('move');
                $('.tab-item').eq(1).addClass('active').siblings().removeClass('active');
                break;
            case 4:
                wrapSwiper.slideTo(0);
                $('.line').removeClass('move');
                $('.tab-item').eq(0).addClass('active').siblings().removeClass('active');
                break;
            default:
        }
    }, false);
    $('.icon-switch').on('click', function() {
        $('.book-frame').toggleClass('list-frame');
        $(".icon-switch").toggleClass('switch-icon-btn');
    });
    $('.top-search').on('click', function() {
        window.location.href = '../../page/search.html'
    });
    $('.icon-sign').on('click', function() {
        window.location.href = '../../page/login.html'
    });
});