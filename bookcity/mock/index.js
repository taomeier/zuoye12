var home = require('./index/home.json');
var load1 = require('./index/recommend1.json');
var load2 = require('./index/recommend2.json');
var load3 = require('./index/recommend3.json');
var self = require('./index/self.json');
var searchkey = require('./search/searchKey.json');
var search = require('./search/search.json');
var details352876 = require('./details/details352876.json');
var menu352876 = require('./menu/352876.json');
var text1 = require('./text/data1.json');
var text2 = require('./text/data2.json');
var text3 = require('./text/data3.json');
var text4 = require('./text/data4.json');
var url = require('url');
opt = {
    '/api/home': home,
    '/api/loadData?pagenum=1': load1,
    '/api/loadData?pagenum=2': load2,
    '/api/loadData?pagenum=3': load3,
    '/api/self': self,
    '/api/searchKey':searchkey,
    '/api/search': search,
    '/api/details?id=352876': details352876,
    '/api/menu?id=352876': menu352876,
    '/api/text?chapterNum=0': text1,
    '/api/text?chapterNum=1': text2,
    '/api/text?chapterNum=2': text3,
    '/api/text?chapterNum=3': text4,
}
module.exports = function (a) {
    var obj = url.parse(a, true);
    var val = obj.query.val;
    if (val) {
        var reg = new RegExp(val, 'g');
        var obj = {
            mes: '没有响应的搜索结果',
            cont: [],
            c:0
        }
        var newArr = search.items.filter(function (v, i) {
            return reg.test(v.title) || reg.test(v.intro) || reg.test(v.role[0][1]);
        });
        if (newArr.length) {
            obj.mes = 'success';
            obj.cont = newArr;
            obj.c = 1;
        }
        return obj;
    }
    return opt[a]
}