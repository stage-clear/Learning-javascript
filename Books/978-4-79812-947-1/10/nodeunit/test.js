exports.testPony = function(test) {
  test.expect(2);
  if (false) {
    test.ok(false, 'This should not have passed.');
  }

  test.ok(true, 'This should have passed.');
  test.done();
};


/*
exports.testPony = function(test) {
  if (false) {
    // 合格しないはずのテスト
    test.ok(false, 'This should not have passed.');
  } else {
    // 合格するはずのテスト
    test.ok(true, 'This should have passed.');
    test.done();
  }
};
*/