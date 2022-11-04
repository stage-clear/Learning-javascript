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
function appendAndReadPromise (path: string, data: string): Promise<string> {
  retur nappendPromise(path, data)
    .then(() => readPromise(path))
    .catch(error => console.error(error))
```

このようなことを可能にするPromiseのAPIを設計してみましょう
```ts
class Promise {
}
```

new Promiseは、エグゼキューター（executor）と呼ばれる関数を取ります。Promiseの実装は、1つの引数 -- resolve関数とreject関数 -- を使って、この関数を呼び出します。
```ts
type Executor = {
  resolve: Function,
  reject: Function
} => void

class Promise {
  constructor (f: Executor) {}
}
```

resolveとrejectはどのように動作するのでしょうか？fs.readFileのようなコールバックベースのAPIを、PromiseベースのAPIの中に手動でラップする方法を考えることで、これを説明します。
```ts
import {readFile} from 'fs'

function readFilePromise (path: string): Promise<string> {
  return new Promise((resolve, reject) => {
    readFile(path, (error, result) => {
      if (error) {
        reject(error)
      } else {
        resolve(result)
      }
    })
  })
}
```


安全でない Function 型をより具体的な型に置き換えることで、コードを書き換えましょう
```ts
type Executor<T, E extens Error> = (
  resolve: (result: T) => void,
  reject: (error: E) => void
) => void
```

Promiseを見ただけで、Promiseが何の型になるかを理解できるようになりたいので、Promiseをジェネリックにして、その型パラメータを、コンストラクタ内のExecutor型に渡します。
```ts
class Promise<T, E extends Error> {
  constructor (f: Executor<T, E>) {}
  then<U, F extends Error>(g: (result: T) => Promise<U, F> | U): Promise<U, F>
  catch<U, F extends Error>(g: (error: E) => Promise<U, F> | U): Promise<U, F>
}
```

```ts
let a: () => Promise<string, TypeError> = // ...
let b: (s: string) => Promise<number, never> = // ...
let c: () => Promise<boolean, RangeError> = // ...

a()
  .then(b)
  .catch(e => c()) // bはエラーにならないので、これはaがエラーになった場合のもの
  .then(result => console.info('Done', result))
  .catch(e => console.error('Error', e))
```

エラーを型付けしないことで、Promise型を少しだけ緩くしましょう
```ts
type Excutor<T> = (
  resolve: (result: T) => void,
  reject: (error: unknown) => void
) => void

class Promise<T> { 
  constructor (f: Executor<T>) {}
  then<U> (g: (result: T) => Promise<U> | U) => Promise<U> {
    // ...
  }
  catch<U> (g: (error: unknown) => Promise<U> | U) => Promise<U> {
    // ...
  }
}
```

Promiseの実装は、正しく記述することが難しいことで有名です。--もし意欲と暇があれば、[ES2015の仕様](https://262.ecma-international.org/6.0/#sec-promise-objects)にアクセスして、Promiseのステートマシンが内部でどのように動作すべきかについてガイドを参照してください。

## 8.4 asyncとawait

```ts
function getUser () {
  getUserID(18)
    .then(user => getLocation(uesr))
    .then(location => console.info('got location', location))
    .catch(error => console.error(error))
    .finally(() => console.info('done gettting location'))
}
```

このコードを async と await に変換するために、まず async 関数の中に置き、次に await を使ってプロミスの結果を待ちます。

```ts
async function getUser () {
  try {
    let user = await getUserID(18)
    let location = await getLocation(user)
    console.info('get location', user)
  } catch (error) {
    console.error(error)
  } finally {
    console.info('done getting location')
  }
}
```

async と await　についてさらに詳しく知りたければ、[MDNのドキュメント](https://mzl.la/3hd3VLi)を参照してください。

## 8.5 非同期ストリーム

