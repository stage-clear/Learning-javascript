#!/bin/sh

PATH=/usr/local/bin:/usr/bin:/bin
NODE_PATH=/usr/lib/node_modules

# カレント
CDIR=`dirname $0`
cd $CDIR

# atmo-shellを起動
/Users/takeshima/.nvm/versions/node/v4.1.2/bin/electron $CDIR

# * 19 * * * /Users/takeshima/Works/node-crawler/kabu-chart-app/cron.sh
