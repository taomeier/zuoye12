var homeJson = require('./data/home.json');
var recommend1 = require('./data/recommend/recommend1.json');
var recommend2 = require('./data/recommend/recommend2.json');
var recommend3 = require('./data/recommend/recommend3.json');
var searchZhu = require('./data/searchZhu.json');
var searchZetian = require('./data/searchzetian.json');
var detail352876 = require('./data/detail352876.json');
var detail306643 = require('./data/detail306643.json');
var detail301342 = require('./data/detail301342.json');
var chapter352876 = require('./data/chapter352876.json');
var chapter301342 = require('./data/chapter301342.json');
var artical352876 = require('./data/artical/data352876.json');
var data1 = require('./data/artical/data1.json');
var data2 = require('./data/artical/data2.json');
var data3 = require('./data/artical/data3.json');
var data4 = require('./data/artical/data4.json');
var data5 = require('./data/artical/data5.json');
var jsonObj = {
    '/api/index': homeJson,
    '/api/recommend?pageNum=1&count=10': recommend1,
    '/api/recommend?pageNum=2&count=10': recommend2,
    '/api/recommend?pageNum=3&count=10': recommend3,
    '/api/search?key=诛仙': searchZhu,
    '/api/search?key=择天记': searchZetian,
    '/api/bookDetail?fiction_id=352876': detail352876,
    '/api/chapter?fiction_id=352876': chapter352876,
    '/api/bookDetail?fiction_id=306643': detail306643,
    '/api/bookDetail?fiction_id=301342': detail301342,
    '/api/chapter?fiction_id=301342': chapter301342,
    '/api/artical?fiction_id=352876&chapter_id=1': data1,
    '/api/artical?fiction_id=352876&chapter_id=2': data2,
    '/api/artical?fiction_id=352876&chapter_id=3': data3,
    '/api/artical?fiction_id=352876&chapter_id=4': data4,
    '/api/artical?fiction_id=352876&chapter_id=5': data5
}

module.exports = function(url) {
    if (jsonObj[url]) {
        return jsonObj[url]
    } else {
        return null
    }
}