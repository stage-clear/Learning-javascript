# Leaflet.js

## Todo
- Map の表示
- Map 領域の指定
- Map 初期表示位置
- Marker をクリックして画面遷移
- Marker をクリックしてポップアップ
- Marker に独自画像を適用

### Map の表示
```html
<div id="map"></div>
```

```js
const map = L.mpp('map', {
  zoom: 6,
  minZoom: 6,
  maxZoom: 7,
  center: [0, 0],
  crs: L.CRS.Simple,
  attributionControl: false,
})
```

### Map 領域の指定

```js
const bounds = L.latLngBound(
  map.unproject([0, 1303], 6),
  map.unproject([2048, 0], 6)
)

map.fitBounds(bounds)
map.setMaxBounds(bounds)
```

```js
L.tileLayer('./mapimages/{z}/y{y}x{x}.png', {
  attribution: '',
  bounds: bounds, // 指定しないと境界の外の画像まで詠み込もうする
  mapBounds: bounds,
  noWrap: true,
}).addTo(map)
```


## Libraries
- [自作地図: leafletで使えるおすすめプラグインまとめ
](http://qiita.com/pokohide/items/6329f1f92253ced23599)
- [Leaflet.EdgeMarker](https://github.com/ubergesundheit/Leaflet.EdgeMarker)
- [L.Control.Minimap](https://raw.githubusercontent.com/xguaita/mtig-js/gh-pages/libs/minimap/Control.MiniMap.min.js)