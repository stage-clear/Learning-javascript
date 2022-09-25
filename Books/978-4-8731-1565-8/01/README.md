# 第1章 理解しやすいコード
> **鍵となる考え**<br>
> コードは理解しやすいくなければいけない

## 1.1 「優れた」コードって何？

## 1.2 読みやすいさの基本定理
**鍵となる考え**<br>
コードは他の人が最短時間で理解できるように書かなければいけない。

# 第２章 名前に情報を詰め込む

> **鍵となる考え**<br>
> 名前に情報を詰め込む。

- 明確な単語を選ぶ
- 汎用的な名前は避ける（あるいは、使う状況を選ぶ）
- 抽象的な名前よりも具体的な名前を使う
- 接尾辞や接頭辞を使って情報を追加する
- 名前の長さを決める
- 名前のフォーマットで情報を伝える

## 2.1 明確な単語を選ぶ
[シソーラス](https://www.collinsdictionary.com/jp/dictionary/english-thesaurus)を使って調べよう。

|単語|代替案|
|:-|:-|
|get|fetch, download,|
|send|deliver, dispatch, announce, distribute, route|
|find|search, extract, locate, recover|
|start|launch, create, begin, open|
|make|create, set up, build, generate, compose, add, new|
|open|show, display, arrive, appear|

> **鍵となる考え**<br>
> 気取った言い回しよりも明確で正確なほうがいい。

## 2.3 抽象的な名前よりも具体的な名前を使う
### 値の単位

|関数の仮引数|単位を追加した仮引数|
|:-|:-|
|`Start(int delay)`|`delay`→`delay_secs`|
|`CreateCache(int size)`|`size`→`size_bb`|
|`ThrottleDownload(float limit)`|`limit`→`max_kbps`|
|`Rotate(float angle)`|`angle`→`degrees_cw`|
|`elapsed`|`elapsed`→`elapsed_ms`|

## その他の重要な属性を追加する
|状況|変数名|改善後|
|:-|:-|:-|
|passwordはプレインテキストなので、処理をする前に暗号化すべきである|`password`|`plaintext_password`|
|ユーザーが入力したcommentは表示する前にエスケープする必要がある|`comment`|`unescaped_comment`|
|htmlの文字コードをUTF-8に変えた|`html`|`html_utf8`|
|入力されたdataをURLエンコードした|`data`|`data_urlenc`|

# 第３章 誤解されない名前
> **鍵となる考え**<br>
> 名前が「他の意味と間違えられることはないだろうか？」と何度も自問自答する。

## 3.1 例: filter()

|名前|代替案|
|:-|:-|
|`filter`|選択するのであれば `select()`、除外するのであれば`exclude()`にしたほうがいい|

## 3.4 範囲を指定するときは `first` と `last` を使う


