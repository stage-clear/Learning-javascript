var net = require('net');
var redis = require('redis');

// チャットサーバーに接続する各ユーザーのためのセットアップロジック
var server = net.createServer(function(socket) {
  var subscriber;
  var publisher;

/*! on.connect が走らない...

  socket.on('connect', function() {
    // 各ユーザーの登録者クライアントを作成
    subscriber = redis.createClient();

    // チャンネルに登録する
    subscriber.subscribe('main_chat_room');

    // チャンネルからのメッセージが届いたらユーザーに表示
    subscriber.on('message', function(channel, message) {
      socket.write('Channel ', + channel + ': '+ message );
    });

    // 各ユーザーの発行者クライアントを作成
    publisher = redis.createClient();
  });
*/

  subscriber = redis.createClient();

  // チャンネルに登録する
  subscriber.subscribe('main_chat_room');

  // チャンネルからのメッセージが届いたらユーザーに表示
  subscriber.on('message', function(channel, message) {
    socket.write('Channel ' + channel + ': '+ message );
  });

  // 各ユーザーの発行者クライアントを作成
  publisher = redis.createClient();

  // ユーザがメッセージを入力したら発行
  socket.on('data', function(data) {
    publisher.publish('main_chat_room', data);
  });

  // ユーザーが雪像を断ったら、クライアント接続を終了
  socket.on('end', function() {
    subscriber.unsubscribe('main_chat_room');

    subscriber.end();
    publisher.end();
  });
});

server.listen(3000);