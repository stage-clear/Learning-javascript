package greetingservice;

class Launcher
{
  public static void main (String[] args)
  {
    GreetingService service = new GreetingService();
    service.greet();
  }
}
