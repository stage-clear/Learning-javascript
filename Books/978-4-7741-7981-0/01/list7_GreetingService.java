package greetingservice;

import greetinmodel.Greeting;

class GreetingService
{
  User user;
  Transfer transfer;
  
  GreetingService ()
  {
    this.user = new User();
    this.transfer = new Transfer();
  }
  
  void greet ()
  {
    Greeting greeting = new Greeting(user.name());
    String message = greeting.message();
    transfer.send(message);
  }
}
