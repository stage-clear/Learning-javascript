var ejs = require('ejs');
var template = '<%= message %>';
var context = { message: 'Hello, template!' };

console.log(ejs.render(template, { locals: context }));

