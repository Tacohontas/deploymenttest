import React, { Component } from "react";
import firebase from "../FirebaseConfig";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { Link } from "react-router-dom";


// Register and login information

class UserLogin extends Component {
  state = {
    condition: true, // Defaultvärde true
    forgotPassword: false,
    user: "",
  };

  // Configure FirebaseUI.
  uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: "popup",
    // Redirect to /userprofile after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: "/userprofile",
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    ],
  };

  onSubmitLogin(e) {
    e.preventDefault();
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    firebase.auth().signInWithEmailAndPassword(email, password);
  }

  onSubmitRegister(e) {
    e.preventDefault();
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    const displayName = e.target.elements.username.value;

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password) // Skapar användare i firebase med email, pw
      .then((res) => {
        res.user.sendEmailVerification(); // Skickar en email-verifikation.
        res.user.updateProfile({
          displayName : displayName
        })
      });
  }

  onClickNav(e) {
    if (this.state.condition !== false) {
      this.setState({ condition: false });
    } else {
      this.setState({ condition: true });
    }
  }

  render() {
    return (
      <div className={"login-container"}>
        {/* Firebase UI-login */}
        <StyledFirebaseAuth
          uiConfig={this.uiConfig}
          firebaseAuth={firebase.auth()}
        />

        {this.state.condition && (
          <div className={"login-container"}>
            <form
              onSubmit={this.onSubmitLogin.bind(this)}
              className={"input_container"}
            >
              Or sign in with email
              <input type="email" name="email" placeholder="Email" />
              <input type="password" name="password" placeholder="Password" />
              <button className={"button__success"}>Login</button>
            </form>
            <Link to="/forgotpassword" className={"button__secondary"}>
              Forgot password?
            </Link>
            <button
              className={"button__secondary"}
              onClick={this.onClickNav.bind(this)}
            >
              Dont have an account?
            </button>
          </div>
        )}

        {!this.state.condition && (
          <div className={"login-container"}>
            <form onSubmit={this.onSubmitRegister.bind(this)}>
              Or signup here
              <input type="text" name="username" placeholder="Username" />
              <input type="email" name="email" placeholder="Email" />
              <input type="password" name="password" placeholder="Password" />
              <button className={"button__success"}>Register</button>
            </form>
            <button
              className={"button__secondary"}
              onClick={this.onClickNav.bind(this)}
            >
              Already have an account?
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default UserLogin;
