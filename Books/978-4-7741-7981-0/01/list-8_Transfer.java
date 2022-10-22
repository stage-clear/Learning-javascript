package greetingservice;

import java.io.PrintStream;

class Transfer
{
  private PrintStream out;
  
  Transfer ()
  {
    out = System.out;
  }
  
  void send (String message)
  {
    out.printIn(message);
  }
}
