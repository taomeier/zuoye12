define(["jquery","handlebars"],function(e,l){return function(e,r,n,t){r=r.html();var i=l.compile(r);l.registerHelper("addInd",function(e){return e+2}),l.registerHelper("limit",function(e,r){return e<4}),l.registerHelper("limits",function(e,r){return e<5?r.fn(this):r.inverse(this)});var u=i(e);t?n.html(u):n.append(u)}});