import React, { Component } from "react";
import AdminLogin from "../Auth/AdminLogin";
import AdminProfile from "../Auth/AdminProfile";

// Renderar adminlogin eller adminprofile baserat på state

class Adminsida extends Component {
  state = {
    user: null,
  };

  render() {
    return (
      <div>
        {!this.state.user && (
          <AdminLogin userCredential={(e) => this.setState({ user: e })} />
        )}
        {this.state.user && <AdminProfile userData={this.state.user} />}
      </div>
    );
  }
}

export default Adminsida;
