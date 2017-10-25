
var chart = AmCharts.makeChart('chartdiv', {
  type: 'stock',
  theme: 'light',
  dataDateFormat: 'DD-MM-YYYY',
  dataSets: [{
    title: 'MSFT',
    fieldMappings: [
      {
        fromField: 'Close', // データ中の Close を `value` として扱う
        toField: 'value',
      },
      {
        fromField: 'Volume', // データ内の Volume を `volume` として扱う
        toField: 'volume',
      },
    ],
    dataLoader: {
      url: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-160/google_msft.csv',
      format: 'csv',
      delimiter: ',',
      useColumnNames: true,
      skip: 1,
      numberFileds: ['Close', 'Volume'],
      reverse: true,
      postProcess: function(data) {
        function reformatDate (input) {
          var mapObj = {
            Jan: '01',
            Feb: '02',
            Mar: '03',
            Apr: '04',
            May: '05',
            Jun: '06',
            Jul: '07',
            Aug: '08',
            Sep: '09',
            Oct: '10',
            Nov: '11',
            Dec: '12',
          }
          
          var re = new RegExp(Object.keys(mapObj).join('|'), 'gi')
          input = input.replace(re, function(matched) {
            return mapObj[matched]
          })
          
          var p = input.split('-')
          if (p[0].length == 1) {
            p[0] = '0' + p[0]
          }
          
          if (Number(p[2]) > 50) {
            p[2] = '19' + p[2]
          } else {
            p[2] = '20' + p[2]
          }
          
          return p.join('-')
        }
        
        for (var i = 0; i < data.length; i++) {
          data[i].Date = reformatDate(data[i].Date)
        }
        
        return data
      },
    },
    categoryField: 'Date',
  }],
  
  panels: [
    {
      showCategoryAxis: false, // グラフ横軸のテキストを表示するかどうか
      title: 'Value',
      percentHeight: 70, // グラフの表示領域の高さ
      stockGraphs: [{
        id: 'g1',
        valueField: 'value',
        comparable: true,
        compareField: 'value',
        balloonText: '[[title]]: <b>[[value]]</b>',
        compareGraphBalloonText: '[[title]]: <b>[[value]]</b>'
      }],
      stockLegend: {
        periodValueTextComparing: '[[percents.value.close]]%',
        periodValueTextRegular: '[[value.close]]',
      },
    },
    {
      title: 'Volume',
      percentHeight: 30,
      stockGraph: [{
        valueField: 'volume',
        type: 'column',
        showBalloon: false,
        fillAlpha: 1,
      }],
      stockLegend: {
        periodValueTextRegular: '[[value.close]]'
      },
    },
  ],
  
  chartScrollbarSettings: {
    graph: 'g1',
  },
  
  chartCursorSettings: {
    valueBalloonEnabled: true,
    fullWidth: true,
    cursorAlpha: 0.1,
    valueLineBalloonEnabled: true,
    valueLineEnabled: true,
    valueLineAlpha: 0.5,
  },
  
  periodSelector: {
    periods: [
      {
        period: 'MM',
        selected: true,
        count: 1,
        label: '1 Month',
      },
      {
        period: 'YYYY',
        count: 1,
        label: '1 year',
      },
      {
        period: 'YTD',
        label: 'YTD',
      },
      {
        period: 'MAX',
        label: 'MAX',
      },
    ],
  },
})
