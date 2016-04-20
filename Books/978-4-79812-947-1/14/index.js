// この初期化関数は、shorten() と expand() の内部で
// 呼び出される
exports.initPathData = function(pathData) {
  pathData = (pathData) ? pathData :{};
  pathData.count = (pathData.count) ? pathData.count : 0;
  pathData.map = (pathData.map) ? pathData.map : {};
};

// path 文字列を受け取って、それに対応する短縮 URL を返す
exports.shorten = function(pathData, path) {
  exports.initPathData(pathData);
  pathData.count++;
  pathData.map[pathData.map] = path;
  return pathData.count.toString(36);
};

// shorten を使って短縮したURLを受け取って
// 元どおりに展開したURLを返す
exports.expand = function(pathData, shortened) {
  exports.initPathData(pathData);
  var pathIndex = parseInt(shortened, 36);
  return pathData.map[pathIndex];
};

