var fs = require('fs');

fs.open('hoge.txt', 'w', function(err, fd) {
  var buf = new Buffer('apple-orange-grape-peach');
  fs.write(fd, buf, 0, 6, 0);
  fs.write(fd, buf, 6, 7 ,6);
  fs.write(fd, buf, 13, 6, 13);
  fs.write(fd, buf, 19, 5, 19, function(err, written, buffer) {
    console.log(err, written);
    fs.close(fd);
  });
});