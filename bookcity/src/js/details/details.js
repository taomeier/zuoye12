define([
    'jquery',
    'render',
    'lazyload',
    'text!template/details.html'
], function ($, render, lazyload, details) {
    var id = getId().id;
    $.ajax({
        url: '/api/details?id=' + id,
        dataType: 'json',
        success: function (res) {
            $('.header-title').text(res.item.title);
            render(details, res, '.inner'); 
            $("img.lazy").lazyload({
                effect: "fadeIn",
                container: $(".scroll")
            });
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
    //阅读
    $('.inner').on('click', '.read-btn', function () {
        var id = getId().id;
        var readId = localStorage.getItem('read') || 0;
        var href = $(this).attr('data-href');
        var str = href + '?id=' + id +'&readId='+readId;
        location.href = str;
    });

    //目录
    $('.inner').on('click', '.latest', function () {
        var href = $(this).attr('data-href');
        var id = $(this).attr('data-id');
        var chapterId = $(this).attr('data-chapter');
        var str = href + '?id=' + id;
        location.href = str;
    });
});

