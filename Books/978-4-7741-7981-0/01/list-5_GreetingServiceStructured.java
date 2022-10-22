package hello;

import java.util.Calendar;

class GreetingStructured
{
  void greet () 
  {
    String user = username();
    int hour = hour();
    String message = message(hour);
    print(user, message);
  }
  
  // 下請けメソッド郡
  private String username () { ... }
  private int hour () { ... }
  private String message (int hour) { ... }
  private void print (String user, String message) { ... }
}
