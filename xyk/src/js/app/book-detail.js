require(['jquery', 'render', 'header', 'getRequest', 'storage'], function($, render, header, getRequest, storage) {
    header({ isSearch: false });
    var fiction_id = getRequest().fiction_id;

    $.ajax({
        url: '/api/bookDetail',
        dataType: 'json',
        data: {
            fiction_id: fiction_id
        },
        success: function(res) {
            render(res, $('#book-detail_tpl'), $('.cont'));
            header({ title: res.item.title });
            $('.render-header').on('click', '.icon-back', function() {
                window.location.href = '../../index.html';
            });
            $('.cont').on('click', '.book-read', function() {
                isLogin();
            });
        },
        error: function(error) {
            console.log(error)
        }
    });



    function isLogin() {
        var user = storage.get('user') || '';
        if (user) {
            $.ajax({
                url: '/isLogin',
                dataType: 'json',
                type: 'post',
                data: {
                    user: user
                },
                success: function(res) {
                    console.log(res)
                    if (res.code === 0 && res.result) {
                        window.location.href = '../../page/book-Read.html?fiction_id=' + fiction_id;
                    } else if ((res.code === 0 && !res.result) || res.code === 2) {
                        window.location.href = '../../page/login.html'
                    }
                },
                error: function(error) {
                    console.warn(error)
                }
            });
        } else {
            window.location.href = '../../page/login.html'
        }
    }
});