import React from "react";

const CardPreview = (props) => {
  return (
    <div className={"card__preview"}>
      <div className={"card__body"}>
        <h3 className={"card__title"}>{props.title}</h3>
        <p className={"card__price"}>{props.price}kr</p>
        <button className={props.btnStyle}>{props.label}</button>
      </div>
    </div>
  );
};

export default CardPreview;
