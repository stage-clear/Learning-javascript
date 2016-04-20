形態素解析
==========

形態素解析とは何か?
------------------

- 自然言語処理の基礎技術のひとつ
- 自然言語で書かれた文章を、単語ごとに分割し、それぞれの品詞を判別する作業


形態素解析を利用する方法
-----------------------

- [ChaSen](http://chasen-legacy.osdn.jp)
- [MeCab](http://taku910.github.io/mecab/)
- [KyTea](http://phontron.com/kytea/index-ja.html)
- [kuromoji - Java 形態素解析器](http://www.atilika.com/ja/products/kuromoji.html)
- [Igo - Java 形態素解析器](http://igo.osdn.jp)


MeCab のインストール
-------------------

__MeCab 本体のインストール__

```bash
$ curl -L -o mecab-0.996.tar.gz 'https://drive.google.com/uc?export=download&id=0B4y35FiV1wh7cENtOXlicTFaRUE'
$ tar zxf mecab-0.996.tar.gz
$ (cd mecab-0.996; ./configure --enable-utf8-only && make && sudo make install)
```

__辞書データのインストール__

```bash
$ wget https://drive.google.com/uc?export=download&id=0B4y35FiV1wh7MWVlSDBCSXZMTXM
$ tar xvf mecab-ipadic-2.7.0-20070801/
$ ./configure --with-charset=utf8
$ make
$ sudo make install
```

### Mac OS X へのインストール

```bash
$ brew install mecab
$ brew install mecab-ipadic
```

__MeCab の実行テスト__

```bash
$ mecab
すもももももももものうち
すもも 名詞,一般,*,*,*,*,すもも,スモモ,スモモ
も 助詞,係助詞,*,*,*,*,も,モ,モ
もも  名詞,一般,*,*,*,*,もも,モモ,モモ
も 助詞,係助詞,*,*,*,*,も,モ,モ
もも  名詞,一般,*,*,*,*,もも,モモ,モモ
の 助詞,連体化,*,*,*,*,の,ノ,ノ
うち  名詞,非自立,副詞可能,*,*,*,うち,ウチ,ウチ
EOS
```


マルコフ連鎖で文章を要約する
------------------------------

__マルコフ連鎖とは__

- 確率過程の一種
- マルコフ性とは、次の状態が過去の状態に依存せず現在の状態のみによって決まる、という性質

__テストプログラム__

1. 文章を単語に分解（形態素解析）する
2. 単語の前後の結びつきを辞書に登録する
3. 辞書を利用してランダムに作文する



簡単な文章構成ツールを作ろう
-----------------------------

__テストプログラム__

- 助詞の「の」の連続
- 長すぎる文章
- 並列助詞「〜したり、〜したり」が対応していない場合
- 同じ接続しが連続で使われている場合
- 「いい訳」と「言い訳」など表記の揺れ
- 「プログラマー」と「プログラマ」など音引の有無の相違


