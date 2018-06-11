/* 
 * Analysis Example
 * Hello World
 * 
 * Learn how to send messages to the console located on the Tago analysis screen.
 * You can use this principle to show any information during and after development.
 */

const Analysis = require('tago/analysis');

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
