package greetingmodel;

enum MessageType
{
  am("おはようございます");
  pm("こんにちは");
  
  private String message;
  
  MessageType (String message)
  {
    this.message = message;
  }
  
  String message ()
  {
    return message;
  }
}
