'use strict';
const Analysis = require('tago/Analysis');

function myanalysis(context, scope) {
    console.log('my context:', context);
    console.log('my scope:', scope);
}

module.exports = new Analysis(myanalysis, 'MY-ANALYSIS-TOKEN-HERE');