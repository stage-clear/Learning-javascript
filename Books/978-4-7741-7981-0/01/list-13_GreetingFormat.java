package greetingmodel;

class GreetingFormat
{
  private String username;
  private String message;
  
  private static final String template = "%sさん、%s。";
  
  greetingFormat (String username, AmPm ampm)
  {
    this.username = username;
    this.message = ampm.message();
  }
  
  String text ()
  {
    return String.format(template, username, message);
  }
}
