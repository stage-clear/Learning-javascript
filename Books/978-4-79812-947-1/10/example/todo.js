// To-do　リストのモデル

// To-doデータベースの定義
function Todo() {
  this.todos = [];
}

// To-do項目の追加
Todo.prototype.add = function(item) {
  if (!item) throw new Error('Todo#add requires an item');
  this.todos.push(item);
};

// すべての To-do項目を削除
Todo.prototype.deleteAll = function() {
  this.todos = [];
};

// To-doの件数を取得
Todo.prototype.getCount = function() {
  return this.todos.length;
};


// 2秒後に true を返すコールバックを設定
Todo.prototype.doAsync = function(cb) {
  setTimeout(cb, 2000, true);
};


// このモジュールは、Todo関数をエクスポートする
module.exports = Todo;