
// 配列の各要素にパーセントを加算
exports.addPercentageToEach = function(prices, percentage) {
  return prices.map(function(total) {
    total = parseFloat(total);
    return total + (total * percentage);
  });
};

// 配列の各要素の合計を計算
exports.sum = function(prices) {
  return prices.reduce(function(currentSum, currentValue) {
    return parseFloat(currentSum) + parseFloat(currentValue);
  });
};


// パーセントを表示用に整形
exports.percentFormat = function(percentage) {
  return parseFloat(percentage) * 100 + '%';
};


// ドルの金額を表示ように整形
exports.dollarFormat = function(number) {
  return '$' + parseFloat(number).toFixed(2);
};

