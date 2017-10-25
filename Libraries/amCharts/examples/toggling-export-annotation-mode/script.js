
var chart = AmCharts.makeChart('chartdiv', {
  'type': 'serial',
  'theme': 'light',
  'dataProvider': [
    {
      'country': 'USA',
      'visits': 2025,
    },
    {
      'country': 'China',
      'visits': 1882,
    },
    // ...
  ],
  'valueAxes': [{
    'gridAlpha': 0.2,
    'dashLength': 0,
  }],
  'gridAboveGraphs': true,
  'startDuration': 1,
  'graphs': [{
    'balloonText': '[[category]]: <b>[[value]]</b>',
    'fillAlphas': 0.8,
    'lineAlpha': 0.2,
    'type': 'column',
    'valueField': 'visits',
  }],
  'chartCursor': {
    'categoryBalloonEnabled': false,
    'cursorAlpha': 0,
    'zoomable': false,
  },
  'categoryField': 'country',
  'categoryAxis': {
    'gridPosition': 'start',
    'gridAlpha': 0,
    'tickPosition': 'start',
    'tickLength': 20,
  },
  'export': {
    'enabled': true,
  },
})

function toggleAnnotations () {
  if (chart['export'].drawing.enabled) {
    chart['export'].drawing.handler.done()
  } else {
    chart['export'].capture({
      'action': 'draw',
    }, function() {
      var drawingMenu = chart['export'].config.menu[0].menu[2].menu
      chart['export'].createMenu(drawingMenu)
    })
  }
}
