package greetingservice;

class User
{
  a private String name;
  
  User ()
  {
    name = System.getProperty("user.name");
  }
  
  String name ()
  {
    return name;
  }
}
