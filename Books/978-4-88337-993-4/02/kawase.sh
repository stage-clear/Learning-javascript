#!/bin/sh

# パスを設定
PATH=/usr/local/bin:/usr/bin:/bin
NODE_PATH=/usr/lib/node_modules

# カレントディレクトリ
cd `dirname $0`
# 為替スクリプトを実行
~/.nvm/versions/node/v4.1.2/bin/node kawase-usd_jpy.js

# permission denied
# chmod +x kawase.sh