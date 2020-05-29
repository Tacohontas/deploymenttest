import React, { Component } from "react";
import UserProfile from "./UserProfile";
import UserLogin from "./UserLogin";
import firebase from "../FirebaseConfig";

class UserPage extends Component {
  state = {
    user: false,
    displayName: "",
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      // onAuthStateChanged anropas när man loggar in / ut
      if (user) {
        this.setState({ user: user.email, displayName: user.displayName });        
      }
    });
  }

  render() {
    const loggedIn = this.state.user;
    return (
      <div>
        {!loggedIn ? (
          <UserLogin />
        ) : (
          <UserProfile />
        )}
      </div>
    );
  }
}

export default UserPage;
