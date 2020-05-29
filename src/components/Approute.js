import React, { Component } from "react";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import myBookings from "../pages/myBookings";
import App from "./App";
import AdminForm from "./Upload";
import Navbar from "./Navbar";
import Book from "../pages/Book";
import AdminZone from "../pages/Adminzone";
import EditProducts from "../pages/EditProducts";
// import UserLogin from "./AuthUser/UserLogin";
import UserProfile from "./AuthUser/UserProfile";
import UserPage from "./AuthUser/UserPage";
import Contact from "./Contact";
import ForgotPassword from "../pages/ForgotPassword";

class Approute extends Component {
  state = {
    adminLoginStatus: null,
    user: null,
  };

  componentDidMount() {
    console.log("approute mounted");
    this.setState({ adminLoginStatus: localStorage.getItem("jwt") });
  }

  componentDidUpdate() {
    console.log("approute updated");
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <Navbar
            adminLoginStatus={this.state.adminLoginStatus}
            // Sätter adminLoginStatus till state.adminLoginStatus
            handleCallback={(status) => {
              this.setState({ adminLoginStatus: status });
            }}
          />
          <Switch>
            <Route exact path="/" component={App} />
            <Route exact path="/Bookings" component={myBookings} />
            <Route exact path="/Book" component={Book} />
            <Route
              exact
              path="/Admin"
              render={(props) => (
                <AdminZone
                  {...props}
                  adminLogInStatus={(status) => {
                    // Hämtar adminLoginStatus (som är jwt) från adminlogin till state.adminLoginStatus
                    this.setState({ adminLoginStatus: status });
                  }}
                />
              )}
            />
            <Route exact path="/Products" component={EditProducts} />
            <Route exact path="/Create" component={AdminForm} />
            <Route exact path="/Contact" component={Contact} />
            {/* User & Logins */}
            <Route exact path="/forgotpassword" component={ForgotPassword}/>
            <Route exact path="/userpage" component={UserPage} />
            <Route exact path="/userprofile" component={UserProfile} />
            {/* Tester */}
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
export default Approute;
