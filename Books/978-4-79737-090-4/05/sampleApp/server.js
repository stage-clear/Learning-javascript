var http = require('http');
var querystring = require('querystring');
var crypto = require('crypto');

var htmlHeader = '<!DOCTYPE html>\
  <html>\
    <head>\
      <meta charset="utf-8">\
      <title>Node Uranai</title>\
      <style>\
      </style>\
    </head>\
    <body>\
      <div class="content">\
        <h1>Node uranai</h1>';

var htmlMainForm = '<div class="main-fomr">\
  <form method="post" action="/">\
    <div>\
      <label>名前 <input type="text" name="name" size="20"></label>\
    </div>\
    <div>\
      生年月日:\
      <label><input type="text" name="year" size="5">年</label>\
      <label><input type="text" name="month" size="5">月</label>\
      <label><input type="text" name="day" size="5">日</label>\
    </div>\
    <div>\
      性別:\
      <label><input type="radio" name="sex" value="male">男</label>\
      <label><input type="radio" name="sex" value="female">女</label>\
    </div>\
    <input type="submit" value="send">\
  </form>\
</div>';

var htmlFooter = '<div></body></html>';


function escapeHtmlSpecialChar(html) {
  if (html === undefined) {
    return ;
  } else {
    html = html.replace(/&/g, '&amp;');
    html = html.replace(/</g, '&lt;')
    html = html.replace(/>/, '&gt;');
    return html;
  }
}

var server = http.createServer(function(req, res) {
  if (req.url != '/') {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=UTF-8'});
    res.end('Error 404: Not Found');
    return;
  }

  // POST 以外
  if (req.method != 'POST') {
    res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'});
    res.write(htmlHeader);
    res.write(htmlMainForm);
    res.write(htmlFooter);
    res.end();
    return;
  }

  if (req.method == 'POST') {
    req.data = '';
    req.on('data', function(chunk) {
      req.data += chunk;
    });
    req.on('end', sendResponse);
    return ;
  }

  function sendResponse() {
    var query = querystring.parse(req.data);
    var seed = query.name + query.sex;
    hash = crypto.createHash('md5');
    hash.update(seed);
    var hashValue = hash.digest('hex');

    var fortuneKey = Number('0x' + hashValue.slice(0, 2));

    var result = '';
    if (fortuneKey < 10) {
      result = '大凶';
    } else if (fortuneKey < 50) {
      result = '凶';
    } else if (fortuneKey < 100) {
      result = '末吉';
    } else if (fortuneKey < 150) {
      result = '吉';
    } else if (fortuneKey < 245) {
      result = '中吉';
    } else {
      result = '大吉';
    }

    var resultStr = '<div><p>'
      + escapeHtmlSpecialChar(query.year) + '年'
      + escapeHtmlSpecialChar(query.month) + '月'
      + escapeHtmlSpecialChar(query.day) + '日生まれの'
      + escapeHtmlSpecialChar(query.name) + 'さん('
      + ((query.sex == 'male') ? '男性' : '女性')
      + ')の運勢は...'
      + '<span class="result">'
      + result + '</span>'
      + 'です。</p></div>'
      + '<a href="/">トップに戻る</a>';

    res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'});
    res.write(htmlHeader);
    res.write(resultStr);
    res.write(htmlFooter);
    res.end();
  }
});

var PORT = 8080;
var ADDRESS = '127.0.0.1';
server.listen(PORT, ADDRESS);
console.log('Server running at http://' + ADDRESS + ':' + PORT + '/');