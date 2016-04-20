describe('ThrowServiceサービスのテスト', function() {
  var ThrowService, $exceptionHandler, $timeout;

  beforeEach(module('myApp.mock.exception'));

  beforeEach(module(function($exceptionHandlerProvider){
    $exceptionHandlerProvider.mode('log');
  }));

  beforeEach(inject(function(_ThrowService_, _$exceptionHandler_, _$timeout_) {
    ThrowService = _ThrowService_;
    $exceptionHandler = _$exceptionHandler_;
    $timeout = _$timeout_;
  }));

  it('例外が発生しないことを確認する', function() { 
    ThrowService.throw(3);
    $timeout.flush();
    expect($exceptionHandler.errors.length).toEqual(0);
  }); 

  it('例外が発生することを確認する', function() {
    ThrowService.throw(6);
    $timeout.flush();
    expect($exceptionHandler.errors.length).toEqual(1);
    expect($exceptionHandler.errors[0].message)
      .toEqual('ThrowService throws error !');
  });
});
