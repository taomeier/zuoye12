define([
    'jquery',
    'handlebars'
], function($, Handlebars) {
    return function(str, data, parent, math) {
        var compile = Handlebars.compile(str);
        Handlebars.registerHelper('finish', function(items) {
            if (items) {
                return '完结'
            } else {
                return '连载'
            }
        })
        Handlebars.registerHelper('wordcound', function(items) {
            return Math.round(items / 1000);
        })
        Handlebars.registerHelper('update', function(items) {
            var date = new Date(items);
            return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + '-' + date.getHours() + '-' + date.getMinutes();
        })
        if (math) {
            $(parent).append(compile(data));
        } else {
            $(parent).html(compile(data));
        }
    }
});