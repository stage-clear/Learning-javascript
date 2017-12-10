# React + Express dえ掲示板を作ろう

## ここで作る掲示板について
ここで作る掲示板とは, 名前と本文を書き込むだけという, とても簡単な掲示板です.
データの保存には, NeDB を利用します. このNeDB は, Node.js と一緒に使われることの多い NoSQL のデータベース
「MongoDB」のAPIと互換性があり, また, ファイルベースの簡易データベースであるため, 特別なセットアップが不要とういのがメリットです.

## プロジェクトを作成しよう

```bash
# プロジェクトのディレクトリを作成
$ mkdir bbs
$ cd bbs
$ npm init -y
# Express のインストール
$ npm install --save express
# NeDB のインストール
$ npm i --save nedb
# SuperAgent （Ajax）のインストール
$ npm install --save superagent
# Webpack と React をインストール
$ npm i --save react react-dom
$ npm i --save-dev webpack
$ npm i --save-dev babel-loader babel-core
$ npm i --save-dev babel-preset-es2015 babel-preset-react
```
