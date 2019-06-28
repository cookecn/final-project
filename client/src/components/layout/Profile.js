import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import profileImage from "../../images/profile.jpg";
import NewsFeed from "../layout/NewsFeed";

class Profile extends Component {
  componentDidMount() {}

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  handleInputChange = event => {
    event.preventDefault();
  };

  handleFormSubmit = () => {};
  render() {
    const { user } = this.props.auth;
    return (
      <div className="row">
        <div className="col s3 center-align">
          <div className="card">
            <div className="card-image">
              <img src={profileImage} href="/profile" alt="profile" />
              <span className="card-title">{user.name.split(" ")[0]}</span>
            </div>
            <div className="card-content" onClick={this.handleInputChange}>
              <p>Bio goes here</p>
            </div>
            <div className="card-action">
              <Link to="/editProfile">Edit Profile</Link>
            </div>
          </div>
        </div>

        <div className="col s9">
        <NewsFeed />
        </div>
        <div className="row">
          <div className="col s12 m12 l12 center-align">
            <button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
              }}
              onClick={this.onLogoutClick}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };
  const mapStateToProps = state => ({
    auth: state.auth
  });
  export default connect(
    mapStateToProps,
    { logoutUser }
  )(Profile);
