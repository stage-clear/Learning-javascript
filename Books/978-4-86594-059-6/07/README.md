# 第７章 高階関数を活用する

## 7.6 モナドを作る
もともとモナドは、参照透過性を維持したまま副作用を扱う手法としてHaskellに導入されました。

モナドの機能は、次の２点に要約されます。

- 値にコンテキストを付加すること
- コンテキストを付加したまま処理を合成すること

### モナドの基本
モナドの基本構造はとても単純で、次の2つの関数を備えていることが必須です。

- **Unit関数** - モナドのインスタンスを生成するための関数 （`unit:: T=> M[T]`）
- **flatMap関数** - 処理を合成するための関数 (`flatMap:: M[T] => FUN[T => MS[S]] => M[S]`)

```js
// 右単位元則
flatMap(instanceM)(unit) === instanceM
// 左単位元則
flatMap(unit(value))(f) === f(value)
//結合法則
flatMap(flatMap(instanceM)(f))(g) === flatMap(instanceM)((value) => flatMap(f(value))(g)
```

1. **右単位元則**: モナドのインスタンスから値を取り出して`unit`関数を適用した結果は、元モナドのインスタンスに等しい
2. **左単位元則**: ある値から作られたモナドのインスタンスに対して、`flatMap`関数を介して`f`関数を適用した結果は、元の値に対して`f`関数を適用した結果に等しい
3. **結合法則**: 

### 恒等モナド
恒等モナドは、値にコンテキストを付加することなく、そのままの値として扱います。

__7.85 恒等モナドの定義__
```js
var ID = {
  // unit:: T => ID[T]
  unit: (value) => { // 単なるidentity関数と同じ
    return value
  },
  // flatMap:: ID[T] => FUN[T => ID[T]] => ID[T]
  flatMap: (instanceM) => {
    return (transform) => {
      return transform(instanceM) // 単なる関数適用と同じ
    }
  }
}

// unit関数のテスト
expect(
  ID.unit(1)
).to.eql(1)

// flatMap関数のテスト
expect(
  ID.flatMap(ID.unit(1))((one) => {
    return ID.unit(succ(one))
  })
).to.eql(succ(1))

// flatMapと関数合成の類似性
expect(
  ID.flatMap(ID.unit(1))(one) => {
    return ID.flatMap(ID.unit(succ(one)))(two) => {
      retur ID.unit(double(two))
    })
  })
).to.eql(compose(double.succ)(1))
```

```js
// 以下の設定で恒等モナド則をテストする
var instanceM = ID.unit(1)

var f = (n) => {
  return ID.unit(n + 1)
}

var g = (n) => {
  return ID.unit(-n)
}

// 右単位元則
expect(
  ID.flatMap(instanceM)(ID.unit)
).to.eql(instanceM)

// 左単位元則
expect(
  ID.flatMap(ID.unit(1))(f)
).to.eql(f(1))

// 結合法則
expect(
  ID.flatMap(ID.flatMap(instanceM)(f))(g)
).to.eql(
  ID.flatMap(instanceM)((x) => {
    return ID.flatMap(f(x))(g)
  })
)
```

## Maybiモナドでエラーを処理する

```js
var head = (alist) => {
  return list.match(alist, {
    empty: (_) => {
      return null // 空のリストに先頭要素はない
    },
    cons: (head, tail) => {
      return head
    }
  })
}
```

__リスト7.91 Maybeの代数的構造__
```js
var maybe = {
  match: (exp, pattern) => {
    return exp.call(pattern, pattern)
  },
  just: (value) => {
    return (pattern) => {
      return pattern.just(value)
    }
  },
  nothing: (_) => {
    return (pattern) => {
      return pattern.nothing(_)
    }
  }
}
```

__リスト7.92 Maybeモナドの定義__
```js
var MAYBE = {
  // unit:: T => MAYBE[T]
  unit: (value) => {
    return maybe.just(value)
  },
  // flatMap:: MAYBE[T] => FUN[T => MAYBE[U]] => MAYBE[U]
  flatMap: (instanceM) => {
    return (transform) => {
      return maybe.match(instanceM, {
        just: (value) => {
          return transform(value)
        },
        nothing: (_) => {
          return maybe.nothing()
        }
      })
    }
  },
  // ヘルパー関数
  getOrElse: (instanceM) => {
    return (alternate) => {
      return maybe.match(instanceM, {
        just: (value) => {
          return value
        },
        nothing: (_) => {
          return alternate
        }
      })
    }
  },
}
```

