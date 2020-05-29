import React, { Component } from "react";
import firebase from "../FirebaseConfig";
import { Link } from "react-router-dom";

class UserProfile extends Component {
  state = {
    providerId: null,
    providerUId: null,
    displayName: null,
    email: null,
    profilePicture: null,
    editInfo: false,
    errorMsg: null,
    imageToUpload: null,
    msg: null,
  };

  componentDidMount() {
    var user = firebase.auth().currentUser;

    this.setState({
      providerId: user.providerId,
      providerUId: user.uid,
      displayName: user.displayName,
      email: user.email,
      profilePicture: user.photoURL,
    });
  }

  componentDidUpdate() {
    // if (this.state.editInfo === "USER_INFO") {
    //   document.querySelector(
    //     'input[name="username"]'
    //   ).value = this.state.displayName;
    // }
    // if(this.state.editInfo === "EMAIL"){
    //   document.querySelector('input[name="email"]').value = this.state.email;
    // }
  }

  onClickEditable() {
    this.state.editInfo
      ? this.setState({ editInfo: false })
      : this.setState({ editInfo: true });
  }

  onClickEditUserInfo() {
    this.setState({ editInfo: "USER_INFO", msg: null });
  }
  onClickEditUserEmail() {
    this.setState({ editInfo: "EMAIL", msg: null });
  }
  onClickEditUserPw() {
    this.setState({ editInfo: "PASSWORD", msg: null });
  }

  logOut() {
    localStorage.clear();
    firebase.auth().signOut();
    window.location.reload(false);
  }

  deleteAccount() {
    var user = firebase.auth().currentUser;

    // Use 'that' when you want to set state inside of a promise.
    var that = this;

    user
      .delete()
      .then(function () {
        //user deleted
        localStorage.clear();
        window.location.reload(false);
      })
      .catch(function (error) {
        // use 'that' variable here
        that.setState({ errorMessage: error.message });
        console.log(error);
      });
  }

  async onSubmitUpdateProfile(e) {
    e.preventDefault();
    console.log("submit");

    console.log(e);
    // Use 'that' when wanting to set state inside of promise.
    var that = this;

    var user = firebase.auth().currentUser;

    if (this.state.editInfo === "USER_INFO2") {
      const fileInput = document.querySelector("#img__upload");

      if (!fileInput.disabled) {
        // fileInput is disabled if we don't want to update image.
        // Upload image
        console.log("input isnt disabled");

        // Create a root reference
        var storageRef = firebase
          .storage()
          .ref(user + "/profilePicture/" + this.state.imageToUpload.name);

        storageRef
          .put(this.state.imageToUpload)
          .then(function (snapshot) {
            console.log("Uploaded a blob or file!");
          })
          .catch(function (error) {
            // An error happened.
            console.log(error);
          });
      }

      // UPDATE PHOTO ASWELL
      user
        .updateProfile({
          displayName: e.target.elements.username.value,
        })
        .then(function () {
          // Update successful.
          console.log("displayname updated");
          that.setState({ msg: "Användarnamnet har uppdateras!" });
        })
        .catch(function (error) {
          // An error happened.
          console.log(error);
          that.setState({ msg: "Användarnamnet kunde ej uppdateras!" });

          // this.props.dataFromUserProfile(error.message);
        });
    }

    if (this.state.editInfo === "USER_INFO") {
      const photoUrlInput = document.querySelector('input[name="photoUrl"]')
        .value;
      const usernameInput = document.querySelector('input[name="username"]')
        .value;

      if (photoUrlInput.length > 0) { 
        user
          .updateProfile({
            photoURL: photoUrlInput,
          })
          .then(function () {
            // Update successful.
            console.log("photoURL updated");
            that.setState({ msg: "Profilbilden har uppdateras!" });
          })
          .catch(function (error) {
            // An error happened.
            console.log(error);
            that.setState({ msg: "Profilbilden kunde ej uppdateras!" });
          });
      }

      if (usernameInput.length > 0) {
        user
          .updateProfile({
            displayName: e.target.elements.username.value,
          })
          .then(function () {
            // Update successful.
            console.log("displayname updated");
            that.setState({ msg: "Användarnamnet har uppdateras!" });
          })
          .catch(function (error) {
            // An error happened.
            console.log(error);
            that.setState({ msg: "Användarnamnet kunde ej uppdateras!" });
          });
      }
    }
    if (this.state.editInfo === "EMAIL") {
      let passwordInput = document.querySelector('input[name="password"]')
        .value;
      let emailInput = document.querySelector('input[name="email"]').value;

      let credentials = firebase.auth.EmailAuthProvider.credential(
        user.email,
        passwordInput
      );

      user
        .reauthenticateWithCredential(credentials)
        .then(function () {
          user
            .updateEmail(emailInput)
            .then(function () {
              // Update successful.
              that.setState({ msg: "Email uppdaterades!" });
              console.log("email updated");
            })
            .catch(function (error) {
              // An error happened.
              that.setState({ msg: "Kunde inte byta mailadress." });

              console.log(error);
            });
        })
        .catch(function (error) {
          console.log(error);
          that.setState({ msg: "Fel lösenord. Försök igen" });
        });
    }

    if (this.state.editInfo === "PASSWORD") {
      // update password
      var newPassword = document.querySelector('input[name="new_password"]')
        .value;
      let oldPassword = document.querySelector('input[name="old_password"]')
        .value;

      let credentials = firebase.auth.EmailAuthProvider.credential(
        user.email,
        oldPassword
      );

      if (newPassword.length > 0 && oldPassword.length > 0) {
        if (newPassword.length > 5 && oldPassword.length > 5) {
          // Reauthenticate
          user
            .reauthenticateWithCredential(credentials)
            .then(function () {
              // Update password
              user
                .updatePassword(newPassword)
                .then(function () {
                  // Update successful.
                  console.log("password updated");
                  that.setState({ msg: "Lösenord uppdaterades!" });
                })
                .catch(function (error) {
                  // An error happened.
                  that.setState({ msg: "Lösenord kunde ej uppdateras!" });

                  console.log(error.message);
                });
            })
            .catch(function (error) {
              that.setState({ msg: "Fel lösenord. Försök igen!" });

              console.log(error);
            });
        } else {
          that.setState({
            msg: "Lösenordet måste vara minst 6 tecken. Försök igen!",
          });
        }
      } else {
        that.setState({ msg: "Fälten får ej vara tomma. Försök igen!" });
      }
    }
  }

