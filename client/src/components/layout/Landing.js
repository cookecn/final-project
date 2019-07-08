import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../../actions/authActions";

//import { Link } from "react-router-dom";
class Landing extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
  render() {
    const { user } = this.props.auth;
    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <h4>
              <b>
                Hello {user.name},
              </b>
            </h4>
            <p className="flow-text grey-text text-darken-1">
              What would you like to do today?
            </p>

            <div className="col s6 center-align">
            <Link to="/profile">
            <button className="btn-floating btn-large waves-effect waves-light blue"><i className="material-icons">person</i></button>
            </Link>
            </div>
            <div className="col s6 center-align">
            <Link to="/dashboard">
            <button className="btn-floating btn-large waves-effect waves-light red"><i className="material-icons red">home</i></button>
            </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(Landing);