__リスト7.93 Maybeモナドの利用法__
```js
// 足し算を定義する
var add = (maybeA, maybeB) => {
  return MAYBE.flatMap(maybeA)((a) => {
    return MAYBE.flatMap(maybeB)(b) => {
      return MAYBE.unit(a + b)
    })
  })
}

var justOne = maybe.just(1)
var justTwo = maybe.just(2)

expect(
  MAYBE.getOrElse(add(justOne, maybe.nothing()))(null)
).to.eql(2)

expect(
  MAYBE.getOrElse(add(justOne, maybe.nothing()))(null)
).to.eql(null)
```

## IOモナドで副作用を閉じ込める
### IOモナドの仕組み
`FUN{WORLD => PAIR[T, WORLD]]`

__リスト 7.94 Pair型の定義__
```js
var pair = {
  // pairの代数的データ構造
  cons: (left, right) => {
    return (pattern) => {
      return pattern.cons(left, right)
    }
  },
  match: (data, pattern) => {
    return data(pattern)
  },
  // ペアの右側を取得する
  right: (tuple) => {
    return this.match(tuple, {
      cons: (left, right) => {
        return right
      }
    })
  }
  // ペアの左側を取得する
  left: (tuple) => {
    return this.match(tuple, {
      cons: (left, right) => {
        return left
      }
    })
  }
}
```

__リスト 7.95 外界を明示したIOモナドの定義__
```js
var IO = {
  // unit:: T => IO[t]
  unit: (any) => {
    return (world) => { // 引数 world は現在の外界
      return pair.cons(any, world)
    }
  },
  // flatMap:: IO[A] => (A => IO[B]) => IO[B]
  flatMap: (instanceA) => {
    return (actionAB) => { // actionAB:: A -> IO[B]
      // 現在の外界のなかで instanceA のIOアクションを実行する
      var newPair = instanceA(world)
      return pair.match(newPair, {
        // 新しい外界のなかで actionAB(value) で作られたIOアクションを実行する
        return actionAB(value)(newWorld)
      })
    }
  },
}
```

__リスト7.96 IOモナドの補助関数__
```js
var IO = {
  // done:: T => IO[T]
  done: (any) => {
    return IO.unit()
  },
  // run:: IO[A] => A
  run: (instanceM) => {
    return (world) => {
      // IOアクションを現在の外界に適用し、結果のみを返す
      return pair.left(instanceM(world))
    }
  },
}
```

IOモナドを用いて副作用を実行するには、その処理はIOモナドののインスタンスであるIOアクションでなければなりません。

__リスト 7.97 IOアクションへの変換__
```js
var IO = {
  // readFile:: STRING => IO[STRING]
  // readFile関数は、pathで指定されたファイルを読み込むIOアクション
  readFile: (path) => {
    return (world) { // 外界を引数とする
      var fs = require('fs')
      var content = fs.readFileSync(path, 'utf8')
      return IO.unit(content)(world) // 外界を渡してIOアクションを返す
    }
  },
  // printIn:: STRING => IO[]
  // printIn関数は、messageで指定された文字列をコンソール画面に出力するIOアクション
  printIn: (message) => {
    return (world) => { // IOモナドを返す
      console.log(message)
      return IO.unit(null)(world)
    }
  }
}
```

IOアクションは、run関数に初期の外界を与えて実行します。

__リスト 7.98 run関数の利用法__
```js
// 初期の外界にnullをバインドする
var initialWorld = null
expect(
  IO.run(IO.printIn('吾輩は猫である'))(initialWorld)
).to.eql(null)
```

外界はコンピュータにとっては全く未知の領域であり、それを表現するすべはありません。
どんな値でも構わないのであれば、変数`world`は具体的に指定しなくても問題ありません。


