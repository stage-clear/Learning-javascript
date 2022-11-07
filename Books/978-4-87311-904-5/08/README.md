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
非同期ストリームをモデル化する方法はいくつかあり、最も一般的なのはイベントエミッターを利用すること、またはRxJSのようなリアクティブプログラミングライブラリーを利用することです。

### 8.5.1 イベントエミッター
高いレベルでは、イベントエミッターは、チャネル上でのイベントの発行（emit）と、そのチャネル上のイベントに対するリッスン（listen）をサポートするAPIを提供します。

```ts
interface Emitter {
  // イベントを送信します
  emit (channel: string, value: unknown): void
  
  // イベントが送信されたときに何かを行います
  on (channel: string, f: (value: unknown) => void): void
}
```

たとえば、NodeRedisクライアントを使用していると仮定します。
```ts
import redis from 'redis'

// Redisクライアントの新しいインスタンスを作成します
let client = redis.createClient()

// クライアントによって発行されるイベントをリッスンします
client.on('ready', () => console.info('Client is ready'))
client.on('error', e => console.error('An error occurred', e))
client.on('reconnecting', params => console.info('Reconnecting...', params))
```

Redisライブラリを使用するプログラマとして私たちが知りたいのは、on というAPIを使用するときにコールバックの中ででのような型の引数が期待されるかです。

```ts
type RedisClient = { 
  on (event: 'ready', f: () => void): void
  on (event: 'error', f: (e: Error) => void): void
  on (event: 'reconnecting', f: (params: {attempt: number, delay: number}) => void): void
}
```
これは非常にうまく動作しますが、少し冗長です。マップ型に基づいて、これを表現してみましょう

```ts
type Events = {
  ready: void
  error: Error
  reconnecting: {attempt: number, delay: number}
}

type RedicClient = {
  on<E extends keyof Events> (
    event: E,
    f: (arg: Events[E]) => void
  ): void,
  emit<E extends keyof Events> (
    evnet: E,
    arg: Events[E]
  ): void
}
```

## 8.6 型安全なマルチスレッディング
### 8.6.1 Web Worker（ブラウザ）
ブラウザのコードは特に安全でなければならず、ブラウザをクラッシュさせたり貧弱なユーザーエクスペリエンスを引き起こしたりする可能性を最小限に抑えなければならないので、
メインスレッドとWeb Workerの間、およびWeb Workerと別のWeb　Workerの間で通信するための主要な方法は、メッセージパッシングを利用することです。

```ts
// MainThread.ts
let worker = new Worker('WorkerScript.js')

worker.postMessage('some data')

// WorkerScript.ts
onmessage = e =>
  console.log(e.data)
```

```ts
// MainThread.ts
let worker = new Worker('WorkerScript.js')

worker.onmessage = e => {
  console.log(e.data)
}

// WorkerScript.ts
onmessage = e => {
  console.log(e.data)
  postMessage(`Ack: "${e.data}"`)
}
```

これを型付けしていきます。
メインスレッドはWorkerスレッドにCommandsを送信し、WorkerスレッドはメインスレッドにEventsを送り返します。

```ts
// MainThred.ts
type Message = string
type ThreadID = number
type UserID = number
type Participants = UserID[]

type Commands = {
  sendMessageToThread: [ThreadID, Message]
  createThread: [Participants]
  addUserToThread: [ThreadID, UserID]
  removeUserFromThread: [ThreadID, UserID]
}

type Events = {
  receivedMessage: [ThreadID, UserID, Message]
  createdThread: [ThreadID, Participants]
  addedUserToThread: [ThreadID, UserID]
  removedUserFromThread: [ThreadID, UserID]
}
```

```ts
// WorkerScript.ts
type Command = {
  | {type: 'sendMessageToThread', data: [ThreadID, Message]}
  | {type: 'createThread', data: [Participants]}
  | {type: 'addUserToThread', data: [ThreadID, UserID]}
  | {type: 'removeUserFromThread', data: [ThreadID, UserID]}

onmessage = e =>
  processCommandFromMainThread(e.data)

function processCommandFromMainThread(
  command: Command
) {
 switch (command.type) {
   case 'sendMessageToThread':
     let [threadID, message] = command.data
     console.log(message)
   // ...
 }
 ```
 
 Web Workerの独特なAPIを、馴染み深いEventEmitterベースのAPIでラップして抽象化しましょう。
 ```ts
 import {EventEmitter} from 'events'
 
 interface SafeEmitter<
   Events extends Record<PropertyKey, unknown[]> ❶
> {
  emit<K extends keyof Events> ( ❷
    channel: K,
    ...data: Events[K]
  ): boolean
  on<K extends keyof Events> ( ❸
    channel: K,
    listener: (...data: Events[K]) => void
  ): this
  on(
    channel: never,
    listener: (...data: unknown[]) => void
  ): this
}

// ❶ SafeEmitterはジェネリック型Eventsと、PropertyKeyからパラメータリストへのRecordマッピングを宣言します。
//    PropertyKeyは、有効なオブジェクトキー（string, number, symbol）に対するTypeScriptの組み込み型です。
// ❷ emitは、channelのほかに、Events型で定義したパラメータのリストに対応する引数を取ります。
// ❸ 同様に、onはchannelとlistenerを取ります。listenerは、Events型で定義したパラメータのリストに対応する任意の数の引数を取ります
// ❹ EventsEmitterのインスタンスがこのインターフェースに割り当て可能になるためには、SefeEmitterの各メソッドが
//    EventEmitterの該当するメソッドのスーパータイプになっていなければなりません。これを実現するために、onのオーバーロードを追加します。
//    オーバーロードされたonのlistenerはどんなパラメータも許容します。（...args: unknown[]）が
//    channelの型をneverと宣言しているためこの型のメソッドを実際に実行することはできません。
```

