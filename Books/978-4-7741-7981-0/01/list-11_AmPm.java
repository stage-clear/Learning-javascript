package greetingmodel;

class AmPm
{
  private Clock clock;
  
  AmPm ()
  {
    this.clock = new Clock();
  }
  
  String message ()
  {
    String ampm = clock.ampm();
    
    String message = "";
    
    if (ampm.equals("am"))
    {
      message = "おはようございます";
    }
    else if (ampm.equals("pm"))
    {
      message = "こんにちは";
    }
    
    return message;
  }
}
