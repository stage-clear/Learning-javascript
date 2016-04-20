describe('FigureServiceサービスのテスト', function() {
  var FigureService;

  beforeEach(module('myApp.service'));

  beforeEach(inject(function(_FigureService_){
    FigureService = _FigureService_;
  }));

  it('三角形の面積を求める', function() {
    expect(FigureService.triangle(5, 10)).toEqual(25);
  });

  it('台形の面積を求める', function() {
    expect(FigureService.trapezoid(5, 10, 4)).toEqual(30);
  });

  it('台形の面積を求める', inject(function($log) {
    expect(FigureService.trapezoid(5, 10, 4)).toEqual(30);
    dump($log.info.logs);
    expect($log.assertEmpty).toThrow();
  }));
});
