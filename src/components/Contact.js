import React, { Component } from "react";
import firebase from "./FirebaseConfig";
import UserLogin from "./AuthUser/UserLogin";

export default class Contact extends Component {
  state = {
    user: false,
    email: null,
    msg: null,
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      // onAuthStateChanged anropas när man loggar in / ut
      if (user) {
        this.setState({ user: user.uid, email: user.email });
      }
    });
  }

  onSubmitForm(e) {
    e.preventDefault();
    const db = firebase.firestore();
    const that = this;

    db.collection("contactFormData")
      .add({
        user: this.state.user,
        email: this.state.email,
        message: e.target.elements.textarea.value,
      })
      .then(function () {
        that.setState({ msg: "Meddelandet har skickats!" });
      })
      .catch(function (error) {
        console.log(error);
        that.setState({ msg: "Meddelandet kunde ej skickas!" });
      });
  }

  render() {
    const loggedIn = this.state.user;
    return (
      <div>
        {this.state.msg}
        {!loggedIn ? (
          <UserLogin />
        ) : (
          <form onSubmit={this.onSubmitForm.bind(this)}>
            <textarea name="textarea" />
            <button>Kontakta </button>
          </form>
        )}
      </div>
    );
  }
}
