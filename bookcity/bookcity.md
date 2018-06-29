bookcity
|--gulpfile.js
|--src
    |--index.html                   //首页
    |--page
        |--search.html              //搜素页
        |--details.html             //详情页
        |--menu.html                //目录页
        |--text.html                //阅读页
        |--login.html               //登录注册页
    |--scss
        |--common.scss              //公共样式
        |--index.scss               //首页样式
        |--search.scss              //搜索样式
        |--details.scss             //详情样式
        |--menu.scss                //目录样式
        |--text.scss                //阅读样式
        |--login.scss               //登录注册样式
    |--js
        |--connmon
            |--jsonp.js             //jsonp公共方法
        |--app
            |--index.js
            |--search.js
            |--details.js
            |--menu.js
            |--text.js
            |--login.js
        |--lib
            |--jquery-1.8.3.min.js  //jq
            |--bscroll.js           //bscroll
            |--swiper.js            //swiper
            |--require.js           //require
            |--handlebars.js        //handlebars
            |--jquery.lazyload.js   //图片懒加载
            |--render.js            //渲染
    |--template                     //模板
        |--banner.html
        |--blockHot.html
        |--blockTime.html
        |--details.html
        |--five.html
        |--menu.html
        |--nav.html
        |--search.html
        |--self.html
        |--sift.html
        |--text.html
        |--up.html
|--mock
    |--index.js                     //数据入口文件
    |--index
        |--home.json                //首页数据
        |--recommend1.json          //下拉加载数据
        |--recommend1.json
        |--recommend1.json
    |--details      
        |--details352876.json       //详情页数据
    |--menu
        |--352876.json              //目录数据
    |--search
        |--search.json              //搜索推荐数据
        |--searchKey.json           //搜索数据
    |--text
        |--data1.json               //章节数据
        |--data2.json
        |--data3.json
        |--data4.json
    |--login
        |--login.json               //登录注册数据


端口
/api/home                           //首页
/api/loadData?pagenum=1             //下拉加载
/api/loadData?pagenum=2
/api/loadData?pagenum=3
/api/self                           //书架
/api/searchKey                      //搜索页
/api/search
/api/details?id=352876              //详情页
/api/menu?id=352876                 //目录
/api/text?chapterNum=0              //章节
/api/text?chapterNum=1
/api/text?chapterNum=2
/api/text?chapterNum=3
/log/login                          //登录
/log/register                       //注册