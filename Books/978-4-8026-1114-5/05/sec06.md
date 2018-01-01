# リアルタイムチャットを作ろう
## WebSocket とは？

## ここで作るアプリ - リアルタイムチャット

## プロジェクトを作成しよう

```bash
# プロジェクトのディレクトリを作成
$ mkdir chat
$ cd chat
$ npm init -y
# Express のインストール
$ npm i --save express
# Socket.IO のインストール
$ npm i --save socketio
$ npm i --save socket.io-client
# Webpack と React をインストール
$ npm i --save react react-dom
$ npm i --save-dev webpack babel-loader babel-core
$ npm i --save-dev babel-preset-es2015 babel-preset-react
```

- [chat/webpack.config.js](examples/chat/webpack.config.js)

### プログラムを実行する方法

```bash
$ npm install
```

```bash
# React をビルド
$ npm run build
# サーバーを起動
$ node chat-server.js
```

## WebSocket で通信が始まるまで

## プログラム - チャット・サーバー側
- [chat/chat-server.js](examples/chat/chat-server.js)

## プログラム - チャット・クライアント側
- [chat/index.js](examples/chat/src/index.js)

## SPA実装のポイント

## まとめ
- リアルタイムチャットを作るには, サーバーとクライアント間の双方向通信が必要です
- 双方向通信を行うには, WebSocket の技術が便利です
- Socket.IO モジュールを使うと, WebSocket を簡単に実現できるだけでなく, 
  もしも, WebSocket が利用できない場合に, HTTP による擬似的な双方向通信に切り替えてくれます
