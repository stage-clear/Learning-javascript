describe('日付フィルターのテスト', function() {
  var date;

  beforeEach(inject(function($filter){
    date = $filter('date');
  }));

  it('日付処理の基本', function() {
    var current = new angular.mock.TzDate(-6, '2015-03-14T05:08:55.000Z');
    expect(date(current)).toEqual('Mar 14, 2015');
    expect(date(current, 'medium')).toEqual('Mar 14, 2015 11:08:55 AM');
    expect(date(current, 'yyyy年MM月dd日（EEEE） a hh:mm:ss')).toEqual('2015年03月14日（Saturday） AM 11:08:55');
  });
});
