// 最初の2つのエントリは使わないので slice で取り除く
var args = process.argv.slice(2);

// 引数群をループ処理して、-h または --help を探す
args.forEach(function(arg) {
  switch(arg) {
    case '-h':
    case '--help':
    printHelp();
    break;
    // 必要なら他のフラグ用の case を、ここに追加
  }
});

// ヘルプのメッセージをプリントアウトして終了
function printHelp() {
  console.log(' usage:');
  console.log(' $ AwsomeProgram <option> <file-to-awsomeify>');
  console.log(' example:');
  console.log(' $ AwsomeProgram --make-awsome not-yet.awsome');
}

