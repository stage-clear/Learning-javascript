# 第１章　オブジェクト指向の基本を学ぶ
## オブジェクト指向の発想

### オブジェクト指向は部品指向

- 機能追加は、新しい部品（オブジェクト）の追加を考える
- 修正は、部品の差し替えを考える

こういう発想でソフトウェアを育てていくのがオブジェクト指向の基本の発想です。

### 動的に組み立てる

オブジェクト指向プログラミングはもっと動的です。プログラムをメモリ上で実行する時にオブジェクト（部品）の組み立て方や結びつき方を動的にコントロールします。

### Hello, World!

- [**リスト1 HelloWorld.java**](list-1_HelloWorld.java)
- [**リスト2 Launcher.java**](list-2_Launcher.java)
- [**リスト3 Service.java**](list-3_Service.java)

### もう少しまともな挨拶を
- [**リスト4** 手続き型で書いた例](list-4_GreetingProcedural.java)


#### 手続き型オブジェクト思考の発想の違い
オブジェクト指向では、分割の単位が「手続き」ではなく「オブジェクト」になります。<br>
オブジェクトに分割して、それぞれのオブジェクトに分担してやってもらう、という発想です。

- [**リスト5** リスト4をメソッドに分割して、構造化プログラミングのスタイルで書き直した](list-05_GreetingServiceStructured.java)

### オブジェクトで仕事を分担する
- [**リスト6 Launcher.java**](list-6_Launcher.java)
- [**リスト7 GreetingService.java**](list-7_GreetingService.java)
- [**リスト8 Transfer.java**](list-8_Transfer.java)





