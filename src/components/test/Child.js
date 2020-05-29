import React, { Component } from "react";

export default class Child extends Component {

    state={
        test: "testing from child"
    }

  render() {
    return <div>Child's getting {this.props.callback("lite data via callback")}</div>;
  }
}
