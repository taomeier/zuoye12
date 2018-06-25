define([
    'jquery',
    "getUrl",
    "template",
    "text!../tql/detail.html",
    "text!../tql/detail2.html"
], function($, geturl, template, text, text2) {
    var id = geturl('activeid');
    $.getJSON('/book/detail', {
        acitveid: id
    }, function(d) {
        var data = d.author_books[0];
        data.word_count = Math.round(data.word_count / 10000);
        //老九门
        template(text2, d.item, "#wrap");
        //点击查看更多
        $('.folder-cnt').on('click', function() {
            $(this).toggleClass('-fold')
        });
        //作者其他图书
        template(text, data, "#wrap");
        //点击跳转阅读页
        $('.book-dash-text').on('click', function() {
            location.href = "/page/read.html?activeid=" + id;
        });
    })
});