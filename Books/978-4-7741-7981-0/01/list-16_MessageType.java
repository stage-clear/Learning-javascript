// インターフェース宣言と実装クラス版
package greetingmodel;

enum MessageType 
{
  am(new MessageAm()),
  pm(new MessagePm());
  
  private Message message;
  MessageType (Message message)
  {
    this.message = message;
  }
  
  String message ()
  {
    return message.value();
  }
}
