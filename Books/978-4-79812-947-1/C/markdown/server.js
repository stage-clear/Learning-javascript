var express = require('express');
var http = require('http');

// マークダウンの実装を要請
var md = require('github-flavored-markdown').parse;
var fs = require('fs');

var app = express();

// このコールバックを .md ファイルにマップ
app.engine('md', function(path, options, fn) {
  console.log(path);
  // ファイルの内容を1個の文字列として読みだす
  fs.readFile(path, 'utf8', function(err, str) {
    // エラーは Express に委譲する
    if (err) return fn(err);
    try {
      // 波括弧の置き換えを実行
      html = html.replace(/\{([^]+)}/g, function(_, name) {
        //デフォルトでは空の文字列('')で置き換える
        return options[name] || '';
      });
      // レンダリングした HTML を Express に渡す
      fn(null, html);
    } catch (err) {
      // 送出されたエラーがあればキャッチ
      fn(err);
    }
  });
});

app.listen(3000);