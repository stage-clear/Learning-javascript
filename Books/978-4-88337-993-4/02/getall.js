console.log('[getall.js] start');

// リンクを解析してダウンロード

var client = require('cheerio-httpcli');
var URL = require('url');
var fs = require('fs');
var path = require('path');

// 階層の指定
var LINK_LEVEL = 3;
var TARGET_URL = 'http://nodejs.jp/nodejs.org_ja/docs/v0.10/api/';
var list = {};

// メイン処理
downloadRec(TARGET_URL, 0);

// 指定のURLを最大レベル level までダウンロード
function downloadRec(url, level) {
  // 最大レベルチェック
  if (level >= LINK_LEVEL) {
    return ;
  }

  // 既出のサイトは無視する
  if (list[url]) return ;
  list[url] = true;

  // 基準ページ以外なら無視する
  var us = TARGET_URL.split('/');
  us.pop();
  var base = us.join('/');
  if (url.indexOf(base) < 0) {
    return ;
  }

  // HTMLを取得する
  client.fetch(url, {}, function(err, $, res) {
    // リンクされているページを取得
    $('a').each(function(idx) {
      // <a> のリンク先を得る
      var href = $(this).attr('href');
      if (!href) return;
      // 絶対パスを相対パスに変更
      href = URL.resolve(url, href);
      // # 以降を無視する
      href = href.replace(/\#.+$/,'');
      downloadRec(href, level + 1);
    });

    // ページを保存(ファイル名を決定する)
    if (url.substr(url.length-1, 1) == '/') {
      // index を自動追加
      url += 'index.html';
    }

    var savepath = url.split('/').slice(2).join('/');
    checkSaveDir(savepath);
    console.log(savepath);
    fs.writeFileSync(savepath, $.html());
  });
}

// 保存先のディレクトリが存在するか確認
function checkSaveDir(fname) {
  // ディレクトリ部分だけを取り出す
  var dir = path.dirname(fname);
  // ディレクトリを再帰的に作成する
  var dirlist = dir.split('/');
  var p = '';
  for (var i in dirlist) {
    p += dirlist[i] + '/';
    if (!fs.existsSync(p)) {
      fs.mkdirSync(p);
    }
  }
}