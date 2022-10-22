package hello;

class Launcher
{
  public static void main(String[] args)
  {
    // 実行時に動的に組み立てる
    Service service = new Service();
    service.hello();
  }
}
