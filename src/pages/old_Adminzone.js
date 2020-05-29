import React, { Component } from "react";
import AdminLogin from "../components/Auth/AdminLogin";
import AdminProfile from "../components/Auth/AdminProfile";

// Renderar adminlogin eller adminprofile baserat på state

class AdminZone extends Component {
  state = {
    user: null,
  };

  componentDidMount() {
    let userFromLS = localStorage.getItem('jwtFromLogin')
    this.setState({user: userFromLS})
    }
  

  render() {
    return (
      <div>
        {!this.state.user && ( // Om Admin ej är inloggad
          <AdminLogin userCredential={(e) => this.setState({ user: e })} />
        )}
        {this.state.user &&  // Om Admin är inloggad
        <AdminProfile userData={this.state.user} />}
      </div>
    );
  }
}

export default AdminZone;
