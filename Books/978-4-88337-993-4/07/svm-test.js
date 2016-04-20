'use strict';

// node-svmを使って認識

// 学習データ
let train_data = [
  // [[データ配列], クラス]
  [[0, 0], 0],
  [[0, 1], 1],
  [[1, 0], 1],
  [[1, 1], 0]
];

// modules
let svm = require('node-svm');

// create object
let clf = new svm.CSVC();
clf.train(train_data)   // データの学習
  .done(doTest);        // テストを実行


function doTest() {
  // test 1
  let v = clf.predictSync([1, 0]);
  console.log('[1, 0] => ' + v);

  // test 2
  clf.predict([1, 1])
    .then(predicted => {
      console.log('[1, 1] => ' + predicted);
    });
}
