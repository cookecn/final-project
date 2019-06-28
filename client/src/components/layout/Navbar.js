import React, { Component } from "react";
import { Link } from "react-router-dom";
import M from "materialize-css";
import options from "materialize-css";

class Navbar extends Component {
  componentDidMount() {
    document.addEventListener("DOMContentLoaded", function() {
      var elems = document.querySelectorAll(".dropdown-trigger");
      var instances = M.Dropdown.init(elems, options);
      console.log(instances);
    });
  }

  render() {
    return (
      <div className="navbar-fixed">
        <nav className="z-depth-0">
          <ul id="dropdown1" className="dropdown-content">
            <li>
              <Link to="/live/gaming">
                <i className="material-icons">code</i>
                Gaming
              </Link>
            </li>
            <li>
              <Link to="/live/environment">
                <i className="material-icons">code</i>
                Environment
              </Link>
            </li>
            <li>
              <Link to="/live/single">
              <i className="material-icons">code</i>
              Single
              </Link>
            </li>
            <li>
            <Link to="/live/nonProfit">
              <i className="material-icons">code</i>
              Non-profit
              </Link>
            </li>
          </ul>{" "}
          <div className="nav-wrapper black">
            <Link
              to="/"
              style={{
                fontFamily: "monospace"
              }}
              className="brand-logo center white-text"
            >
              <i className="material-icons">code</i>
              Final Project
            </Link>
            <ul id="dropdown1" className="left hide-on-med-and-down white-text">
              <li>
                <a
                  className="dropdown-trigger"
                  href="#!"
                  data-target="dropdown1"
                >
                  Titles<i className="material-icons left">arrow_drop_down</i>
                </a>
              </li>
            </ul>
            <ul className="right hide-on-med-and-down white-text">
              <li>
                <Link
                  to="/register"
                  style={{
                    width: "140px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px"
                  }}
                  className="btn waves-effect waves-light hoverable blue accent-3"
                >
                  Register
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  style={{
                    width: "140px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px"
                  }}
                  className="btn btn-flat waves-effect black white-text"
                >
                  Log In
                </Link>
              </li>
              <li>
                <Link to="/dashboard">
                  <i className="material-icons">person</i>
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}
export default Navbar;

//ADD THIS TO JAVASCRIPT FOR THE DROPDOWN MENU TO WORK
//$(".dropdown-trigger").dropdown();
