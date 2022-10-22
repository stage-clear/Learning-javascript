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
