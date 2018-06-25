require(['jquery', 'render', 'base64', 'storage', 'jsonp', 'getRequest', 'render'], function($, render, base64, storage, jsonp, getRequest, render) {
    var _setTop = $('.set-t'),
        _setBot = $('.set-b'),
        _mask = $('.mask'),
        _setPanel = $('.set-panel');
    //点击内容
    $('.read-hml').on('click', '.read-content', function() {
        _setTop.show();
        _setBot.show();
        _mask.show();
        $('.font').removeClass('active');
    });
    //点击蒙层
    _mask.on('click', function() {
        _setTop.hide();
        _setBot.hide();
        $(this).hide();
        _setPanel.hide();
    });
    //获取章节列表
    var fiction_id = getRequest().fiction_id,
        chapter_id = storage.get('chapter_id') || 1;
    $('.cur').html(chapter_id);
    getArtical();
    $.ajax({
        url: '/api/chapter',
        dataType: 'json',
        data: {
            fiction_id: fiction_id
        },
        success: function(res) {
            console.log(res);
            $('.total').html(res.item.toc.length)
        },
        error: function(error) {
            console.log(error)
        }
    });
    //获取章节内容
    function getArtical() {
        $.ajax({
            url: '/api/artical',
            dataType: 'json',
            data: {
                fiction_id: fiction_id,
                chapter_id: chapter_id
            },
            success: function(res) {
                jsonp({
                    url: res.url,
                    callback: 'duokan_fiction_chapter',
                    cache: true,
                    success: function(data) {
                        var str = $.base64('decode', data, true);
                        var obj = JSON.parse(str);
                        render(obj, $('#read-tpl'), $('.read-hml'), true);
                        $('p').css('font-size', initSize / 37.5 + 'rem');
                    }
                })
            },
            error: function(error) {
                console.log(error)
            }
        });
    }

    //点击上一章
    $('.prev-btn').on('click', function() {
        if (chapter_id > 1) {
            chapter_id -= 1;
            getArtical();
            $('.cur').html(chapter_id);
            storage.set('chapter_id', chapter_id);
        }
    });
    //点击下一章
    $('.next-btn').on('click', function() {
        if (chapter_id < 5) {
            chapter_id += 1;
            getArtical();
            $('.cur').html(chapter_id);
            storage.set('chapter_id', chapter_id);
        }
    });
    //点击目录
    $('.catalog-btn').on('click', function() {
        window.location.href = '../../page/book-Chapter.html?fiction_id=' + fiction_id + '&chapter_id=' + chapter_id;
    });
    //点击返回
    $('.icon-circle-back').on('click', function() {
        window.location.href = '../../page/book-detail.html?fiction_id=' + fiction_id;
    });
    //点击字体
    $('.font-btn').on('click', function() {
        $('.font').toggleClass('active');
        if ($('.font').hasClass('active')) {
            _setPanel.show();
        } else {
            _setPanel.hide();
        }
    });
    var initSize = storage.get('fz') || 14, // 初始化字体
        maxSize = 20, //最大字体
        minSize = 10; //最小字体

    $(".read-hml").show();
    //点击变大字体
    $('.big-btn').on('click', function() {
        if (initSize < maxSize) {
            initSize += 2;
            storage.set('fz', initSize);
        }
        $('p').css('font-size', initSize / 37.5 + 'rem');
    });
    //点击变小字体
    $('.small-btn').on('click', function() {
        if (initSize > minSize) {
            initSize -= 2;
            storage.set('fz', initSize);
        }
        $('p').css('font-size', initSize / 37.5 + 'rem');
    });
    var lightBgColor = '#0f1410',
        isLight = storage.get('mark') ? true : false,
        bg = storage.get('bg') || '#f7eee5';
    if (!isLight) {
        $('.read-hml').css('background', bg);
    } else {
        $('.read-hml').css('background', lightBgColor);
        $(".night").addClass("day").next().html("白天");
    }
    //点击变颜色
    $('ul li').on('click', function() {
        $(this).addClass('active').siblings().removeClass('active');
        bg = $(this).attr('bg-color')
        storage.set('bg', bg);
        if (!isLight) {
            $('.read-hml').css('background', bg);
        }
    });
    //点击夜间
    $('.night-btn').on('click', function() {
        $('.night').toggleClass('day');
        isLight = $('.night').hasClass('day');
        var text = isLight ? '白天' : '夜间';
        $(this).children('dd').text(text);
        if (isLight) {
            $('.read-hml').css('background', lightBgColor);
        } else {
            $('.read-hml').css('background', bg);
        }
        storage.set('mark', isLight);
    });
});