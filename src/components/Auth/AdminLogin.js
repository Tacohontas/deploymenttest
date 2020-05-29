import React, { Component } from "react";
import axios from "axios";

// Register and login information

class AdminLogin extends Component {
  state = {
    condition: true, // Defaultvärde true
  };

  onClickNav(e) {
    if (this.state.condition !== false) {
      this.setState({ condition: false });
      e.target.innerHTML = "Already have an account?";
    } else {
      this.setState({ condition: true });
      e.target.innerHTML = "Dont have an account?";
    }
  }

  onSubmitRegister(e) {
    e.preventDefault();
    axios
      .post("http://localhost:1337/auth/local/register", {
        username: e.target.elements.username.value,
        email: e.target.elements.email.value,
        password: e.target.elements.password.value,
      })
      .then((response) => {
        console.log("Well done");
        console.log("User profile", response.data.user);
        console.log("User token", response.data.jwt);
        // localStorage.setItem("userFromLogin", response.data.jwt); // Tillfällig lösning med LS
        this.props.userCredential(response.data.user, response.data.jwt);

      })
      .catch((error) => {
        console.log("An error occurred", error);
      });
  }

  onSubmitLogin(e) {
    e.preventDefault();
    axios
      .post("http://localhost:1337/auth/local/", {
        identifier: e.target.elements.email.value, // Vad som ska matchas mot password
        password: e.target.elements.password.value,
      })
      .then((response) => {
        // Handle success
        console.log("Well done");
        console.log("User profile", response.data.user);
        console.log("User token", response.data.jwt);
        // localStorage.setItem("jwtFromLogin", response.data.jwt); // Tillfällig lösning med LS

        this.props.userCredential(response.data.user, response.data.jwt);
      })
      .catch((error) => {
        console.log("An error occurred", error);
      });
  }

  render() {
    return (
      <div>
        {this.state.condition && ( // Om state.condition == true
          <form className={"input_container"} onSubmit={this.onSubmitLogin.bind(this)}>
            
            <input type="email" name="email" placeholder="Email" />
            <input type="password" name="password" placeholder="Password" />
            <button className={"button__success"}>Login</button>
          </form>
        )}

        {!this.state.condition && ( // Om state.condition == false
          <form onSubmit={this.onSubmitRegister.bind(this)}>
            <input type="text" name="username" placeholder="Username" />
            <input type="email" name="email" placeholder="Email" />
            <input
              type="password"
              name="password"
              placeholder="Password"
            />
            <button className={"button__success"}>Register</button>
          </form>
        )}

        <button className={"button__secondary"}onClick={this.onClickNav.bind(this)}>
          Dont have an account?
        </button>
      </div>
    );
  }
}

export default AdminLogin;