SafeEmitterを使うと、リッスンするレイヤーを安全に実装するために必要なボイラープレートを大幅に削減できます。
```ts
// WorkerScript.ts
type Commands = {
  sendMEssageToThread: [ThreadID, Message]
  createThread: [Participants]
  addUserToThread: [ThreadID, UserID]
  removeUserFromThread: [ThreadID,UserID]
}

type Events = {
  receivedMessage: [ThreadID, UserID, Message]
  createdThread: [ThreadID, Participants]
  addedUserToThread: [ThreadID, UserID]
  removedUserFromThread: [ThreadID, UserID]
}

// メインスレッドから送られてくるイベントをリッスンします
let commandEmitter: SafeEmitter<Commands> = new EventEmitter()

// メインスレッドに対してイベントを発行します
let eventEmitter: SafeEmitter<Events> = new EventEmitter()

// 型安全なイベントエミッターを使って,
// メインスレッドからの入力コマンドをラップします
onmessage = command => 
  commandEmitter.emit(
    command.data.type,
    ...command.data.data
  )

// Workerによってはっこうされたイベントをリッスンし、それらをメインスレッドに送信します
eventEmitter.on('receivedMessage', data =>
  postMessage({type: 'receivedMessage', data)
)
eventEmitter.on('createdThred', data =>
  postMessage({type: 'createdThread', data)
)

// その他のイベントも同様

// メインスレッドからのsendMEssageToTHreadコマンドに応答します
commandEmitter.on('sendMessageToThread', (thradID, message) =>
  console.log(`OK, I will send a message to threadID ${thradID}`)
)

// メインスレッドにイベントを送り返します
eventEmitter.emit('createdThread', 123, [456, 789])
```
反対側では、こちらも
EventEmitterベースのAPIを使って、メインスレッドからWorkerスレッドへコマンドを送り返すことができます。

```ts
// MainThread.ts
type Commands = {
  sendMessageToThread: [ThreadID, Message]
  createThread: [Participants]
  addUserToThrad: [ThreadID, UserID]
  removeUserFromThread: [ThreadID, userID]
}

type Events = {
   receivedMessage: [ThreadID, userID, Message]
   createdThread: [ThreadID, Participants]
   addedUserToThread: [ThreadID, UserID]
   removedUserFromThread : [ThreadID, UserID]
 }
 
 let commandEmitter: SafeEmitter<Commands> = new EventEmitter()
 let eventEmitter: SafeEmitter<Events> = new EventEmitter()
 
 let worker = new Worker('WorkerScript.js')
 
 // Workerから送られてくるイベントをリッスンし、
 // 型安全なイベントエミッターを使って、それらを再発行します
 worker.onmessage = event =>
   eventEmitter.emit(
     event.data.type,
     ...event.data.data
   )

// このスレッドによって発行されるコマンドをリッスンし、それらをWorkerに送信します
commandEmitter.on('sendMessageToThread', data => 
  worker.postMessage({type: 'sendMessageToThread', data})
)
commandEmitter.on('createThread', data =>
  worker.postMessage({type: 'createThread', data)
)
// その他のコマンドも同様

// 新しいスレッドが作成されたことをWorkerが知らせてきたときに、何かを行います
eventEmitter.on('createdThread', (threadID, participatns) =>
  console.log('Created a new chat thread!', threadID, participants)
)

// コマンドをWorkerに送信します
commandEmitter.emit('createThread', [123, 456])
```

#### 8.6.1.1 型安全なプロトコル
簡単な呼び出し・応答プロトコルを作成してみましょう。<br>
安全でない操作（片づけされていないメッセージをWorkerとの間で送受信すること）を安全な操作でラップし、適切に型付けされたAPIを利用者に公開することが、この目的です。

```ts
type Matrix = number[][]

type MatrixProtocol = {
  determinant: {
    in: [Matrix]
    out: number
  }
  'dot-product': {
    in: [Matrix, Matrix]
    out: Matrix
  }
  invert: {
    in: [Matrix]
    out: Matrix
  }
}

type Protocol = {
  [command: string]: {
    in: unknown[],
    out: unknown
  }
}

function createProtocol<P extends Protocol> (script: string) {
  return <K extends keyof P> (command: K) =>
    (...args: P[K]['in']) => 
      new Promise<P[K]['out']>((resolve, reject) => {
        let worker = new Worker(script)
        worker.onerror = reject
        worker.onmessage = event => resolve(event.data)
        worker.postMessage({command: args})
      })
}
```

### 8.6.2 子プロセス（Node.js）

```ts
// MainThread.ts
import {fork} from 'child_process'

let child = fork('./ChildThread.js')

child.on('message', data =>
  console.info('Child process sent a message', data)
}

child.send({type: 'syn', data: [3]})
```

```ts
// ChildThread.ts
process.on('message', data =>
  console.info('Parent process setn a message', data)
}

process.send({type: 'ack', data: [3]})
```

## 8.7 まとめ














