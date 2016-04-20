// 年齢制限を設定
var requiredAge = 18;

// ユーザーに出す質問
process.stdout.write('Please enter your age: ');

// stdin の設定を変えて、デフォルトの Buffer ではなく
// utf-8 文字列を使うよう指定
process.stdin.setEncoding('utf8');

process.stdin.on('data', function(data) {
  // data を解析して整数値に変換
  var age = parseInt(data, 10);
  // もしユーザー入力が数値として無効なら、
  // それを知らせるメッセージを出す

  if (isNaN(age)) {
    console.log('%s is not a valid number!', data);
  } else if (age < requiredAge) {
    // もしユーザーが入力した年齢が制限未満なら、あと何年
    // 待てばよいかを知らせる
    console.log('You must be at least %d to enter, ' + 'come back in %d years', requiredAge, requiredAge - age);
  } else {
    // 条件に合格したら実行を継続
    enterTheSecretDungeon();
  }
  // stdin をクローズする前に1回の data イベントを待つ
  process.stdin.pause();
});


// process.stdin は、一時停止の状態で始まるので、最初に
// resume() を呼び出してから、読み出し始める
process.stdin.resume();

function enterTheSecretDungeon() {
  console.log('Welcome to the program :)');
}

