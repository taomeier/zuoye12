require.config({
    baseUrl: "/js/",
    paths: {
        zepto: "lib/zepto",
        index: "page/index",
        jquery: "lib/jquery-1.11.1.min",
        swiper: "lib/swiper-4.1.6.min",
        text: "lib/require.text",
        banner: "../banner",
        temp: "common/temp",
        handlebars: "lib/handlebars-v4.0.11",
        search: "search/search",
        lazyload: "lib/jquery.lazyload",
        detail: "detail/detail",
        getUrl: "common/getUrl",
        mulu: "mulu/mulu"
    },
    shim: {
        lazyload: {
            exports: 'lazyload',
            deps: ['jquery']
        }
    }
})