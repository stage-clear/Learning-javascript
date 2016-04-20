# Node のエコシステム

## Node 開発者のためのオンラインリソース

### Node とモジュールのリファレンス

- [Node.js](http://nodejs.org/)（[日本語版](http://nodejs.jp/nodejs.org_ja/)）
- [Node.js コアの最新ドキュメント](http://node.js.org/api/)（[日本語版](http://nodejs.jp/nodejs.org_ja/api/)）
- [Node.js blog](http://blog.nodejs.org/)
- [Node.js job board](http://jobs.nodejs.org/)
- [npm ホームページ(NPM レジストリ)](http://npmjs.org/)
- [npm リポジトリ サーチページ](https://npmjs.org/)


### Google グループ

### IRC

### GitHub イシュー

## GitHub

### GitHub を使い始める

- [ヘルプページ](https://help.github.com/articles/set-up-git)

__GitのコンフィギュレーションとGitHubへの登録__

Git ツールのコンフィギュレーションを行う

```bash
$ git config --global user.name 'Bob Dobbs'
$ git config --global user.email subgenius@example.com
```

次に GitHub の Web サイトで登録を行う

__GitHubに公開鍵を提供する__

1. ブラウザで [https://github.com/setting/ssh](https://github.com/setting/ssh) を訪問
2. [Add SSH Key] ボタンをクリック

### GitHub にプロジェクトを追加する

__GitHubリポジトリを作る__

1. ブラウザで、[https://github.com](https://github.com) にログインする
2. [https://github.com/new](https://github.com/new) を訪問する
3. フォームに内容を記述し、[Create Repository] ボタンをクリック
4. Git を使って、あなたのコードを GitHub にプッシュする

__空の Git ディレクトリをセットアップする__

```bash
# プロジェクトのための一時的なディレクトリを作る
$ mkdir -p ~/tmp/node-elf
cd ~/tmp/node-elf

# このディクレトリを Git リポジトリとしてつかう
git init
```

__Git リポジトリにファイルを追加する__

```bash
# 追加/変更するファイルをステージングに追加
$ git add index.js

# リポジトリ内に、新しいリビジョンを作る
$ git commit -m "Added URL shotening functionality."
```

__Git から GitHub にプッシュする__

```bash
# Git の遠隔リポジトリを追加する
git remove add origin git@github.com:username/project-name.git

# master ブランチに push
git push -u origin master
# -u は、このリモートが upstream であることを Git に知れせる
# upstream として指定したリモートがデフォルトのリモートして使われ
# 次からは短いコマンドを使える
git push
```

このモジュールを別のプロジェクトで使うには次のようにコマンド入力できる
```bash
# 別のプロジェクトのモジュールディレクトリ
mkdir ^/tmp/my_project/node_modules
# このディレクトリに移動
cd ^/tmp/my_project/node_modules
# git clone コマンドを実行
git clone https://github.com/username/peoject-name.git name
# プロジェクトのディレクトリに戻る
cd ../
```

- [Pro Git 日本語版](http://git-scm.com/book/ja/v1)


### GitHub を使って共同作業を行う

```bash
mkdir -p ^/tmp/forktest
cd ~/tmp/forktest
git clone git@github.com:username/module-name.git
cd module-name
echo 'exports.version = " 0.2.2"' >> index.js
git add index.js
git commit -m "Added specification of module version."
git push origin master
```

## npm リポジトリに貢献する

1. パッケージを準備する
2. パッケージ仕様を書く
3. パッケージをテストする
4. パッケージを公開する

### パッケージを準備する

慣用的なパッケージのサブディレクトリ

| dir     | perpose |
|:--------|:--------|
| bin     | コマンドラインスクリプト |
| docs    | ドキュメント |
| exapmle | アプリケーションの使い方を示すサンプル |
| lib     | アプリケーションのコア機能 |
| test    | テストスクリプトと関連リソース |


### パッケージの仕様を書く

[package.json ヘルプ](http://browsenpm.org/package.json)

```json
{
  "name": "name",
  "version": "0.0.1",
  "description": "this is description",
  "author": "username <usename@example.com>",
  "main": "index",
  "engiines": { "node": "0.4.x"}
}
```

```bash
# 包括的なドキュメントの表示
$ npm help json
```

package.json を対話形式でつくる
[ngen](https://www.npmjs.com/package/ngen)


### パッケージのテストと発行

__パッケージのインストールをテストする__

モジュールのルートディレクトリから npm の link コマンドを使うことでグローバルにリンクされる

```bash
$ sudo npm link
```

インストールする
```bash
npm link elf
```

パッケージをインストールしたらそのモジュールを要請する簡単なテストを行う
```bash
# REPL で require を実行する
$ node
> require('elf');
{
  ..
}
```

パッケージをインストールするテストが成功し、開発が終了したら npm の unlink をモジュールのルートディレクトリから使う

```bash
sudo npm unlink
```

__npm のユーザーの追加__

```bash
$ npm adduser
```

__npm リポジトリに発行する__

```bash
$ npm publish

# 確認
$ npm view module-name description
```
