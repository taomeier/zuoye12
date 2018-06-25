define([
    'jquery',
    'render',
    'lazyload',
    'text!template/searchKey.html',
    'text!template/search.html'
], function ($, render, lazyload, searchKey, searchList) {
    $.ajax({
        url: '/api/searchKey',
        dataType: 'json',
        success: function (res) {
            render(searchKey, res.ads, '.tag');
        },
        error: function (err) {
            console.warn(err);
        }
    });

    $('.search-btn').on('touchstart', function () {
        var val = $('input').val();
        $.ajax({
            url: '/api/search',
            dataType:'json',
            data: {
               val:val 
            },
            success: function (res) {
                console.log(res);
                if (res !== null) {
                    if (res.c) {
                        render(searchList, res.cont, '.list');
                        $("img.lazy").lazyload({
                            effect: "fadeIn",
                            container: $(".scroll")
                        });
                        $('.tag').hide();
                        $('.mes').hide();    
                    } else {
                        $('.list').text('');
                        $('.tag').hide();
                        $('.mes').show();
                    }
                } else {
                    $('.mes').show();
                    $('.tag').hide();
                    $('.list').text('');
                }
                
            },
            error: function (err) {
                console.warn(err);
            }
        });
    });
});