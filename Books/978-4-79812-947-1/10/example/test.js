var assert = require('assert');
var Todo = require('./todo');
var todo = new Todo();
var testsCompleted = 0;

function deleteTest() {
  // 削除をテストするため、1件データを追加
  todo.add('Delete Me');
  // データが1件、正しく追加されたことを確認
  assert.equal(todo.getCount(), 1, '1 item should exist.');

  // すべてのレコードを削除する
  todo.deleteAll();
  // 全レコードの削除を確認
  assert.equal(todo.getCount(), 0, 'No item should exist.');
  // テストが完了したことを記録
  testsCompleted++;
}

function addTest() {
  // 既存の項目はすべて削除
  todo.deleteAll();
  // 項目を追加
  todo.add('Added');
  // 項目が存在することを確認
  assert.notEqual(todo.getCount(), 0, '1 item should exist');

  // テストが完了したことを記録
  testsCompleted++;
}


function doAsyncTest(cb) {
  // コールバックは2秒後に呼び出される
  todo.doAsync(function(value) {
    // 真の値が渡されることを確認
    assert.ok(value, 'Callback should be passed true');
    // テストが完了したことを記録
    testsCompleted++;
    // ここまで実行したらコールバックをトリガする
    cb();
  });
}


function throwsTest(cb) {
  // todo.add が引数なしに呼び出されたらエラー
  assert.throws(todo.add, /requires/);
  // テストの完了の記録
  testsCompleted++;
}

deleteTest();
addTest();
throwsTest();
doAsyncTest(function() {
  // 完了を報告
  console.log('Completed ' + testsCompleted + ' tests');
});
