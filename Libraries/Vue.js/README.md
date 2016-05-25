# Vue.js

## サンプルコード

- [Vue.extend](https://jsfiddle.net/stageclear/ek69zqs4/) 

### はじめに
- [Hello world](https://jsfiddle.net/stageclear/g2vfwbxu/)
- [双方向バインディング](https://jsfiddle.net/stageclear/waaja5oa/) - Two-way バインディング
- [リストレンダリング](https://jsfiddle.net/stageclear/aoa4otfL/)
- [ユーザー入力のハンドリング](https://jsfiddle.net/stageclear/d8uttrs2/)
- [All Together now](https://jsfiddle.net/stageclear/ajyy9tkm/) - Todo アプリ

### 算出プロパティ
- [基本の例](https://jsfiddle.net/stageclear/qsfvLdv2/)
- [算出プロパティ 対 $watch](https://jsfiddle.net/stageclear/x4nj6g4e/)
- [算出 Setter 関数](https://jsfiddle.net/stageclear/djphvken/)

### クラスとスタイルのバインディング
#### バンディングHTMLクラス
- [オブジェクト構文](https://jsfiddle.net/stageclear/doy3u0n9/) - 
- [配列構文](https://jsfiddle.net/stageclear/p7p3p5vm/)

#### バインディングインラインスタイル
- [オブジェクト構文](https://jsfiddle.net/stageclear/cgLep793/)
- [配列構文](https://jsfiddle.net/stageclear/h6fbgpv4/)


### コンポーネント
#### [コンポーネントの利用](https://jp.vuejs.org/guide/components.html#コンポーネントの使用)
- [Vue.component](https://jsfiddle.net/stageclear/p8mdpjn4/) - 登録
- [Vue.component](https://jsfiddle.net/stageclear/p18w6ym5/) - ローカル登録
- [Vue.component](https://jsfiddle.net/stageclear/co3vk3nL/) - 簡単な登録
- [Vue.component](https://jsfiddle.net/stageclear/97e82f28/) - コンポーネントオプションの注意事項

#### [Props](https://jp.vuejs.org/guide/components.html#Props)
- [Vue.component](https://jsfiddle.net/stageclear/y4jghj2f/) - Props によるデータの伝達
- [Vue.component](https://jsfiddle.net/stageclear/nprzg7wz/) - キャメルケース対ケバブケース
- [Vue.component](https://jsfiddle.net/stageclear/p9017xLo/) - 動的な Props
- [Vue.component](https://jsfiddle.net/stageclear/L3mudtg6/) - リテラル 対 動的
- [Vue.component](https://jsfiddle.net/stageclear/cf96u9am/) - Prop バインディングタイプ
- [Vue.component](https://jsfiddle.net/stageclear/1qtmb5bc/) - Prop 検証

#### [親子間の通信](https://jp.vuejs.org/guide/components.html#親子間の通信)
- Vue.component - 親のチェーン [❓](https://jp.vuejs.org/guide/components.html#親子間の通信)
- [Vue.component](https://jsfiddle.net/stageclear/qug4kc65/) - カスタムイベント
- [Vue.component](https://jsfiddle.net/stageclear/4mxzazj8/) - カスタムイベントに対する v-on
- [Vue.component](https://jsfiddle.net/stageclear/pugeyryr/) - 子コンポーネントの参照 v-ref

#### [スロットによる配信](https://jp.vuejs.org/guide/components.html#スロットによるコンテンツ配信)
- [Vue.component](https://jsfiddle.net/stageclear/bf0aLt8y/) - コンパイルスコープ
- Vue.component - 単一スロット [❓](https://jp.vuejs.org/guide/components.html#単一スロット)
- Vue.component - 名前付きスロット [❓](https://jp.vuejs.org/guide/components.html#名前付きスロット)

#### [動的コンポーネント](https://jp.vuejs.org/guide/components.html#動的コンポーネント)
- [Vue.component](https://jsfiddle.net/stageclear/ovd038a6/)- <component/> (未動作)
- [Vue.component](https://jsfiddle.net/stageclear/b5fz0xa0/) - keep-alive (未動作)
- [Vue.component](https://jsfiddle.net/stageclear/w3yLe2on/) - activate フック (未動作)
- [Vue.component](https://jsfiddle.net/stageclear/ahez5mpa/) - transition-mode

#### [その他](https://jp.vuejs.org/guide/components.html#その他)
- [Vue.component](https://jsfiddle.net/stageclear/cabtgm06/) - コンポーネントと v-for
- [Vue.component](https://jsfiddle.net/stageclear/jp6hhvhw/) - 再利用可能なコンポーネントの著作 (未動作)
- [Vue.component](https://jsfiddle.net/stageclear/uzwws0xk/) - 非同期コンポーネント
- [Vue.component](https://jsfiddle.net/stageclear/38z6ncfo/) - 再帰的なコンポーネント (意図的なエラー)
- [Vue.component](https://jsfiddle.net/stageclear/4rtmag6q/) - フラグメントインスタンス
- [Vue.component](https://jsfiddle.net/stageclear/cb1gex4f/) - インラインテンプレート (未動作?)


### リアクティブの探求

- [Vue.nextTick (1)](https://jsfiddle.net/stageclear/wvL9nvnm/)
- [Vue.nextTick (2)](https://jsfiddle.net/stageclear/noct6nn6/) - (動作未確認)


### カスタムディレクティブ
#### 基本

- [Vue.directive](https://jsfiddle.net/stageclear/7o7wxj3n/) - フック関数
- [Vue.directive](https://jsfiddle.net/stageclear/9zy43rf7/) - ディレクティブインスタンスのプロパティ
- [Vue.directive](https://jsfiddle.net/stageclear/4w8utd2q/) - オブジェクトリテラル
- [Vue.directive](https://jsfiddle.net/stageclear/mcw95fet/) - リテラル修飾子
- [Vue.directive](https://jsfiddle.net/stageclear/vv7mzk8y/) - エレメントディレクティブ

#### 高度なオプション
- [Vue.directive](https://jsfiddle.net/stageclear/bh0dsrLp/) - params
- [Vue.directive](https://jsfiddle.net/stageclear/m0xLg520/) - deep
- [Vue.directive](https://jsfiddle.net/stageclear/c358t1yd/) - twoWay (未動作)
- [Vue.directive](https://jsfiddle.net/stageclear/me8ptgpr/) - acceptStatement

### カスタムフィルタ
- [Vue.filter](https://jsfiddle.net/stageclear/fetjwpzq/) - 基本
- [Vue.filter](https://jsfiddle.net/stageclear/n30pp0zp/) - Two-Way フィルタ
- [Vue.filter](https://jsfiddle.net/stageclear/ytrwdwz1/) - 動的な引数

### ミックスイン
- [Vue.mixin](https://jsfiddle.net/stageclear/4utxqLnd/) - 基本
- [Vue.mixin](https://jsfiddle.net/stageclear/hws6t9pk/) - オプションのマージ
- [Vue.mixin](https://jsfiddle.net/stageclear/yhks2av2/) - グローバルミックスイン
- [Vue.mixin](https://jsfiddle.net/stageclear/2euk4s6v/) - カスタムオプションのマージストラテジ


## CDN

```
https://cdnjs.cloudflare.com/ajax/libs/vue/1.0.24/vue.min.js
<script src="//cdnjs.cloudflare.com/ajax/libs/vue/1.0.24/vue.min.js"></script>
```
