define(['jquery','handlebars'], function ($,handlebars) {
    function render(tpl, data, output, flag) {
        handlebars.registerHelper('time', function (param, options) {
            var date = new Date(param);
            var y = date.getFullYear();
            var m = date.getMonth();
            var d = date.getDay();
            var h = date.getHours();
            var min = date.getMinutes();
            var s = date.getSeconds();
            var str = y +'年'+ m +'月'+ d + '日 ' + h + ':' + min + ':' + s;
            return str;
        });
        handlebars.registerHelper('url', function (param, options) {
            var str = param.split('icon|')[1].split(';url')[0];
            return str;
        });
        handlebars.registerHelper('compare', function (v1, v2, options) {
            if (v1 === v2) {
                return options.fn(this);
            } else {
                return options.inverse(this);
            }
        });
        handlebars.registerHelper('five', function (v1, options) {
            var arr = v1.slice(0, 5);
            return options.fn(arr);
        });
        handlebars.registerHelper('three', function (v1, options) {
            var arr = v1.slice(0, 3);
            return options.fn(arr);
        });
        handlebars.registerHelper('indexA', function (v1, options) {
            var num = v1 > 0 ? '0' + (v1 + 1) : v1 + 1;
            return num;
        });
        handlebars.registerHelper('fontSize', function (v1, options) {
            var oldNum = this.item.word_count;
            var baiwan = parseInt((oldNum % 10000000) / 1000000);
            var shiwan = parseInt((oldNum % 1000000) / 100000);
            var newNum = parseInt(baiwan+''+(shiwan+1)+'0')
            return newNum; 
        });
        var template = handlebars.compile(tpl);
        var html = template(data);
        if (flag) {
            $(output).append(html);
        } else {
            $(output).html(html);
        }
    }
    return render;
});