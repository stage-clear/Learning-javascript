
describe('FigureServiceサービスのテスト', function() {
  // FigureService サービスを格納するための変数
  var FigureService;
  
  // モジュールを有効化
  beforeEach(module('myApp.service'));
  
  // FigureService サービスを注入
  beforeEach(inject(function(_FigureService_) {
    FigureService = _FigureService_;
  }));
  
  // triangle メソッドの結果を検証
  it('三角形の面積を求める', function() {
    expect(FigureService.triangle(5, 10)).toEqual(25);
  });
  
  // trapzoid メソッドの結果を検証
  it('台形の面積を求める', function() {
    expect(FigureService.trapezoid(5, 10, 4)).toEqual(30);
  });
})