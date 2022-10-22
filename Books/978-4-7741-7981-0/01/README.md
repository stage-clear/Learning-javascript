# 第１章　オブジェクト指向の基本を学ぶ
## オブジェクト指向の発想
### オブジェクト指向の良さ

### オブジェクト指向は部品指向

- 機能追加は、新しい部品（オブジェクト）の追加を考える
- 修正は、部品の差し替えを考える

こういう発想でソフトウェアを育てていくのがオブジェクト指向の基本の発想です。

### 動的に組み立てる

オブジェクト指向プログラミングはもっと動的です。プログラムをメモリ上で実行する時にオブジェクト（部品）の組み立て方や結びつき方を動的にコントロールします。

## Hello, World!

- [**リスト1 HelloWorld.java**](list-1_HelloWorld.java)
- [**リスト2 Launcher.java**](list-2_Launcher.java)
- [**リスト3 Service.java**](list-3_Service.java)

## もう少しまともな挨拶を
- [**リスト4 GreetingProcedural.java**](list-4_GreetingProcedural.java) 手続き型で書いた例


### 手続き型オブジェクト思考の発想の違い
オブジェクト指向では、分割の単位が「手続き」ではなく「オブジェクト」になります。<br>
オブジェクトに分割して、それぞれのオブジェクトに分担してやってもらう、という発想です。

- [**リスト5 GreetingServiceStructured.java**](list-05_GreetingServiceStructured.java) リスト4をメソッドに分割して、構造化プログラミングのスタイルで書き直した

### オブジェクトで仕事を分担する
- [**リスト6 Launcher.java**](list-6_Launcher.java)
- [**リスト7 GreetingService.java**](list-7_GreetingService.java)
- [**リスト8 Transfer.java**](list-8_Transfer.java)
- [**リスト9 User.java**](list-9_User.java)
- [**リスト10 Greeting.java**](list-10_Greeting.java)
- [**リスト11 AmPm.java**](list-11_AmPm.java)
- [**リスト12 Clock.java**](list-12_Clock.java)
- [**リスト13 GreetingFormat.java**](list-13_GreetingFormat.java)

### LauncherとGreetingServiceの分離
プログラムの軌道と、サービスの実行を別のオブジェクトに分けるのは定石ですね。<br>
プログラムを起動する `main` メソッドや`main`メソッドを持つクラスに、それ以外の仕事を詰め込んではいけません。

### Userオブジェクト

### Transferオブジェクト

### パッケージの分割
`Launcher`、`GreetingService`、`User`、`Transfer`を、「**サービスパッケージ**」にまとめました。<br>
`Greeting`、 `AmPm`、`Clock`、`GreetingFormat`は、「**モデルパッケージ**」にまとめました。<br>
**サービスパッケージ**は、アプリケーションの実行方式や実行環境に依存したコードがいろいろ含まれています（Systemクラスとか）。<br>
**モデルパッケージ**は「挨拶する」という概念モデルをそのまま実装したパッケージです。<br>
<br>
プログラムの実行環境や実行方式に関した変更は、サービスパッケージで行います。

### Greetingオブジェクト

### AmPmオブジェクトとClockオブジェクト

### GreetingFormatオブジェクト

## 小さなオブジェクトで仕事を組み立てる
小さなオブジェクトに単純な仕事を役割分担させるスタイルだと、変更すべき箇所は明確だし、変更が局地的になり、副作用の心配が激減します。

## オブジェクトの作成
オブジェクト指向プログラミングでは、オブジェクトを「誰」が「いつ」作成するかは、重要な設計課題です。

### クラス図の表現、コードの実装
- 実践は、コンストラクタで`new`している
- 破線は、メソッドで`new`している

### 結びつきの強さ