  onClickEnableUpload() {
    const fileInput = document.querySelector("#img__upload");
    fileInput.disabled = false;
  }

  onClickPreviewURL() {
    const photoUrlInput = document.querySelector('input[name="photoUrl"]')
      .value;

    let previewOutput = document.querySelector(".card_img-top");
    previewOutput.src = photoUrlInput;
  }

  onImgUploadChange(e) {
    // Put image in state
    this.setState({ imageToUpload: e.target.files[0] });

    // Preview image
    let previewOutput = document.querySelector(".card_img-top");
    previewOutput.src = URL.createObjectURL(e.target.files[0]);
  }

  render() {
    return (
      <div className="userprofile">
        {this.state.editInfo === false && ( // Default view
          <div className="userprofile__info">
            {!!this.state.profilePicture ? (
              <img src={this.state.profilePicture} alt="profilbild" />
            ) : (
              "ingen profilbild vald"
            )}
            <h4>Användarnamn: {this.state.displayName || "inget valt"}</h4>
            <h4>E-post: {this.state.email}</h4>
            <button
              className="button__secondary"
              onClick={this.onClickEditUserInfo.bind(this)}
            >
              Ändra användarinfo
            </button>
            <button
              className="button__secondary"
              onClick={this.onClickEditUserEmail.bind(this)}
            >
              Uppdatera e-post
            </button>
            <button
              className="button__secondary"
              onClick={this.onClickEditUserPw.bind(this)}
            >
              Ändra lösenord
            </button>
            <Link to={{
              pathname: "/Bookings",
              state: {
                user: this.state.providerUId
               },
            }}className="button__secondary">
              Mina bokningar
            </Link>
            
            <button
              className="button__secondary"
              onClick={this.logOut.bind(this)}
            >
              Logga ut
            </button>
            <button
              className="button__warning"
              onClick={this.deleteAccount.bind(this)}
            >
              Ta bort konto
            </button>
          </div>
        )}

        {this.state.editInfo === "USER_INFO" && ( // Changing user info
          <form
            className={"input_container"}
            onSubmit={this.onSubmitUpdateProfile.bind(this)}
          >
            {
              // Confirmation or error message here
              this.state.msg
            }
            Nuvarande profilbild:
            <img
              src={this.state.profilePicture}
              className={"card_img-top"}
              alt={""}
            />
            <input
              type="text"
              name="photoUrl"
              placeholder="URL till ny profilbild: (https://...)"
            />
            Nuvarande användarnamn: {this.state.displayName || "inget valt"}
            <input
              type="username"
              name="username"
              placeholder="Nytt användarnamn"
            />
            <button
              className={"button__secondary"}
              onClick={this.onClickEditable.bind(this)}
            >
              Avbryt
            </button>
            <button className={"button__success"}>Spara</button>
          </form>
        )}
        {this.state.editInfo === "EMAIL" && ( // Changing user email
          <form
            className={"input_container"}
            onSubmit={this.onSubmitUpdateProfile.bind(this)}
          >
            {
              // Confirmation or error message here
              this.state.msg
            }
            <input type="username" name="email" placeholder="Ny e-post" />
            <input
              type="password"
              name="password"
              placeholder="Skriv in ditt lösenord"
            />

            <button
              className={"button__secondary"}
              onClick={this.onClickEditable.bind(this)}
            >
              Avbryt
            </button>
            <button className={"button__success"}>Spara</button>
          </form>
        )}

        {this.state.editInfo === "PASSWORD" && (
          <form
            className={"input_container"}
            onSubmit={this.onSubmitUpdateProfile.bind(this)}
          >
            {
              // Confirmation or error message here
              this.state.msg
            }
            <input
              type="password"
              name="new_password"
              placeholder="Nytt lösenord"
            />
            <input
              type="password"
              name="old_password"
              placeholder="Ditt gamla lösenord"
            />

            <button
              className={"button__secondary"}
              onClick={this.onClickEditable.bind(this)}
            >
              Avbryt
            </button>
            <button className={"button__success"}>Spara</button>
          </form>
        )}
      </div>
    );
  }
}

export default UserProfile;
