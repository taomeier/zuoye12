define([
    'jquery',
    'render',
    'lazyload',
    'text!template/menu.html'
], function ($, render, lazyload, menu) {
    var obj = getId();
    var id = obj.id;
    $.ajax({
        url: '/api/menu?id=' + id,
        dataType: 'json',
        success: function (res) {
            if (res.item) {
                $('.header-title').text('目录');
                render(menu, res.item.toc, '.inner');
                var index = $('.inner li').length-1;
                var lastId = $('.inner li').eq(index).attr('data-chapter');
                var readId = localStorage.getItem('read') || lastId;
                var readEle = $('.inner li[data-chapter=' + readId + ']');
                readEle.children('p').addClass('show');
                var liH = $('.inner li').innerHeight();
                var top =readEle.offset().top-(liH*1.2);
                $('.scroll').scrollTop(top);
            }
        },
        error: function (err) {
            console.warn(err);
        }
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

    $('.inner').on('click', 'li', function () {
        $(this).children('p').addClass('show');
        $(this).siblings().children('p').removeClass('show');
        var lastId = $(this).attr('data-chapter');
        localStorage.setItem('read', lastId);
        location.href = './text.html?id=' + id+'&readId='+lastId;
    });
});

