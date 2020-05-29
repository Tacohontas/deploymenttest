import React, { Component } from "react";
import axios from "axios";

class Upload extends Component {
  state = {
    image: "",
    status: null,
  };

  async onSubmitToApi(e) {
    e.preventDefault();

    /* --- Lägga till post (utan bild) --- */

    const res = await axios({
      method: "post",
      url: "http://localhost:1337/products",
      data: {
        title: e.target.elements.title.value,
        description: e.target.elements.description.value,
        price: e.target.elements.price.value,
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });

    /* --- Ladda upp bild och referera till post --- */
    const formData = new FormData();
    formData.append("files", this.state.image);
    formData.append("ref", "product"); // Refererar till table
    formData.append("refId", res.data.id); // Hämtat post-id från vår post vi skapade.
    formData.append("field", "image"); // Refererar till column i vår table

    axios(
      // .post("http://localhost:1337/upload", data)
      {
        method: "post",
        url: "http://localhost:1337/upload",
        data: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      }
    )
      .then((response) => {
        // Handle success
        console.log("Well done");
        console.log(response);
        console.log(response.status);
        this.setState({ status: response.status });
        console.log("from state:", this.state.status);
      })
      .catch((error) => {
        console.log("An error occurred", error);
      });
  }

  onImgUploadChange(e) {
    this.setState({ image: e.target.files[0] });
    let previewOutput = document.querySelector(".card_img-top");
    previewOutput.style.visibility = "visible";
    previewOutput.src = URL.createObjectURL(e.target.files[0]);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmitToApi.bind(this)}>
          <img
            className={"card_img-top"}
            alt="preview of upload"
            style={{ visibility: "hidden" }}
          />
          <input type="text" name="title" placeholder="Title" />
          <input type="text" name="description" placeholder="Description" />
          <input type="number" name="price" placeholder="Price" />
          <label htmlFor={"img__upload"} className={"button__secondary"}>
            Ladda upp bild
          </label>
          <input
            id={"img__upload"}
            type="file"
            name="file"
            onChange={this.onImgUploadChange.bind(this)}
            required
          />
          <button className={"button__success"}>Skapa produkt</button>
        </form>

        {this.state.status === 200 && <h3>Produkt skapad!</h3>}
      </div>
    );
  }
}

export default Upload;
