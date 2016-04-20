# データの視覚化と応用


## 1. Google Charts で簡単チャート作成

- Google Charts は、SVGを使ったグラフを表示するツール
- [Google Charts](https://developers.google.com/chart/)
- [Google Charts > ガイド > Chart Gallery](https://google-developers.appspot.com/chart/interactive/docs/gallery)


## 2. D3.js で自由度の高いチャート作成

- [D3.js](http://d3js.org/)

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.5/d3.min.js"></script>
```


## 3. D3.js で地図を描画しよう

- [TopoJSON](https://github.com/mbostock/topojson)


__TopoJSONで地図データを表示するまで__

- 地図データ(shape形式)をダウンロード
- 地図データから任意の部分を取り出す (GeoJSON 形式)
- TopoJSON  のツールを使ってデータを変換 (TopoJSON 形式)
- D3.js と TopoJSON プラグインを使ってブラウザ上に表示

__地図データをダウンロード__

- [Natural Earth](http://www.naturalearthdata.com/)
- [Download states and provinces](http://www.naturalearthdata.com/http//www.naturalearthdata.com/download/10m/cultural/ne_10m_admin_1_states_provinces.zip)

__データ形式の変換__

- Shape 形式のデータを TopoJSON で扱える形式に変換する

```sh
# CentOS
$ sudo yum install gdal

# mac / Homebrew
$ brew install gdal
```

Shape ファイルから、日本の地図データだけを抽出し、GeoJSON 形式に変換する

```sh
$ ogr2ogr -f GeoJSON -where 'geonunit="Japan"' geo.json map.shp
```

TopoJSON 形式に変換する

```sh
$ topojson geo.json -p > topo.json
```

D3.js と TopoJSONのJSライブラリの圧縮版

```sh
$ wget http://d3js.org/d3.v3.min.js
$ wget http://d3js.org/topojson.v0.min.js
```


__都道府県の詳細データ__

- [国土交通省国土政策局国土情報課 > 国土数値情報](http://nlftp.mlit.go.jp/ksj/)
- [国土数値情報 行政区域データ](http://nlftp.mlit.go.jp/ksj/gml/datalist/KsjTmplt-N03.html)


__地図に出荷量データを重ねる__

- [農林水産省](http://www.maff.go.jp/)
- [農林水産省 > 作物統計 > 作況調査（果樹）](http://www.maff.go.jp/j/tokei/kouhyou/sakumotu/sakkyou_kazyu/)


## 4. D3.js から派生したライブラリ

__D3.js をベースに開発されたライブラリ__

JavaScript を対象にして、いろいろの視覚化ライブラリをまとめて紹介する「[JavaScript Graph Comparison](http://www.jsgraphs.com/)」


### NVD3.js

綺麗なグラフ。

- [NVD3.js](http://nvd3.org/)


### C3.js

動的な更新に強い。簡単なグラフの種類を差し替え。

- [C3.js](http://c3js.org/)
