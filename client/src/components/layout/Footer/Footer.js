import React, { Component } from "react";
import "./Footer.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../../../actions/authActions";
//import { Link } from "react-router-dom";

class Footer extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
  render() {
    //const { user } = this.props.auth;
    return (
      <footer className="page-footer blue">
        <div className="container">
          <div className="row">
            <div className="col l6 s12">
              <Link
                to="/"
                style={{
                  fontFamily: "monospace",
                  color: "white"
                }}
              >
                <h4>
                  <i className="material-icons">style</i>
                  Titles
                </h4>
              </Link>
              <p className="white-text">
                A MERN Full-Stack Web-Application
              </p>
            </div>
            <div className="col l4 offset-l2 s12">
              <h5 className="white-text">Routes</h5>
              <ul>
                <li>
                  <Link to="/dashboard">
                    <a className="white-text" href="#!">
                      Home
                    </a>
                  </Link>
                </li>
                <li>
                  <Link to="/profile">
                    <a className="white-text" href="#!">
                      Profile
                    </a>
                  </Link>
                </li>
                <li>
                  <Link to="/login">
                    <a className="white-text" href="#!">
                      Login
                    </a>
                  </Link>
                </li>
                <li>
                  <Link to="/register">
                    <a className="white-text" href="#!">
                      Sign-Up
                    </a>
                  </Link>
                </li>
                <li>
                  <Link to="/login">
                    <a
                      className="white-text"
                      href="#!"
                      onClick={this.onLogoutClick}
                    >
                      Logout
                    </a>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-copyright">
          <div className="container">
            © 2019 Copyright - Don't Steal My Stuff
            <a className="grey-text text-lighten-4 right" href="#!">
              In Development
            </a>
            >
          </div>
        </div>
      </footer>
    );
  }
}

Footer.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(Footer);
