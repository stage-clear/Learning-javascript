# 開発環境準備

## テキストエディター派？統合開発環境派？

### Visual Studio for Mac は統合開発環境か？

## テキストエディター Visual Studio Code を使用する開発環境

### Visual Studio Code のダウンロードとインストール

> [Visual Studio Code](https://code.visualstudio.com/)

### Node.js と npm のダウンロードとインストール

> [Node.js](https://nodejs.org)

```bash
$ node -v
$ npm -v
```

### TypeScript のダウンロードとインストール

```bash
# Windows: TypeScript をインストールするコマンド
$ npm install -g typescript
```

```bash
# Mac OS・Linux(Ubuntu): TypeScript をインストールするコマンド例
$ sudo npm install -g typescript
```

```bash
# インストールされている TypeScript のバージョンを確認するコマンド
$ tsc -v
```

### Web サーバーのインストール

http-server は, Windows のコマンドプロンプト, あるいは Mac OS や Linux のターミナルで
起動すると, 起動したパス（カレントディレクトリ）を Webサイトとして表示します

```bash
# Windows: http-server をインストールするコマンド
$ npm install -g http-server
```

```bash
# Mac OS・Linux(Ubuntu): 管理者権限で http-server をインストールするコマンド例
$ sudo npm install -g http-server
```

### Git のダウンロードとインストール

```bash
# インストールされている Git のバージョンを確認するコマンド
$ git --version
```

> [Git - Downloads](https://git-scm.com/downloads)

### Git のデフォルトユーザー名とメールアドレスを設定

```bash
$ git config --global user.name "moe yamada"
$ git config --global user.email "moe.yamada@example.com"
```

> [git-credential-cache - Helper](https://git-scm.com/docs/git-credential-cache)

```bash
# 視覚情報を3600秒キャッシュするコマンド例
$ git config credential.helper 'cache --timeout=3600'
```

### ブラウザーとデバッガー拡張機能のインストール

- Debugger for Chrome

## 統合開発環境 Visual Studio 2017 を使用する開発環境
### Visual Studio 2017 のダウンロードとインストール

> [Visual Studio のWebサイト](https://www.visualstudio.com/ja/vs/)

### インストールする機能の選択
TypeScript 開発では [ASP.NET と Web開発] と [Node.js 開発]

### Visual Studio IDE 起動と拡張機能のアップデート

### Node.js のインストール

## 開発に使用するクラウドサービス

## GitHub へのサインアップ

> [GitHub](https://github.com/)

### リポジトリの作成

### Visual Studio Code で GitHub のリポジトリをクローンする

1. `shift` + `command` + `p`
2. `git clone` と入力して `Enter`
3. Git のリポジトリのURLを入力し, `Enter`
4. フォルダを入力
5. `Enter` キーを押すとリポジトリがクローンされます

### Visual Studio Code で GitHub に同期

### Visual Studio 2017 で GitHub のリポジトリをクローンする

### Visual Studio 2017 で GitHub に同期

## Microsoft アカウント
### Microsoft アカウントの取得

## Visual Studio Team Services
### Visual Studio Team Services アカウントの登録

### Visual Studio Code で VSTS のリポジトリをクローンする

### Visual Studio 2017 で開く（チームプロジェクトに接続）

## Microsoft Azure
### Azure のサインアップ

