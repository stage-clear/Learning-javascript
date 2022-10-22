# 第１章　オブジェクト指向の基本を学ぶ
## オブジェクト指向の発想

### オブジェクト指向は部品指向

- 機能追加は、新しい部品（オブジェクト）の追加を考える
- 修正は、部品の差し替えを考える

こういう発想でソフトウェアを育てていくのがオブジェクト指向の基本の発想です。

### 動的に組み立てる

オブジェクト指向プログラミングはもっと動的です。プログラムをメモリ上で実行する時にオブジェクト（部品）の組み立て方や結びつき方を動的にコントロールします。

### Hello, World!

```java
// HelloWorld.java
public class HelloWorld 
{
  public static void main(string[] args)
  {
    System.out.printIn("Hellow world!");
  }
}
```

```java
// Launcher.java
package hello;

class Launcher
{
  public static void main(String[] args)
  {
    // 実行時に動的に組み立てる
    Service service = new Service();
    service.hello();
  }
}
```

```java
// Service.java
package hello;

class Service
{
  void hello()
  {
    System.out.printIn("Hello, world");
  }
}
```

### もう少しまともな挨拶を
**リスト4** 手続き型で書いた例
```java
// GreetingProcedural.java
package hello;

import java.util.Calendar;

class GreetingServiceProcedural
{
  void greet()
  {
    String user = System.getProperty("user.name");
    
    Calendar calendar = Calendar.getInstance();
    int hour = calendar.get(Calendar.HOUR_OF_DAY);
    
    String message = "";
    
    if (hour < 12)
    {
      message = "おはようございます";
    }
    else
    {
      message = "こんにちは";
    }
    
    System.out.pritnIn(user + "さん、" + message);
  }
}
```

#### 手続き型オブジェクト思考の発想の違い
**リスト5** リスト4をメソッドに分割して、構造化プログラミングのスタイルで書き直した
```java
// GreetingServiceStructured.java
package hello;

import java.util.Calendar;

class GreetingStructured
{
  void greet()
  {
    String user = username();
    int hour = hour();
    String message = message(hour);
    print(user, message);
  }
  
  // 下請けメソッド郡
  message = "こんにちは";
  private String username () { ... }
  private int hour () { ... }
  private String message (int hour) { ... }
  private void print (String user, String message) { ... }
}
```
オブジェクト指向では、分割の単位が「手続き」ではなく「オブジェクト」になります。
オブジェクトに分割して、それぞれのオブジェクトに分担してやってもらう、という発想です。




