# React Native でスマホアプリを作ってみよう（Android編）
## React と React Native の違い
根本的な違いとして, React Native は Webブラウザ向けのHTML5で実装するわけではありません.
React Native では, スマートフォンの性能を考慮し, OSネイティブで用意されているパーツを利用してUIを構築するようになっています.

> **React Native で作られたアプリの一覧（React Native > showcase）**<br>
> [https://facebook.github.io/react-native/showcase.html](https://facebook.github.io/react-native/showcase.html)

## Android の開発環境のセットアップ
### 手順(1) Android Studio と SDK をインストール

> **Android Studio**<br>
> [https://developer.android.com/studio/index.html](https://developer.android.com/studio/index.html)

### 手順(2) 環境変数に ANDROID_HOME を登録

**macOS の場合**<br>
macOS では `~/.bashrc` に, 以下の一行を追記します. `=` より右側の部分に, 実際に Android SDK がインストールされているパスを指定します.

```bash
# export ANDROID_HOME=(実際のパス)
export ANDROID_HOME=/Users/ユーザー名/Library/Android/sdk
```

**Windows の場合**<br>
Windows では「コントロールパネル > システムとセキュリティ > システム > システムの詳細設定 > 環境変数」で環境変数を表示して、ANDROID_HOME を設定します

### 手順(3) Android 6.0(API 23)以上をインストール
React Native では, **Android 6.0（API 23）**以上のSDKをインストールしておく必要があります.<br>
もし, SDKがインストールされていない, あるいは古いバージョンならば,
SDK Manager の画面で, Android 6.0(API 23)以上のSDKを選んでインストールしておきましょう.

### 手順(4) Android の実行環境を準備しよう
もし, Android 実機を持っていない場合は, AVD manager を使って, Android エミュレータを作成します.
Android Studio の AVD Manager はメニューから「Tools > Android > AVD Manager」で起動できます.<br>
Android 実機を使う場合は, Android の開発者メニューを有効にします.

> Android の設定アプリを開いて「端末情報 > ソフトウェア情報」とタップし, 表示された「ビルド番号」を7回連続でタップします.
> すると, 設定アプリに「開発者向けオプション」という項目が表示されます<br>
> 開発者オプションを ON にし, USBデバッグをオンにしてから, USBでAndroid実機とPCを接続します.

### 手順(5) Android 実機とPCで通信を行うよう設定
USB で PC と Android 実機をつないだ後, デバッグができるように, 次のコマンドを実行しましょう.<br>
<sup>adb とは, Android Debug Bridge の略であり, PC から Android端末を操作するためのコマンドラインツールです</sup><br>
<sup>adb は先ほど指定した環境変数 ANDROID_HOME のパス以下, platform-tools にあります</sup>

```bash
$ adb reverse tcp:8081 tcp:8081
```

### 手順(6) ReactNative をインストールしよう
macOS では, Homebrew を利用して, Node.js と watchman をインストールしておく必要があります

```bash
$ brew install watchman
```

Windows では, Python2 と JDK のインストールが必要になります.

> **Chocolatey**<br>
> [https://chocolatey.org/](https://chocolatey.org/)

```bash
> choco install nodejs.install
> choco install python2
> choco install jdk8
```

そして, 次のコマンドを実行して, React Native をインストールしましょう

```bash
$ npm install -g react-native-cli
```

続いて, プロジェクトを作成しましょう

```bash
$ react-native init TestNative
$ cd TestNative
```

そして, 次のコマンドを実行して ReactNative のサンプルを実行しましょう

```bash
$ react-native run-android
```

### 手順(7) Wi-Fi経由でリモートデバッグできるようにしよう
最初のアプリインストールは, USB経由で実行するしかありませんが, 2回目以降は, Wi-Fi経由でデバッグすることができます.<br>
Android端末をシェイクするとメニューが表示されるので, そのメニューから「Dev Settings > Debug server host & port for device」を
タップし, そこに, デバッグしているPCのIPアドレスを指定し, サイドメニューから「Reload」をタップします.

## プログラムを書き換えてみよう
React Native のメインプログラムは, プロジェクトのディレクトリにある「index.android.js」です.

- [TestNative/index.android.js](examples/TestNative/index.android.js)

スタイルシートは, HTMLのCSSに似た名前のものもありますが, 異なるものも多くあります.
そのため, 実際にどんな要素を指定できるかは, ReactNative のマニュアルを参照する必要があります.

## アプリを配布しよう
Android アプリを配布するには, 生成したAPKファイルを, Google Play に登録するか, Web にアップロードするだけです.
ただし, Web にアップロードされている APK ファイルをインストールするには, Android 側の設定アプリから「セキュリティ > 提供元不明のアプリ」を
オンにしておく必要があります

### 鍵ファイルを作成する
署名を行うために, keytool を利用して鍵ファイルを作成します.
keytool は, 以下のパスにあります.

> [Windows] C:¥Program Files¥Java¥jdk****¥bin<br>
> [macOS] /usr/bin/keytool

次に挙げるコマンドを実行して鍵ファイルを作成します.
コマンドを実行すると, パスワードの入力を求められますので, パスワードを決めて入力します

```bash
$ keytool -genkey -v -keystorre my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
キーストアのパスワードを入力してください: **** ← パスワードを入力
新規パスワードを再入力してください: **** ← 再度, 同じパスワードを入力
... ← その後, 数回 Enter キーを押す
[my-release-key.keystore を格納中]
```

「my-release-key.keystore」という鍵ファイルが作成されます.
そこで, この鍵ファイルを, プロジェクトの `android/app` ディレクトリにコピーします.<br>
続いて, Android のビルドコマンドの Gradle の設定を行います.
パソコンのホームディレクトリ「~/.gradle/gradle.properties」をテキストエディタで作成します.<br>
内容はつぎのようにします（****の部分は, 先ほど指定したパスワードに置き換えてください）

```txt
MYAPP_RELEASE_STORE_FILE=my-release-key.keystore
MYAPP_RELEASE_KEY_ALIAS=my-key-alias
MYAPP_RELEASE_STORE_PASSWORD=****
MYAPP_RELEASE_KEY_PASSWORD=****
```

### gradle の設定を書き換える
続いて, `android/app/build.gradle` ファイルを書き換えましょう

```txt
...
android {
  ...
  defaultConfig { ... }
  /* 以下を追加 */
  signingConfigs {
    release {
      if (project.hasProperty('MYAPP_RELEASE_STORE_FILE')) {
        storeFile file(MYAPP_RELEASE_STORE_FILE)
        storePassword MYAPP_RELEASE_STORE_PASSWORD
        keyAlias MYAPP_RELEASE_KEY_ALIAS
        keyPassword MYAPP_RELEASE_KEY_PASSWORD
      }
    }
  }
  buildTypes {
    release {
      ...
      signingConfig signingConfigs.release /* この行を追加 */
    }
  }
}
```

APIファイルを生成するために, 次のコマンドを実行します.

```bash
$ cd android && ./gradlew assembleRealease
```

すると「（プロジェクトルート）/android/app/build/outputs/apk/app-debug.apk」に, APKファイルが生成されます.<br>
また, Android 実機で, 完成したアプリをテストするには, 以下のようにします.
このとき以前インストールしたアプリは一度アンインストールしておく必要があります.
これは鍵ファイルが変更されたため, 同名のアプリをインストールできないからです.

```bash
$ react-native run-android --variant=release
```

### 実機開発のメモ

## まとめ
- React Native を使うと, iOS と Android 双方に対応したスマホアプリを作ることが可能です
- React Native を使えば, React の作法でスマホアプリの開発ができます
- 各 OS のネイティブコンポーネントを利用できるので, 高速に動作します
