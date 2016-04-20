(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var Avatar = React.createClass({
  displayName: 'Avatar',

  propTypes: {
    name: React.PropTypes.string.isRequired,
    id: React.PropTypes.string.isRequired,
    width: React.PropTypes.string.isRequired,
    height: React.PropTypes.string.isRequired,
    alt: React.PropTypes.string
  },
  render: function render() {
    var avatarImg = 'img/avatar_' + this.props.id + '.jpg';
    console.log(avatarImg);
    return React.createElement(
      'div',
      null,
      React.createElement('img', { src: avatarImg, width: this.props.width, heigth: this.props.height }),
      React.createElement(
        'span',
        null,
        this.props.name
      )
    );
  }
});

var user = {
  id: 10,
  name: 'Hoge'
};

React.render(React.createElement(Avatar, { name: user.name, id: user.id, width: 100, height: 100 }), document.body);

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvdGFrZXNoaW1hL1dvcmtzL3N1cGVydHJ1ZS9MZWFybmluZy1yZWFjdC1qcy90ZXN0L3NyYy9qcy90MS5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBLElBQUksTUFBTSxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUM7OztBQUM3QixXQUFTLEVBQUU7QUFDVCxRQUFJLEVBQUUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsVUFBVTtBQUN2QyxNQUFFLEVBQUksS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsVUFBVTtBQUN2QyxTQUFLLEVBQUUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsVUFBVTtBQUN4QyxVQUFNLEVBQUUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsVUFBVTtBQUN6QyxPQUFHLEVBQUUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNO0dBQzVCO0FBQ0QsUUFBTSxFQUFBLGtCQUFHO0FBQ1AsUUFBSSxTQUFTLG1CQUFpQixJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsU0FBTSxDQUFDO0FBQ2xELFdBQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDdkIsV0FDRTs7O01BQ0UsNkJBQUssR0FBRyxFQUFFLFNBQVMsQUFBQyxFQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQUFBQyxFQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQUFBQyxHQUFHO01BQzNFOzs7UUFBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUk7T0FBUTtLQUMxQixDQUNOO0dBQ0g7Q0FDRixDQUFDLENBQUM7O0FBRUgsSUFBSSxJQUFJLEdBQUc7QUFDVCxJQUFFLEVBQUUsRUFBRTtBQUNOLE1BQUksRUFBRSxNQUFNO0NBQ2IsQ0FBQzs7QUFFRixLQUFLLENBQUMsTUFBTSxDQUNWLG9CQUFDLE1BQU0sSUFBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksQUFBQyxFQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsRUFBRSxBQUFDLEVBQUMsS0FBSyxFQUFFLEdBQUcsQUFBQyxFQUFDLE1BQU0sRUFBRSxHQUFHLEFBQUMsR0FBRyxFQUNqRSxRQUFRLENBQUMsSUFBSSxDQUNkLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIEF2YXRhciA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgcHJvcFR5cGVzOiB7XG4gICAgbmFtZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIGlkOiAgIFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICB3aWR0aDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIGhlaWdodDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIGFsdDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZ1xuICB9LFxuICByZW5kZXIoKSB7XG4gICAgdmFyIGF2YXRhckltZyA9IGBpbWcvYXZhdGFyXyR7dGhpcy5wcm9wcy5pZH0uanBnYDtcbiAgICBjb25zb2xlLmxvZyhhdmF0YXJJbWcpO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8aW1nIHNyYz17YXZhdGFySW1nfSB3aWR0aD17dGhpcy5wcm9wcy53aWR0aH0gaGVpZ3RoPXt0aGlzLnByb3BzLmhlaWdodH0gLz5cbiAgICAgICAgPHNwYW4+e3RoaXMucHJvcHMubmFtZX08L3NwYW4+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59KTtcblxudmFyIHVzZXIgPSB7XG4gIGlkOiAxMCxcbiAgbmFtZTogJ0hvZ2UnXG59O1xuXG5SZWFjdC5yZW5kZXIoXG4gIDxBdmF0YXIgbmFtZT17dXNlci5uYW1lfSBpZD17dXNlci5pZH0gd2lkdGg9ezEwMH0gaGVpZ2h0PXsxMDB9IC8+LFxuICBkb2N1bWVudC5ib2R5XG4pOyJdfQ==
