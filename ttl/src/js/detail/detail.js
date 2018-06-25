define([
    'jquery',
    'getUrl',
    'text!banner/xiang.html',
    'temp'
], function($, getUrl, xiang, temp) {
    var $id = getUrl('id');
    $.ajax({
        url: "/api/detail?id=" + $id,
        dataType: "json",
        success: function(data) {
            console.log(data);
            temp(xiang, data, '.scroll');
        }
    })
});