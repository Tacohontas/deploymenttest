import React, { Component } from "react";
// import { Link } from "react-router-dom";
import firebase from "../FirebaseConfig";

class Card_firebase extends Component {
  onClickSaveToFirestore() {
    const docRef = firebase
      .firestore()
      .collection("booking")
      .doc(this.props.docId.toString());

    docRef.set({
      name: this.props.title,
      description: this.props.desc,
      price: this.props.price,
    });
  }

  render() {
    return (
      <div className={"card"}>
        <img src={this.props.image} className={"card_img-top"} alt={"Product"} />
        <div className={"card__body"}>
          <h3 className={"card__title"}>{this.props.title}</h3>
          <p className={"card__text"}>{this.props.desc}</p>
          <p className={"card__price"}>{this.props.price}kr</p>

          <button
            className={"button__success"}
            onClick={this.onClickSaveToFirestore.bind(this)}
          >
            Boka nu
          </button>
        </div>
      </div>
    );
  }
}

export default Card_firebase;
