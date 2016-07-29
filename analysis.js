'use strict';
const Analysis = require('tago/Analysis');

function myanalysis(context, scope) {
    context.log('my context:', context);
    context.log('my scope:', scope);
}

module.exports = new Analysis(myanalysis, 'MY-ANALYSIS-TOKEN-HERE');
