import React, { Component } from "react";
import { Link } from "react-router-dom";

class Card extends Component {
  render() {
    return (
      <div className={"card"}>
        <img src={this.props.image} className={"card_img-top"} alt={"People"} />
        <div className={"card__body"}>
          <h3 className={"card__title"}>{this.props.title}</h3>
          <p className={"card__text"}>{this.props.desc}</p>
          <p className={"card__price"}>{this.props.price}kr</p>
          <Link
            to={{
              pathname: this.props.link,
              state: {
                productId: this.props.docId,
                title: this.props.title,
                desc: this.props.desc,
                price: this.props.price,
              },
            }}
            className={"button__success"}
          >
            {this.props.label}
          </Link>
        </div>
      </div>
    );
  }
}

export default Card;
