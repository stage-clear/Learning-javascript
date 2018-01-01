// パーサーを取り込む
cosnt WikiParser = require('./src/wiki_parser.js')
// ソースコードをパース
const src = '*title\n\n-list1\n-list2\n\nhoge'
const nodes = WikiParser.parse(src)
console.log(nodes)
