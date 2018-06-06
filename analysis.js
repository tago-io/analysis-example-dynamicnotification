const Analysis = require('tago/analysis');

// This is a hello world example to the Tago Analysis
// The function myAnalysis will run when you execute your analysis
function myAnalysis(context, scope) {
    // This will log "Hello World" at the Tago Analysis console
    context.log("Hello World");
    
    // This will log the context to the Tago Analysis console
    context.log('Context:', context);

    // This will log the scope to the Tago Analysis console
    context.log('my scope:', scope);
}

// The analysis token in only necessary to run the analysis outside Tago
module.exports = new Analysis(myAnalysis, 'MY-ANALYSIS-TOKEN-HERE');
