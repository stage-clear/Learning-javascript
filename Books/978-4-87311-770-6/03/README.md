# 光源

> WebGL自体にはライトのサポートは組み込まれていません.
> 本章で紹介するようなさまざまな種類のライトをシミュレートするWebGLのシェーダープログラムを個別に自分で書かなければいけなくなります.
> https://developer.mozilla.org/ja/docs/Web/API/WebGL_API/Tutorial/Lighting_in_WebGL

## Three.js で利用可能なライティング

- `THREE.AmbientLight` - 基本的なライト. このライトの色がシーン内のすべてのオブジェクトの色に追加される
- `THREE.PointLight` - 光がすべての方向に発散する空間内の一点. このライトを使用して影を落とすことはない
- `THREE.SpotLight` - 卓上ライトや天井のスポットライト, たいまつのような円錐状の影響範囲を持つこのライトは影を落とすことができる
- `THREE.DirectionalLight` - 無限遠光源とも呼ばれる. 例えば太陽の光のようにそれぞれ平行であるように見える
- `THREE.HemisphereLight` - 特殊なライトで, 表面の反射と遠くに向かうに連れ徐々に輝きを失う空をシミュレートすることで, より自然な見た目の屋外での光を実現できる
- `THREE.LensFlare` - シーン内にレンズフレア効果を追加できる

## 基本的なライト
### `THREE.AmbientLight`

- [01-ambient-light.html](https://codepen.io/kesuiket/pen/zzvPvb)
