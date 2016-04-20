var ejs = require('ejs');
var template = '<%=: movies | last %>';
var context = { 'movies': [
  'Bambi', 'Babe: Pig in the city', 'Enter the Void'
]};

console.log(ejs.render(template, context));