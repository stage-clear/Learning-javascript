'use strict';
var RSS = 'http://rss.weather.yahoo.co.jp/rss/days/4410.xml';

var client = require('cheerio-httpcli');

client.fetch(RSS, {}, (err, $, res) => {
  if (err) {
    console.log('error');
    return ;
  }

  $('item > title').each(function(idx) {
    var title = $(this).text();
    console.log('[]', title);
  });
});