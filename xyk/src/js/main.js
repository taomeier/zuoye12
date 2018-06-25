require.config({
    baseUrl: '/js/',
    paths: {
        //libs
        'jquery': 'libs/jquery',
        'handlebars': 'libs/handlebars-v4.0.11',
        'bscroll': 'libs/bscroll',
        'text': 'libs/text',
        'jsonp': 'libs/jquery.jsonp',
        'base64': 'libs/jquery.base64',
        'swiper': 'libs/swiper-4.1.6.min',

        //app
        'index': 'app/index',
        'search': 'app/search',
        'book-detail': 'app/book-detail',
        'book-Chapter': 'app/book-Chapter',
        'book-Read': 'app/book-Read',
        'login': 'app/login',

        //common
        'getRequest': 'common/getRequest',
        'getSlideAngle': 'common/getSlideAngle',
        'header': 'common/header',
        'render': 'common/render',
        'storage': 'common/storage',

        //tpl
        'bookTb': '../page/tpl/book-t-b-list.html',
        'bookLr': '../page/tpl/book-l-r-list.html',
        'bookMore': '../page/tpl/book-more.html',
        'headerTpl': '../page/tpl/header.html'
    },
    shim: {
        'base64': {
            deps: ['jquery']
        }
    }
});