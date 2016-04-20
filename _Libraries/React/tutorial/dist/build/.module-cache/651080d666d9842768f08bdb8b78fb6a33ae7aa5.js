// tutorial1
/*
var CommentBox = React.createClass({
  render: function() {
    return (
      <div className="commentBox">
        Hello, World! I am a CommentBox.
      </div>
    );
  }
});

React.render(
  <CommentBox />,
  document.getElementById('content')
);
*/


var data = [
  {author: "Pete Hunt", text: "This is one comment"},
  {author: "Jordan Walke", text: "This is *another* comment"}
];

// tutorial4 : props を使う
// tutorial6 - 7 : markdown を使う
var Comment = React.createClass({displayName: "Comment",
  render: function() {
    var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
    return (
      React.createElement("div", {className: "comment"}, 
        React.createElement("h2", {className: "commentAuthor"}, 
          this.props.author
        ), 
        React.createElement("span", {dangerouslySetInnerHTML: {__html: rawMarkup}})
      )
    );
  }
});


// tutorial2 + tutorial5
var CommentList = React.createClass({displayName: "CommentList",
  render: function() {
    var commentNodes = this.props.data.map(function(comment) {
      return (
        React.createElement(Comment, {author: comment.author}, 
          comment.text
        )
      );
    });

    return (
      React.createElement("div", {className: "commentList"}, 
        commentNodes
      )
    );
  }
});

var CommentForm = React.createClass({displayName: "CommentForm",
  render: function() {
    return (
      React.createElement("div", {className: "commentForm"}, 
        "Hello, World! I am a CommentForm."
      )
    );
  }
});

// tutorial3
// CommentList + CommentForm
var CommentBox = React.createClass({displayName: "CommentBox",
  loadCommentsFromServer: function() {
    console.log(this.props.url);
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.log(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return { data: []};
  },
  componentDidMount: function() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      React.createElement("div", {className: "commentBox"}, 
        React.createElement("h1", null, "Comments"), 
        React.createElement(CommentList, {data: this.state.data}), 
        React.createElement(CommentForm, null)
      )
    );
  }
});



// rendering
//React.render(
//  <CommentBox data={data} />,
//  document.getElementById('content')
//);

// データをjsonでサーバーから読み込む
React.render(
  React.createElement(CommentBox, {url: "comments.json", pollInterval: 2000}),
  document.getElementById('content')
);