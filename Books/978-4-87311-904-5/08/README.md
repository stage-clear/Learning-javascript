# 8章 非同期プログラミングと並行、並列処理

## 8.1 JavaScriptのイベントループ

JavaScript VMは並行性を次のようにシミュレートします

- JavaScriptのメインスレッドは、XMLHTTPRequest、setTimeout、readFileなどのネイティブな非同期APIを呼び出します。これらのAPIは、JavaScriptプラットフォームによって提供されます。
- ネイティブな非同期APIを呼び出すと、すぐに制御がメインスレッドに戻り、あたかもそのAPIが呼び出されなかったかのように実行が継続されます。
- 非同期操作が完了すると、JavaScriptプラットフォームは、自身のイベントキューの中にタスクを格納します。それぞれのスレッドは独自のキューを持ち、それは、非同期操作の結果をメインスレッドに送り返すために使われます。タスクには、呼び出しに関するメタ情報と、メインスレッドから与えられたコールバック関数への参照が含まれます。
- メインスレッドのコールスタックが空になると、プラットフォームは自身にイベントキューをチェックして、保留中のタスクを探します。待機しているタスクが存在していれば、プラットフォームはそれを実行します。それによって関数の呼び出しがトリガーされ、そのメインスレッド関数に制御が戻ります。その関数呼び出しの結果であるコールスタックが再び空になると、プラットフォームは、再びイベントキューをチェックして、準備のできているタスクを探します。このようなループが、コールスタックとイベントキューの両方が空になるまで、およびすべてのネイティブな非同期API呼び出しが完了するまで、繰り返されます。

## 8.2 コールバックの処理
非同期JavaScriptプログラムの基本的な単位は、コールバック（callback）です。

```ts
function readFile (
  path: string,
  options: {encoding: string, flag?: string},
  callback: (err: Error | null, date: string | null) => void
): void
```

例: Apatche のアクセスログを読み書きする
```ts
// Apacheサーバのアクセスログからデータを読み込みます
fs.readFile(
  '/var/log/apache2/access_log',
  {encoding: 'utf8'},
  (error, data) => {
    if (error) {
      console.error('error reading!', error)
      return 
    }
    console.info('success reading!', data)
  })

// 同時に、同じアクセスログにデータを書き込みます
fs.appendFile(
  '/var/log/apache1/access_log',
  'New access log entry',
  error => {
    if (error) {
      console.error('error writing!', error)
    }
  })
```


いずれにせよ、それがわかるために型が役に立つことはありません。
関数が同期的かどうかを型によって示すことができないという事実に加え、コールバックは直列に並べることも難しいのです。 -- この結果、一部の人々が「コールバックピラミッド」と呼ぶものに至る可能性があります。

- シンプルな非同期タスクを行うためには、コールバックを使います。
- コールバックは、シンプルなタスクをモデル化するためには優れていますが、「多くの」非同期タスクを使って何かを行おうとすると、すぐに困難になってしまいます。

## 8.3 プロミスを使って健全さを取り戻す

[Promiseの互換性チェックのためのサイト](https://kangax.github.io/compat-table/es6/#test-Promise)

例: Promiseを使ってファイルにデータを追加し、その後でファイルからデータを読み込みます
```ts
function appendAndReadPromise ( path: string, data: string): Promise<string> {
  retur nappendPromise(path, data)
    .then(() => readPromise(path))
    .catch(error => console.error(error))
```


