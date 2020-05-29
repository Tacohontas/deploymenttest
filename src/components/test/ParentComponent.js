import React, { Component } from "react";
import Child from "./Child";

export default class ParentComponent extends Component {


    
  render() {
    return (
      <div>
        <h1>Text från parent</h1>
        <Child
          testing={"test text from parent"}
          callback={(e) => {
            console.log(e, "parent fångar in data");
          }}
        />
      </div>
    );
  }
}
