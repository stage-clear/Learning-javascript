
var memdb = require('..');
var assert = require('assert');

// memdb の機能を記述
describe('memdb', function() {

  beforeEach('memdb', function() {
    // テストをステートレスにしておくため、個々のテストケースを実行する前に
    // データベースをクリアする
    memdb.clear();
  });


  // .save() メソッドの機能を記述
  describe('.save(doc)', function() {
    // 期待される振る舞いを記述
    it('should save the document', function(done) {
      var pet = { name: 'Tobi' };
      memdb.save(pet);
      var ret = memdb.first({ name: 'Tobi' });
      // pet が見つかったことを確認
      assert(ret == pet);

      // このテストケースが完了したことを Mocha に知らせる
      done();
    });
  });


  describe('.first(obj)', function() {
    it('should return the first matching doc', function() {
      var tobi = { name: 'Tobi'}; // 2つの doc を保存
      var loki = { name: 'Loki'};

      memdb.save(tobi);
      memdb.save(loki);

      // それぞれ正しく返されることを確認
      var ret = memdb.first({ name: 'Tobi'});
      assert(ret == tobi);

      var ret = memdb.first({ name: 'Loki'});
      assert(ret == loki);
    });


    // .first() に対する第2の期待
    // 一致する doc がなければ null を返す
    it('should return null when no doc matches', function() {
      var ret = memdb.first({ name: 'Manny'});
      assert(ret == null);
    });
  });
});



