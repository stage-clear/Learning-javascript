levelDB
=======

__インストール__

```bash
$ npm install level
```

__メソッド__  

|Name|Summary|
|:--|:--|
|batch||
|write||
|put| `db.put(key,value, f(err){})` |
|get| `db.get(key, f(err, value){})` |
|createKeyStream|キーの一覧を取得 |
|createReadStream|キーと値の一覧を取得。opt で検索|

使い方
------

__基本形__

```javascript
// セッティング
let levelup = require('level');
let opt = { valueEncoding: 'json' };
let db = levelup('./testdb', opt);

// 書き込み
db.put('key1', 'value1', (err) => {
  console.log('completed!');
})

// 読み出し
db.get('key1', (err, value) => {
  console.log(`get key1=${value}`);
});
```


__サンプル__  

```javascript
let levelup = require('level');
let opt = { valueEncoding: 'json' };
let db = levelup('./testdb', opt);

// 一括で複数登録
db.batch()
  .put('fruits!apple', {
    name: 'Apple',
    price: 300,
    color: 'red'
  })
  .put('fruits!orange', {
    name: 'Kiwi',
    price: 220,
    color: 'green'
  });
  .write(getKeys);

// key の一覧を取得する
function getKeys() {
  console.log('Keys:');
  db.createKeyStream()
    .on('data', (key) => {
      console.log(' - ' + key);
    })
    .on('end', getKeysAndVlues);
}

// key と value の一覧を取得する
function getKeysAndVlues() {
  console.log('\nKey-value-list');
  db.createReadStream()
    .on('data', (data) => {
      let key = data.key;
      let value = data.value;
      console.log(`+ Key=${key}`);
      console.log(`| color=${value.color}`);
      console.log(`| price=${value.price}`);
    })
    .on('end', search);
}

// key を範囲指定で取得する
function search() {
  console.log('\nrange-search');
  
  let opt = {
    start: 'fruits!',
    end: 'fruits!\xFF'
  }
  
  db.createReadStream(opt)
    .on('data', (data) => {
      console.log(`+ key=${data.key}`);
    })
    .on('end', () => {
      console.log('OK');
    });
}

```


__db.createReadStream()のオプションで日本語を使う場合の注意点__

```javascript
// key がアルファベットだけの場合
let opt = {
  start: 'key:',
  end: 'key:\xFF'
};

// 日本語のキーだとうまくいかないので以下のように指定する
let opt =  {
  start: '夏目漱石',
  end: '夏目漱石\uFFFF'
};
```


注意
----

- 仮想環境とホストでの共有はできない


関連イシュー
------------

- [Virtualbox: levelDBのエラー](https://github.com/super-true/Learning-node-js/issues/5)

リンク
------

- [npm/level](https://www.npmjs.com/package/level)
- [level/level](https://github.com/Level/level)
