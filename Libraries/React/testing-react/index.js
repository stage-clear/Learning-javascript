// https://github.com/rackt/react-router/blob/latest/docs/guides/basics/RouteConfiguration.md

var React = require('react');
var render = require('react-dom').render;
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
var Link = require('react-router').Link;
var Redirect = require('react-router').Redirect;


var App = React.createClass({
  render: function() {
    return (
      <div>
        <h1>App</h1>
        <ul>
          <li><Link to="/">Dashboard</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/inbox">Inbox</Link></li>
        </ul>
        { this.props.children }
        <hr/>
        <div>
          copyright &copy; { (new Date()).getFullYear() }
        </div>
      </div>
    );
  }
});

var About = React.createClass({
  render: function() {
    return <h3>About</h3>
  }
});

var Inbox = React.createClass({  
  render: function() {
    return (
      <div>
        <h2>Inbox</h2>
        { this.props.children || 'Welcome to your Inbox' }
      </div>
    )
  }
});

var Message = React.createClass({
  render: function() {
    return <h3>Message { this.props.params.id }</h3>
  }
});

var Dashboard = React.createClass({
  render: function() {
    return (
      <div>Welcome to the app!</div>
    )
  }
});

var routeConfig = [{
  path: '/',
  component: App,
  indexRoute: {
    component: Dashboard
  },
  childRoutes: [
    { path: 'about', component: About },
    { path: 'inbox', 
      component: Inbox,
      childRoutes: [
        { path: '/messages/:id', component: Message },
        { path: 'messages/:id',
          onEnter: function(nextState, replaceState) {
            replaceState(null, '/messages/' + nextState.params.id)
          }
        }
      ]
    }
  ]
}];

render(<Router routes={routeConfig} />, document.getElementById('example'));

