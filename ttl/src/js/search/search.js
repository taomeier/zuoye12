define([
    'jquery',
    'temp',
    'text!banner/love.html'
], function($, temp, love) {

    var storge = window.localStorage;
    //搜索历史
    var searchData = JSON.parse(storge.getItem('searchPlay')) || [];
    searchHis();

    //刚开始search页面内容
    $.ajax({
        url: '/api/searchKey',
        dataType: 'json',
        success: searchKey
    })

    function searchKey(data) {
        temp($('.text').html(), data, '.ul-cont')
    }

    //点击搜索
    $('.btnSou').on('click', function() {
        var html = $('.input').val();
        searchData.unshift(html);
        storge.setItem('searchPlay', JSON.stringify(searchData));
        searchHis();
        if (html !== '') {
            $.ajax({
                url: '/api/result',
                data: { value: html },
                dataType: 'json',
                success: search
            })
        }

        function search(data) {
            console.log(data);
            if (data.mes === 'success') {
                temp(love, data.cont, '.ul-cont');
            } else {
                $('.ul-cont').html(data.mes);
            }
        }
    })

    function searchHis() {
        temp($('.hisText').html(), searchData, '.ol-his');
    }

    //清除历史记录
    $('.ol-his').on('click', 'span', function() {
        var i = $(this).data('ind');
        searchData.splice(i, 1);
        storge.setItem('searchPlay', JSON.stringify(searchData));
        searchHis();
    })
});