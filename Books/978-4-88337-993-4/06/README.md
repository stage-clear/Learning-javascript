# クローラーのためのデータソース

## 1. 有益なデータソース一覧

__SNS__

|Name|URL|
|:--|:--|
|Facebook|https://www.facebook.com|
|Twitter|https://twitter.com|
|Google+|https://plus.google.com|

__ソーシャルブックマーク__

|Name|URL|
|:--|:--|
|はてなブックマーク|http://b.hatena.ne.jp|
|delicious|https://delicious.com|

__商品情報__

|Name|URL|
|:--|:--|
|Amazon|http://www.amazon.co.jp|
|楽天市場|http://www.rakuten.co.jp|
|Yahoo!ショッピング|http://shopping.yahoo.co.jp|
|価格.com|http://kakaku.com|

__オンライン辞書__

|Name|URL|
|:--|:--|
|Wikipedia|https://ja.wikipedia.org|
|はてなキーワード|http://d.hatena.ne.jp/keyword/|
|Weblio|http://www.weblit.jp|
|ピクシブ百科事典|http://dic.pixiv.jp|
|ニコニコ大百科|http://dic.nicovideo.jp|

__オフライン辞書データ__

|Genre|Name|URL|
|:--|:--|:--|
|類似辞書|日本語 WordNet|http://compling.hss.ntu.edu.sg/wnja/|
|英和辞書|英辞郎|http://www.eijiro.jp/|
|英和辞書|ejdic-hand|http://kujirahand.com/web-tools/EJDictFreeDL.php|
|英英辞書|WordNet|https://wordnet.princeton.edu|
|各種辞書|Vector > 各種辞書|http://www.vector.co.jp/vpack/filearea/data/writing/dic/|

__ブログサービス__

|Name|URL|
|:--|:--|
|Ameba ブログ|http://abeblo.jp|
|livedoor Blog|http://blog.livedoor.com|
|FC2 ブログ|http://blog.fc2.com|
|JUGEM|http://jugem.jp|
|Seesaa BLOG|http://blog.seesaa.jp|

__天気予報・気象情報__

|Name|URL|
|:--|:--|
|Weather Hacks|http://weather.livedoor.com/weather_hacks/|
|Yahoo!天気・災害|http://weather.yahoo.co.jp/weather/|
|OpenWeatherMap|http://openweathermap.org/|
|drk7.jp > 天気予報|http://www.drk7.jp/weather/|
|過去の気象データ|http://www.data.jma.go.jp/gmd/risk/obsdl/|

__オープンデータ__

|Name|URL|
|:--|:--|
|日本政府のオープンデータ|http://www.data.go.jp|
|アメリカ政府のオープンデータ|http://www.data.gov/|
|イギリス政府のオープンデータ|http://data.gov.uk|


## 2. Twitter からのダウンロード

- [Twitter Developers](https://dev.twitter.com/)
- [Application Management > Twitter Apps](https://apps.twitter.com/)


## 3. Facebook からのダウンロード

- [Facebook API](https://developers.facebook.com/)
- [Graph API Explorer](https://developers.facebook.com/tools/explorer)


## 4. はてなブックマークからのダウンロード

- [はてなブックマークのAPI](http://b.hatena.ne.jp/help/entry/api)

```bash
// [書式] はてなブックマーク件数取得 API
http://api.b.st-hatena.com/entry.count?url=(URL)

// [書式] 複数URLのブックマークを得る
http://api.b.st-hatena.com/entry.counts?url=(URL1)&url=(URL2)&url=(URL3)
```

- [はてなウェブサービス](http://www.hatena.ne.jp/info/webservices)


## 5. Amazon からダウンロード

- [Product Advertising API](https://affiliate.amazon.co.jp/gp/advertising/api/detail/main.html)

Manage Account > こちらのリンク > セキュリティ認証
+ アクセスキー > 新しいアクセスキーの作成


## 6. Flickr からダウンロード

- [Flickr](https://www.flickr.com/)
- [Flickr > Get an API Key](https://www.flickr.com/services/api/keys/apply/)
- [Flickr > The App Garden > flickr.photos.search](https://www.flickr.com/services/api/flickr.photos.search.html)


## 7. YouTube からのダウンロード

- [YouTube](https://www.youtube.com/)
- [Google Developers Console](https://console.developers.google.com/)

__API の作成__

1. プロジェクトの作成 > 作成
2. API と認証 > API > YouTube Data API > API を有効
3. API と認証 > 認証情報 > 認証情報の追加 > APIキー > サーバーキー

__検索オプション__

- [YouTube Data API (v3)](https://developers.google.com/youtube/v3/docs/search/list/)

|Option|Summary|
|:--|:--|
|order|検索結果の順番を指定|
|regionCode|国のコード指定|
|safeSearch|検索結果に制限コンテンツを含めるかどうかを指定|
|type|検索対象のタイプを指定|
|videoDuration|動画の長さを指定|
|videoLicense|動画のライセンスを指定|


## 8. Yohoo!Finance から為替や株のダウンロード

- [Yahoo!ファイナンス](http://finance.yahoo.co.jp/)
- [Yahoo!ファイナンス > FX・為替 > 米ドル/円](http://info.finance.yahoo.co.jp/fx/detail/?code=USDJPY)
- [Yahoo!ファイナンス > 株式 > みずほフィナンシャルグループ](http://stocks.finance.yahoo.co.jp/stocks/detail/?code=8411)

__証券コードの取得__

- [日本取引所グループ > その他統計資料 > 東証上場銘柄一覧](http://www.jpx.co.jp/markets/statistics-equities/misc/01.html)


## 9. Wikipedia からのダウンロード

__Wikipedia からのダウウロード__

- Wikipedia では、コンテンツが自由にダウンロードできるよう配慮されている
- そのため、サイト自体へのクローリングは禁止されている
- [Wikipedia 日本語版のデータダウンロード](http://download.wikimedia.org/jawiki/)
- [Wikipedia データベースダウンロード（ガイド）](https://ja.wikipedia.org/wiki/WP:DD)

__データの形式__

- Wikipedia のデータは、XML形式（あるいは XML を圧縮した形式）で配布されている
