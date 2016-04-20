var vows = require('vows');
var assert = require('assert');
var Todo = require('../todo');

// batch
vows.describe('Todo').addBatch({
  // context: "追加した項目は"
  'when adding an item': {
    // topic
    topic: function() {
      var todo = new Todo();
      todo.add('Feed my cat');
      return todo;
    },
    // vow : "todo に存在するはずだ"
    'it should exist in my todos': function(er, todo) {
      assert.equal(todo.getCount(), 1);
    }
  }
//}).run();
 }).export(module);