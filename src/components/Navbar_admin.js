import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../styles/_app.scss";
import firebase from "./FirebaseConfig";

// Vi får adminLoginStatus prop från Approute.
// prop = null om user ej är inloggad
// prop = jwt om user är inloggad

class NavbarAdmin extends Component {
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
            <Link to="/Admin">Adminpanel</Link>
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
export default NavbarAdmin;
