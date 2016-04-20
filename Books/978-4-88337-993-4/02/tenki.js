// 週間天気予報 RSS を取得してみよう

var RSS = 'http://rss.weather.yahoo.co.jp/rss/days/4410.xml';

var parseString = require('xml2js').parseString;
var request = require('request');

// RSSをダウンロード
request(RSS, (err, response, body) => {
  if (!err && response.statusCode === 200) {
    analyzeRSS(body);
  }
});

// RSSを解析する
function analyzeRSS(xml) {
  parseString(xml, (err, obj) => {
    if (err) {
      console.log(err);
      return ;
    }

    // 天気予報を表示
    // console.log(JSON.stringify(obj));
    var items = obj.rss.channel[0].item;
    for (var i in items) {
      var item = items[i];
      console.log(item.title[0]);
    }
  });
}