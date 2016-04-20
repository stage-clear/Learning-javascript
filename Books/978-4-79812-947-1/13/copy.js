var fs = require('fs');

module.exports = function(oldPath, newPath, callback) {
  fs.rename(oldPath, newPath, function(err) {
    // fs.rename() を呼び出しうまくいくことを祈る
    if (err) {
      if (err.code === 'EXDEV') {
        // もし EXDEV エラーが発生したらコピー処理に
        // フォールバック
        copy();
      } else {
        // その他のエラーが発生したら失敗に呼び出し側に報告
        callback(err);
      }
      return ;
    }
    // もし fs.rename()が成功したら処理は終わっている
    callback();
  });

  function copy() {
    // コピー元のパスから読む
    var readStream = fs.createReadStream(oldPath);
    // コピー先のパスに書く
    var writeStream = fs.createWriteStream(newPath);
    readStream('error', callback);
    writeStream('error', callback);
    readStream('close', function() {
      // コピーが完了したら元ファイルを unlink (削除)
      fs.unlink(oldPath, callback);
    });
    // コピー元とコピー先をパイプでつなぐ
    readStream.pipe(writeStream);
  }
};