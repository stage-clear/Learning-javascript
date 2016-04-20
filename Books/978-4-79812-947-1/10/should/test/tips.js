
// tips のロジックモジュールを使用
var tips = require('..');
// should.js を使用
var should = require('should');

var tax = 0.12; // 税額を12%と定義
var tip = 0.15; // チップを15%と定義
var prices = [10, 20];// テスト用に勘定書を定義
var pricesWithTipAndTax = tips.addPercentageToEach(prices, tip + tax);

pricesWithTipAndTax[0].should.equal(12.7); // 税金とチップの加算テスト
pricesWithTipAndTax[1].should.equal(25.4); // (27%増となるはず)

var totalAmount = tips.sum(pricesWithTipAndTax).toFixed(2);
totalAmount.should.equal('38.10'); // 勘定の合計をテスト

var totalAmountAsCurrencty = tips.dollarFormat(totalAmount);
totalAmountAsCurrencty.should.equal('$38.10');// ドル表記のテスト

var tipsAsPercent = tips.percentFormat(tip);
tipsAsPercent.should.equal('15%');//パーセント表記のテスト
