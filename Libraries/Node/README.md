# Learning Node.js

## Menu
- [Introduction to modules](modules/README.md)
- [Snippets](snippets/README.md)
- [Read the books](https://github.com/stage-clear/Learning-javascript/tree/master/Books)
  - [実践Node.jsプログラミング](https://github.com/stage-clear/Learning-javascript/tree/master/Books/978-4-79812-947-1/)
  - [JS+Node.jsによるWebクローラー/ネットエージェント開発テクニック](https://github.com/stage-clear/Learning-javascript/tree/master/Books/978-4-88337-993-4/)
  - [はじめてのNode.js](https://github.com/stage-clear/Learning-javascript/tree/master/Books/978-4-79737-090-4/)


## npm

```bash
# モジュールのインストール
$ npm install MODULE_NAME@version

# モジュールのアンインストール
$ npm uninstall MODULE_NAME

# インストールされているモジュールの一覧（バージョン表記あり）
$ npm list

# npm のアップデート
$ npm update -g npm
```

__オプション__

|Options|Summary|
|:--|:--|
|-g|グローバル|
|--save||
|--save-dev||


__There is not npm on my system!（僕のシステムにはNPMがないぞ！）__

> すでに  Node をインストールしてあるのなら、通常は npm もインストールされているはずだ
> もし見つからなければ次の方法で npm をインストールできる

```bash
$ cd /tmp
$ git clone git://github.com/isaacs/npm.git
$ cd npm 
$ sudo make install

# Check the version
$ npm -v
```

- [NPM vs Yarn Chear Sheet](https://shift.infinite.red/npm-vs-yarn-cheat-sheet-8755b092e5cc)

## References:
- [Node.jsをとりあえず始めるにあたって現実的に必要だった知識](http://qiita.com/nextfactory/items/476c5150268e2c7db4ec)
- [Microsoft/nodejs-guidelines](https://github.com/Microsoft/nodejs-guidelines)


## Links:
- [Node.js](http://nodejs.org/)（[日本語版](http://nodejs.jp/nodejs.org_ja/)）
- [Node.js コアの最新ドキュメント](https://nodejs.org/api/)（[日本語版](http://nodejs.jp/nodejs.org_ja/api/)）
- [Node.js blog](http://blog.nodejs.org/)
- [Node.js job board](http://jobs.nodejs.org/)
- [npm ホームページ（NPM レジストリ）](http://npmjs.org/)
- [npm リポジトリ サーチページ](https://npmjs.org/)
- [Node.green](http://node.green/) - Node.js 各バージョンの ES2015 のサポート状況
