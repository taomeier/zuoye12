define(['jquery', 'render', 'text!headerTpl'], function($, render, headerTpl) {
    function renderHeader(data) {
        $('body').append(headerTpl);
        render(data, $('#header-tpl'), $('.render-header'));
    }
    return renderHeader;
});