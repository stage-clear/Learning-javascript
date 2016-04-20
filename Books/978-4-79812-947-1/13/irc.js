var cp = require('child_process');

room.on('message', function(user, message) {
  // room オブジェクトは IRCルームとの接続を表現する
  // ここで想定している IRC モジュールは、ルームに送られた
  // それぞれの IRC メッサージについて、メッセージイベントを送出する

  // メッセージ内容がピリオドで始まるかをチェック
  if (message[0] === '.') {
    // メッセージ内容からコマンドを抽出
    var command = message.substring(1);
  }

  // 子プロセスを生成して実行。15秒でタイムアウト
  // コマンド実行中の出力は、Node によってバッファリングされる
  cp.exec(command, { timeout: 15000 }, function(err, stdout, stderr) {
    // 子プロセス終了時のコールバック
    if (err) {
      room.say('"Error executing command" '+ command +': ' + err.message);
      // バッファリングされた標準エラー
      room.say(stderr);
    } else {
      room.say('Command completed: ' + command);
      // バッファリングされた標準出力
      room.say(stdout);
    }
  });
});