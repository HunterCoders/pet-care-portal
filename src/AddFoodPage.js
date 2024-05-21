import React from "react";
import { Link } from "react-router-dom";
import "./AddFoodPage.css";

class AddFoodPage extends React.Component {
  componentDidMount() {
    const params = new URLSearchParams(window.location.search);
    const param = params.get("param");
    if (param === "upload") {
      this.setState({ uploadSuccess: true });
    }
  }

  checkParams = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    // Check if all fields are filled
    if (
      !formData.get("name") ||
      !formData.get("quantity") ||
      !formData.get("price") ||
      !formData.get("image") ||
      !formData.get("type")
    ) {
      alert("All fields are required");
      return;
    }

    // Submit form
    event.target.submit();
  };

  render() {
    return (
      <div className="container">
        <form
          onSubmit={this.checkParams}
          action="/addFood"
          method="post"
          encType="multipart/form-data"
          className="form-container"
        >
          <h1 style={{ textAlign: "center" }}>Add Food and Supplies</h1>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="quantity">Quantity:</label>
            <input
              type="text"
              id="quantity"
              name="quantity"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price:</label>
            <input
              type="text"
              id="price"
              name="price"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="image">Image:</label>
            <input
              type="file"
              id="image"
              name="image"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="type">Type:</label>
            <select id="type" name="type" className="form-control">
              <option value="">Select Type</option>
              <option value="wet">Wet</option>
              <option value="dry">Dry</option>
            </select>
          </div>
          <button type="submit" className="btn-submit">
            Submit
          </button>
          {this.state && this.state.uploadSuccess && (
            <div
              className="registered"
              style={{ color: "green", textAlign: "center" }}
            >
              Uploaded successfully
            </div>
          )}
          <div className="already-registered">
            {/* Already registered? <Link to="/docLogin">Click Here</Link> */}
          </div>
          
        </form>
      </div>
    );
  }
}

export default AddFoodPage;
