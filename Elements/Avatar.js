import React from "react";
import avatar from "../img/avatar.svg";

class Avatar extends React.Component {
  render() {
    return (
      <div className="user-avatar " style={this.props.style}>
        {this.props.avatar && (
          <img
            alt={this.props.name}
            src={this.props.avatar.path}
            style={this.props.avatarStyle}
            className="user-avatar-image"
          />
        )}
        {!this.props.avatar && (
          <img
            alt={this.props.name}
            src={avatar}
            style={this.props.avatarStyle}
            className="user-avatar-image"
          />
        )}
      </div>
    );
  }
}

export default Avatar;
