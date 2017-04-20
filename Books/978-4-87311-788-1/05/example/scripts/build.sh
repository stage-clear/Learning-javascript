# JavaScript のトランスパイル
babel --presets react,es2015 js/source -d js/build
# JavaScript のパッケージング
browserify js/build/ap.js -o bundle.js
# CSS のパッケージング
cat css/*/* css/*/.css | sed 's/..\/..\/images/images/g' > bundle.css
# 完了
date; echo;
