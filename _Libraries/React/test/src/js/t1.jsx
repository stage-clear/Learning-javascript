var Avatar = React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired,
    id:   React.PropTypes.string.isRequired,
    width: React.PropTypes.string.isRequired,
    height: React.PropTypes.string.isRequired,
    alt: React.PropTypes.string
  },
  render() {
    var avatarImg = `img/avatar_${this.props.id}.jpg`;
    console.log(avatarImg);
    return (
      <div>
        <img src={avatarImg} width={this.props.width} heigth={this.props.height} />
        <span>{this.props.name}</span>
      </div>
    );
  }
});

var user = {
  id: 10,
  name: 'Hoge'
};

React.render(
  <Avatar name={user.name} id={user.id} width={100} height={100} />,
  document.body
);