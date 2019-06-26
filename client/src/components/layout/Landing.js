import React, { Component } from "react";
//import { Link } from "react-router-dom";
class Landing extends Component {
  render() {
    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <h4>
              <b>
                Hello User,
              </b>
            </h4>
            <p className="flow-text grey-text text-darken-1">
              This is the Landing Page
            </p>
          </div>
        </div>
      </div>
    );
  }
}
export default Landing;