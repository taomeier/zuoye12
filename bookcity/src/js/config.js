require.config({
    baseUrl: '/js/',
    paths: {
        jquery: 'lib/jquery-1.8.3.min',
        swiper: 'lib/swiper',
        bscroll: 'lib/bscroll',
        handlebars: 'lib/handlebars',
        render: 'lib/render',
        zepoto:'lib/zepoto',
        flexible: 'lib/flexible',
        text: 'lib/require.text',
        template: '../template/',
        lazyload: 'lib/jquery.lazyload',
        base64:'lib/jquery.base64',
        index: 'index/index',
        search: 'search/search',
        details: 'details/details',
        menu: 'menu/menu',
        textHtml:'text/text'
    },
    shim: {
        lazyload: {
            exports: 'lazyload',
            deps: ['jquery']
        },
        mobile: {
            exports: 'mobile',
            deps:['jquery']
        },
        base64: {
            exports: 'base64',
            deps:['jquery']
        }
    }
});

require(['flexible']);