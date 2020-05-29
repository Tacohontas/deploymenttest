import React, { Component } from "react";
import firebase from "../components/FirebaseConfig";
import BookForm from "../components/BookForm";
import UserLogin from "../components/AuthUser/UserLogin";

class Book extends Component {
  state = {
    user: false,
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      // onAuthStateChanged anropas när man loggar in / ut
      if (user) {
        this.setState({ user: user.email });
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
          <BookForm
            productId={this.props.location.state.productId}
            title={this.props.location.state.title}
            desc={this.props.location.state.desc}
            price={this.props.location.state.price}
          />
        )}
      </div>
    );
  }
}

export default Book;
