# 別の TypeScript ファイルを参照
## ファイルを直接参照する
### クラス EmlDOM と DivDOM の定義を別ファイルに
#### 別ファイルにコピー
#### ファイル名を変更
#### ファイルの内容を分ける
#### main.ts から domclass.ts を参照

```ts
///<reference path="domclass.ts"/>

class ButtonDOM extends ElmDOM {
  // main.ts に残した部分
}
```

## モジュールにする
### domclass.ts をモジュール・ファイルにする
#### export キーワードをつける

```ts
// 8-2 document.ts のクラス定義に, キーワード export
export class ElmDOM {
  ...
}

export class DivDOM extends ElmDOM {
  ...
}
```

### main.ts でモジュール・ファイルを読み込む
#### import 宣言をする

```ts
// 8-3 import 宣言
import { ElmDOM, DivDOM } from './domclass'

class ButtonDOM extends ElmDOM {
  // main.ts に残した部分
}
```

### tsconfig.json の編集
#### module オプションが必要

#### outFile オプションは削除

```ts
// 8-4 モジュール・ファイルを書き出す tsconfig.json
{
  "compilerOptions": {
    "module": "amd"
  }
}
```

### require.js の入手
### show.html で JavaScript を読み込む
#### モジュール・ファイルを読む特有の書き方

```html
<script data-main="main.js" src="require.js"></script>
```
