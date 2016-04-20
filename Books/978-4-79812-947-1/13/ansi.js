var ansi = require('ansi');
var cursor = ansi(process.stdout);

cursor
  .reset()
  .write('  ')
  .bold()
  .underline()
  .bg.white()
  .fg.black()
  .write('Node.js in Action')
  .fg.reset()
  .resetUnderline()
  .resetBold()
  .write(' \n')
  .fg.green()
  .write(' by:\n')
  .fg.cyan()
  .write(' Mike Cantelon\n')
  .fg.magenta()
  .write(' TJ Holowaychunk\n')
  .fg.yellow()
  .write(' Nathan Rajinch\n')
  .reset();