import React, { Component } from "react";
import firebase from "../FirebaseConfig";

class FirebaseTest extends Component {
  onClickFirebase() {

    const db = firebase.firestore();
    const docRef = db.firestore().collection("booking").doc("info");
    const docRef2 = db.firestore().collection("booking").doc("info2");

    // Läser data från firebase
    docRef.get().then((booking) => {
      if (booking.exists) {
        console.log("document data: ", booking.data());
      } else {
        console.log("error");
      }
    });

    // Skriva data till firebase
    docRef.set({
      item: "testitem",
      price: 2000,
    });

    docRef2.set({
      item: "test 2",
      price: 3000,
    });
  }

  render() {
    return (
      <div>
        <button onClick={this.onClickFirebase.bind(this)}>
          Hämta firestore info
        </button>
      </div>
    );
  }
}

export default FirebaseTest;