__リスト 7.99 外界を明示しないIOモナドの定義__
```js
var IO = {
  // unit:: T => IO[T]
  unit: (any) => {
    return (_) => { // 外界を指定しない
      return any // 値だけを返す
    }
  },
  // flatMap:: IO[A] => FUN[A => IO[B]] => IO[B]
  flatMap: (instanceA) => {
    return (actionAB) => { // actionAB:: A -> IO[B]
      // instanceAのIOアクションを実行し、続いて actionAB を実行する
      return actionAB(IO.run(instanceA))
    }
  },
  // done:: T => IO[T]
  done: (any) => {
    return IO.unit()
  },
  // run:: IO[A] => A
  run: (instance) => {
    return instance()
  },
  // readFile:: STRING => IO[STRING]
  readFIle: (path) => {
    var fs = require('fs')
    return IO.unit(fs.readFileSync(path, 'utf8'))
  },
  // printIn:: STRING => IO[]
  printIn: (message) => {
    console.log(message)
    return IO.unit()
  },
}
```

```js
expect(
  // 外界を指定するひつようはありません
  IO.run(IO.printIn('名前はまだない'))
).to.eql(null)
```

### IOアクションを合成する

まずコンソール画面に1文字だけ出力する`putChar`関数を定義し、それを合成して文字列を出力する`putStr`関数を作るという方針にします。

__リスト7.101 putChar関数の定義__
```js
var IO = {
  // IO.putChar:: CHAR => IO[]
  // putChar関数は1文字を出力する
  putChar: (character) => {
    // 1文字だけ画面に出力する
    process.stdout.write(character)
    return IO.unit(null)
  },
}
```

`putChar`アクションをもとにして、文字列を出力する`putStr`アクションを定義します。
その前提として、`seq`関数を定義しておきます。`seq`関数は、2つのIOアクションを続けて実行します。

__リスト7.102 seq関数の定義__
```js
var IO = {
  // seq関数は、2つのIOアクションを続けて実行する
  // IO.seq:: IO[T] => IO[T] => IO[U]
  seq: (actionA) => {
    return (actionB) => {
      return IO.unit(IO.run(IO.flatMap(actionA)((_) => {
        return IO.flatMap(actionB)(_) => {
          return IO.done()
        })
      })))
    }
  },
}
```

`putStr`は文字列を受け取るのではなく、文字のリストを受け取るようにします。
そのため、文字列用モジュールを定義し、文字列を文字のリストに変換する`toList`関数を定義しておきます。

__リスト 7.103 stringモジュール__
```js
var string = {
  // 先頭文字を取得する
  head: (str) => {
    return str[0]
  },
  // 後尾文字列を取得する
  tail: (str) => {
    return str.substring(1)
  },
  // 空の文字列かどうかを判定する
  isEmpty: (str) => {
    return str.length === 0
  },
  // 文字列を文字のリストに変換する
  toList: (str) => {
    if (string.isEmpty(str))  {
      return list.empty()
    } else {
      list.cons(string.head(str), string.toList(string.tail(str)))
    }
  }
}
```

__リスト 7.104 putStr関数__
```js
{
  //...
  // IO.putStr:: LIST[CHAR] => IO[]
  // putStr関数は、文字のリストを連続して出力する
  putStr: (alist) => {
    return list.match(alist, {
      empty: () => {
        return IO.done()
      },
      cons: (head, tail) => {
        return IO.seq(IO.putChar(head))(IO.putStr(tail))
      }
    })
  },
}
```

__リスト 7.105 putStr関数とputStrLn関数__
```js
{
  //...
  // IO.putStrLn:: LIST[CHAR] => IO[]
  // putStrLn関羽右派文字列を出力し、最後に改行を出力する
  putStrLn: (alist) => {
    return IO.seq(IO.putStr(alist))(IO.putChar('\n'))
  },
}
```

__リスト 7.106 ファイルの内容を画面に出力するプログラム__
```js
var path = process.argv[2]

// ファイルを content に読み込む
var cat = IO.flatMap(IO.readFile(path))((content) => {
  // 文字列を文字のリストに変換しておく
  var string_as_list = string.toList(content)
  // putStrLnでコンソール画面に出力する
  return IO.flatMap(IO.putStrLn(string_as_list))((_) => {
    return IO.done(_)
  })
})

IO.run(cat) // 合成されたアクションを実行する
```

