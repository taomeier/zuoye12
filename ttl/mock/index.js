var homeData = require('./home/home.json');
var json1 = require('./home/recommend1.json');
var json2 = require('./home/recommend2.json');
var json3 = require('./home/recommend3.json');
var searchKey = require('./home/searchKey.json');
var search = require('./home/search.json');
var detail = require('./book/352876');
var mulu = require('./book/chapter-list.json');

var data = {
    '/api/city': homeData,
    '/api/loadMore?pagenum=1&limit=10': json1,
    '/api/loadMore?pagenum=2&limit=10': json2,
    '/api/loadMore?pagenum=3&limit=10': json3,
    '/api/jia': json1,
    '/api/searchKey': searchKey,
    '/api/search': search,
    '/api/detail?id=352876': detail,
    '/api/mulu?id=352876': mulu
}

module.exports = function(url) {
    if (/\/api\/result/.test(url)) {
        var n = url.split('?')[1];
        var val = n.split('=')[1];
        var name = decodeURIComponent(val);
        var reg = new RegExp(name, 'g');
        var obj = {
            mes: '暂无数据！',
            cont: []
        }
        var newArr = search.items.filter(function(v, i) {
            v.summary = v.intro;
            v.authors = v.role[0][1];
            return reg.test(v.title) || reg.test(v.intro) || reg.test(v.role[0][1])
        })
        if (newArr.length) {
            obj.mes = 'success';
            obj.cont = newArr;
        }
        return obj;
    }
    return data[url];
}