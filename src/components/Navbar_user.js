import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../styles/_app.scss";
import firebase from "./FirebaseConfig";

// Vi får adminLoginStatus prop från Approute.
// prop = null om user ej är inloggad
// prop = jwt om user är inloggad

class NavbarUser extends Component {

  onClickLogOut() {
    localStorage.clear();
    window.location.reload(false);
    firebase.auth().signOut();
  }

  render() {
    return (
      <div className="navbar_right">
        <ul>
          <li>
            <Link to="/Userpage">Min profil</Link>
          </li>
          <li>
            <Link to="/Contact">Kontakt</Link>
          </li>
          <li>
            <Link onClick={this.onClickLogOut.bind(this)} to="/">
              Logga ut
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}
export default NavbarUser;
