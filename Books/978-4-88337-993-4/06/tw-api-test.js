'use strict';
// Twitter API を使ったプログラム

let Twit = require('twit');

let T = new Twit({
  consumer_key: 'consumer_key',
  consumer_secret: 'consumer_secret',
  access_token: 'access_token',
  access_token_secret: 'access_token_secret'
});

// JavaScriptに関するつぶやきを表示する ---- (※2)
var stream = T.stream('statuses/filter', {track: 'JavaScript'} );
// つぶやきがあったときに呼ばれるイベントを設定 --- (※3)
stream.on('tweet', function (tw) {
  var text = tw.text;
  var user_name = tw.user.name;
  console.log(user_name + "> " + text);
});