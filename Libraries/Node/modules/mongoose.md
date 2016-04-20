Mongoose
========

__インストール__

```bash
$ npm install mongoose
```

__接続のオープンとクローズ__

```javascript
var mongoose = require('mongoose');
// オープン
mongoose.connect('mongodb://localhost/tasks');
// クローズ
mongoose.disconnect();
```

__スキーマの登録__

```javascript
var Schema = mongoose.Schema;
var Tasks = new Schema({
  title: String,
  description: String
});
mongoose.model('Task', Tasks);
```

__タスクの追加/Insert__

```javascrtipt
var Task = mongoose.mode('Task');
var task = new Task();
task.title = 'Title1';
task.description = 'This is description.';
task.save(function(err) {
  if (err) throw err;
  console.log('Saved.');
});
```

__ドキュメントの検索__

```javascript
var Task = mongoose.model('Task');
Task.find({
  'title': 'Title1'
}, function(err, tasks) {
  console.log('ID: ' + tasks[i]._id);
  console.log(tasks[i].description);
});
```

__ドキュメントの更新__

```javascript
var Task = mongoose.model('Task');
Task.update(
  {_id: '55d2b48b4c2215ad079075e9'}, // 内部IDを使って更新する
  {description: 'That is description.'},
  {multi: false},
  function(err, rows_updated) {
    if (err) throw err;
    console.log('Updated.');
  }
);
```

__ドキュメントの削除__

```javascript
var Task = mongoose.model('Task');
Task.findById('55d2b48b4c2215ad079075e9', function(err, task) {
  if (err) throw err;
  task.remove();
});
```


リンク
------

- [Mongoose](http://mongoosejs.com/)
