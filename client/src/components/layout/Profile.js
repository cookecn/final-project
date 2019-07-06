import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import profileImage from "../../images/profile.jpg";
//import NewsFeed from "../layout/NewsFeed";

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
              <span className="card-title">{user.name}</span>
            </div>
            <div className="card-content" onClick={this.handleInputChange}>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam 
              aliquam varius lectus et porttitor. Maecenas vitae velit semper, 
              euismod ante eget, volutpat est. Donec maximus tortor eu nulla aliquam, 
              consectetur vulputate nulla rutrum. Nulla sed libero vel tellus pharetra 
              imperdiet in id ipsum. Proin ultrices facilisis leo, tempus cursus mauris 
              imperdiet bibendum. Donec accumsan est ut orci fermentum, nec bibendum turpis 
              vehicula. Morbi vel velit enim. Donec faucibus turpis sed mauris placerat, 
              sit amet semper libero lacinia. Interdum et malesuada fames ac ante ipsum primis 
              in faucibus. Pellentesque tincidunt vulputate turpis, in facilisis enim malesuada 
              eu. Cras rutrum metus quis velit tristique malesuada. Maecenas non dui ac arcu sagittis 
              dapibus. Vivamus at velit quis nisl vestibulum pretium consequat ut magna.</p>
            </div>
            <div className="card-action">
              <Link to="/editProfile">Edit Profile</Link>
            </div>
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
