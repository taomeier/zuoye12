require(['jquery', 'render', 'header', 'getRequest', 'bscroll', 'storage'], function($, render, header, getRequest, bscroll, storage) {
    header({
        isSearch: false,
        title: '目录'
    });
    var fiction_id = getRequest().fiction_id;
    $.ajax({
        url: '/api/chapter',
        dataType: 'json',
        data: {
            fiction_id: fiction_id
        },
        success: function(res) {
            render(res.item.toc, $('#chapter-tpl'), $('.book-chapter>ul'));
            var chapterBscroll = new bscroll('.book-chapter', {
                scrollY: true,
                probeType: 2,
                click: true
            });
            var chapter_id = getRequest().chapter_id;
            var target;
            if (chapter_id) {
                target = chapter_id
            } else {
                target = res.item.toc.length
            }
            chapterBscroll.scrollToElement($(".book-chapter>ul li").eq(target - 1)[0]);
            $(".book-chapter>ul li").eq(target - 1).addClass('active');
        },
        error: function(error) {
            console.log(error)
        }
    });
    $('.render-header').on('click', '.icon-back', function() {
        history.go(-1)
    });
    $(".book-chapter ul").on('click', 'li', function() {
        chapter_id = $(this).index() + 1;
        storage.set('chapter_id', chapter_id);
        window.location.href = '../../page/book-Read.html?fiction_id=' + fiction_id + '&chapter_id=' + chapter_id;
    });
});