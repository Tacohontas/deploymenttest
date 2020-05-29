import React, { Component } from "react";

import axios from "axios";

class FileUpload extends Component {
  state = {
    image: undefined,
  };

  eventChange(e) {
    this.setState({ image: e.target.files[0] });
  }

  async onSubmitToApi(e) {
    e.preventDefault();

    /* --- Lägga till fil --- */

    const data = new FormData();
    data.append("files", e.target.elements.files.files[0]);

    const res = await axios.post("http://localhost:1337/upload/", data);

    console.log(res);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmitToApi.bind(this)}>
          <input
            type="file"
            name="files"
            onChange={this.eventChange.bind(this)}
          />

          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default FileUpload;
