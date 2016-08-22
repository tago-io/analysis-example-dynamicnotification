'use strict';
const Analysis = require('tago/analysis');

function myanalysis(context, scope) {
    context.log("Hello World");
    
    //Example, passing context to console
    context.log('my context:', context);

    //Example, passing scope to console
    context.log('my scope:', scope);
}

module.exports = new Analysis(myanalysis, 'MY-ANALYSIS-TOKEN-HERE');
