require(['jquery', 'header', 'render', 'storage'], function($, header, render, storage) {
    header({ isSearch: true });
    var history = storage.get('history') || [];
    var newArr = [];
    history.forEach(function(file) {
        if (newArr.indexOf(file) === -1) {
            newArr.push(file)
        }
        return newArr;
    })
    render(newArr, $('#tag-tpl'), $('.book-tag'));
    $('.search-btn').on('click', function() {
        var val = $('.inp').val();
        $('.book-tag').hide();
        $('.book-list>div').show();
        if (!val) {
            $('.result').append('<p>没有相应的搜索结果</p>');
        } else {
            history.push(val);
            storage.set('history', history);
            searchData(val)
        }
    });

    function searchData(val) {
        $.ajax({
            url: '/api/search',
            dataType: 'json',
            data: {
                key: val
            },
            success: function(res) {
                $('.book-list>div').html('');
                if (!res) {
                    $('.result').append('<p>没有相应的搜索结果</p>');
                } else {
                    render(res.items, $('#book-tpl'), $('.book-list>div'));
                }

            },
            error: function(error) {
                console.warn(error)
            }
        });
    }
    $('.inp').on('input', function() {
        var val = $(this).val();
        if (!val) {
            $('.book-tag').show();
            $('.book-list>div').html('');
            $('.book-list>div').hide();
        }
    });
    $('.book-tag').on('click', 'li', function() {
        $('.inp').val($(this).text());
        searchData($(this).text());
        $('.book-tag').hide();
        $('.book-list>div').show();
    });
    $('.render-header').on('click', '.icon-back', function() {
        window.location.href = '../../index.html';
    });
});