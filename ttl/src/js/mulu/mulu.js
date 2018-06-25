define([
    'jquery',
    'temp',
    'getUrl'
], function($, temp, getUrl) {
    var bookid = getUrl('id'),
        activeid = getUrl('active');
    console.log(bookid, activeid)
    $.ajax({
        url: '/api/mulu',
        data: {
            id: bookid
        },
        dataType: 'json',
        success: function(data) {
            data.item.toc.map(function(v) {
                v.chapter_id == activeid ? v.active = true : v.active = false;
            })
            console.log(data);
            temp($('.list').html(), data.item.toc, '.mulu-list');
        }
    })
});