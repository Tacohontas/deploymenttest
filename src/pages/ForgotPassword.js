import React, { Component } from "react";
import firebase from "../components/FirebaseConfig";

class ForgotPassword extends Component {
  state = {
    mailSent: false,
  };

  resetPassword(e) {
    e.preventDefault();
    var auth = firebase.auth();
    var emailAddress = e.target.elements.resetEmail.value;
    let success;

    auth
      .sendPasswordResetEmail(emailAddress) // Skickar ett reset pw-mail till adress i input:mail
      .then(function () {
        // Email sent.
        // console.log("Email sent");
        success = true;
      })
      .catch(function (error) {
        success = false;
      });

    if (!success) {
      this.setState({ mailSent: true });
    }
  }

  render() {
    return (
      <div className="login-container">
        {this.state.mailSent && (
          <p>A link to reset your password has been sent to your mail. </p>
        )}
        <form onSubmit={this.resetPassword.bind(this)}>
          <input type="email" name="resetEmail" placeholder="Email"></input>
          <button className={"button__secondary"}>Reset password</button>
        </form>
      </div>
    );
  }
}

export default ForgotPassword;
