define([
    'jquery',
    'render',
    'text!template/text.html',
    'base64'    
], function ($, render, text) {
    var allNum = null;
    var id = getId().id;
    var readId = getId().readId;
    var thisSec = readId * 1 + 1;
    localStorage.setItem('read', readId);
    $.ajax({
        url: '/api/text',
        dataType: 'json',
        data: {
            chapterNum:readId
        },
        success: function (res) {
            jsonP(res.jsonp, function (data) {
                var data = JSON.parse($.base64('decode', data, true));
                render(text, data, '.wraper');
                $('.text-box').on('click', function () {
                    $('.wraper').toggleClass('wraper-none');
                });
                $('.this-sec').text(thisSec);
                $('.menu-btn').on('click', function () {
                    var href = $(this).attr('data-href');
                    var str = href + '?id=' + id;
                    location.href = str;
                });
                var night = localStorage.getItem('night') * 1 || 0;
                $('.text').attr('data-night', night);

                var bg = localStorage.getItem('bg') * 1 || 0;
                $('.text').attr('data-bg', bg);
                $('.wraper .background-color span').eq(bg).addClass('back-show').siblings().removeClass('back-show');
                
                var obj = JSON.parse(localStorage.getItem('pCss')) || {
                        'font-size': 56 + 'px',
                        'line-height':70 +'px'
                    };
                $('.text p').css(obj);
            });
        },
        error: function (err) {
            console.warn(err);
        }
    });
    $.ajax({
        url: '/api/menu?id=' + id,
        dataType: 'json',
        success: function (res) {
            var allSec = res.item.toc.length;
            allNum = res.item.toc.length;
            $('.all-sec').text(allSec);
        },
        error: function (err) {
            console.warn(err);
        }
    });
    $('.wraper').on('click', '.prev-btn', function () {
        var newReadId = readId * 1 - 1;
        if (readId <= 0) {
            readId = 0;
            alert('已经是第一章');
            return false;
        }
        location.href = './text.html?id=' + id+'&readId='+newReadId;
    });
    $('.wraper').on('click', '.next-btn', function () {
        var newReadId = readId * 1 + 1;
        if (readId <= allNum.length) {
            readId = allNum;
            alert('已经是最后一章');
            return false;
        }
        location.href = './text.html?id=' + id+'&readId='+newReadId;
    });
    $('.wraper').on('click', '.night-btn', function () {
        var night = ($('.text').attr('data-night')) * 1;
        if (night) {
            $('.img-night').addClass('night-change');
            $('.night-text').text('白天');
            $('.text').attr('data-night', 0);//关
            localStorage.setItem('night', 0);
        } else {
            $('.img-night').removeClass('night-change');
            $('.night-text').text('夜间');
            $('.text').attr('data-night', 1);//开
            localStorage.setItem('night', 1);
        }
    });
    $('.wraper').on('click', '.font-btn', function () {
        $('.img-font').toggleClass('img-font-toggle');
        $('.font-mark').toggle();
    });
    $('.wraper').on('click', '.background-color span', function () {
        var index = $(this).index();
        var flag = $('.text').attr('data-night') * 1;
        if (!flag) {
            $(this).addClass('back-show').siblings().removeClass('back-show');
            $('.text').attr('data-bg', index);
            localStorage.setItem('bg', index);
        }
    });
    $('.wraper').on('click', '.font-size-add', function () {//大
        var one = 3;
        var size = px($('.text p').css('font-size'));
        var line = px($('.text p').css('line-height'));
        // 最大61
        var newSize = size + one;
        var newLine = line + one;
        if (newSize >= 61) {
            newSize = 61;
            newLine = newLine;
            return false;
        }
        $('.text p').css({
            'font-size': newSize + 'px',
            'line-height':newLine +'px'
        });
        var obj = {
            'font-size': newSize + 'px',
            'line-height':newLine +'px'
        }
        localStorage.setItem('pCss',JSON.stringify(obj));
    });
    $('.wraper').on('click', '.font-size-sub', function () {//小
        // 最小32
        var one = 3;
        var size = px($('.text p').css('font-size'));
        var line = px($('.text p').css('line-height'));
        var newSize = size - one;
        var newLine = line - one;
        if (newSize <= 32) {
            newSize = 32;
            newLine = newLine;
            return false;
        }
        $('.text p').css({
            'font-size': newSize + 'px',
            'line-height':newLine +'px'
        });
        var obj = {
            'font-size': newSize + 'px',
            'line-height':newLine +'px'
        }
        localStorage.setItem('pCss',JSON.stringify(obj));
    });

    function getId() {
        var str = location.search.split('?')[1];
        var arr = str.split('&');
        var obj = {}
        arr.map(function (v, i) {
            var ar = v.split('=');
            obj[ar[0]] = ar[1];
        });
        return obj;
    }
    function jsonP(url,success) {
        var script = document.createElement('script');
        window['duokan_fiction_chapter'] = function (data) {
            success(data);
            document.head.removeChild(script);
        }
        script.src = url;
        document.head.appendChild(script);
    }
    function px(str) {
        var size = Math.ceil(str.split('px')[0] * 1);
        return size;
    }
});

