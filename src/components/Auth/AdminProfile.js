import React, { Component } from "react";

import AdminForm from "../Upload";
import EditProducts from "../../pages/EditProducts";

// När admin är inloggad kommer hen hit

class AdminProfile extends Component {
  state = {
    products: [],
    view: "default",
    status: null,
    msg:"",
  };

  onClickChangeState(e) {
    this.setState({ view: e.target.getAttribute("data-type") });
  }

  render() {
    return (
      <div className={"adminprofile_body"}>
        <div className={"adminprofile__left"}>
          <button
            className={"button__secondary"}
            onClick={this.onClickChangeState.bind(this)}
            data-type="edit"
          >
            Visa produkter
          </button>
          <button
            className={"button__secondary"}
            onClick={this.onClickChangeState.bind(this)}
            data-type="create"
          >
            Skapa produkt
          </button>
        </div>

        <div className={"adminprofile__right"}>
          {this.state.view === "default" && ( // Om view = landing (default)
            <div className={"welcomeBox"}>
              <h1>Välkommen till adminsidan!</h1>
              <br />
    {this.state.status === 200 && <h1>{this.state.msg}</h1>}
            </div>
          )}

          {
            this.state.view === "edit" && (
              <EditProducts
                dataFromEditProducts={(viewCallback, statusCallback, msgCallback) => {
                  this.setState({ view: viewCallback, status: statusCallback, msg: msgCallback });
                }}
              />
            ) // Om view = edit
          }

          {
            this.state.view === "create" && <AdminForm /> // Om view = create
          }
        </div>
      </div>
    );
  }
}

export default AdminProfile;
