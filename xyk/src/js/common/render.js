define(['jquery', 'handlebars'], function($, handlebars) {
    function render(data, source, target, isRefresh) {
        var source = source.html();
        var template = handlebars.compile(source);
        handlebars.registerHelper('addInd', function(index) {
            return index + 2;
        });
        handlebars.registerHelper('limit', function(index, options) {
            if (index < 4) {
                return true;
            } else {
                return false;
            }
        });
        handlebars.registerHelper("limits", function(index, options) {
            if (index < 5) {
                return options.fn(this);
            } else {
                return options.inverse(this);
            }
        });
        var html = template(data);
        if (isRefresh) {
            target.html(html);
        } else {
            target.append(html);
        }
    }
    return render
});