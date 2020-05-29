import React, { Component } from "react";
import "../styles/_app.scss";
import { Link } from "react-router-dom";
import firebase from "./FirebaseConfig";
import NavbarUser from "./Navbar_user";
import NavbarAdmin from "./Navbar_admin";

// Vi får adminLoginStatus prop från Approute.
// prop = null om user ej är inloggad
// prop = jwt om user är inloggad

class Navbar extends Component {
  state = {
    // status: null,
    loggedInUser: null,
  };

  onClickLogOut() {
    localStorage.clear();
    this.props.handleCallback(null);
    window.location.reload(false);
    firebase.auth().signOut();
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedInUser: user.email });
      }
    });
  }

  render() {
    let navbarRight = false;

    if (!!this.state.loggedInUser) {
      navbarRight = <NavbarUser />;
    }

    if (!!this.props.adminLoginStatus) {
      navbarRight = <NavbarAdmin />;
    }

    if (!navbarRight) {
      navbarRight = (
        <div className="navbar_right">
          <ul>
            <li>
              <Link to="/Userpage">Logga in</Link>
            </li>
            <li>
              <Link to="/Contact">Kontakta oss</Link>
            </li>
          </ul>
        </div>
      );
    }

    return (
      <div className="navbar">
        <div className="navbar_left">
          <Link to="/">
            <h2 className="navbar_logo">Herrängens Tennisklubb</h2>
          </Link>
        </div>
        {navbarRight}
      </div>
    );
  }
}
export default Navbar;
