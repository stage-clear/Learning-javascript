var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/photo_app');
// ローカルホスト上の mongodb と接続し、データベースとして photo_app を使う設定

var schema = new mongoose.Schema({
  name: String,
  path: String
});

module.exports = mongoose.model('Photo', schema);