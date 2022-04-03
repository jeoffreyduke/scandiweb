import React, { Component } from "react";
import "./styles/Category.css";

class Category extends Component {
  render() {
    return (
      <div className="Category">
        <p>Category name</p>
        <div className="product-display">
          <div className="product-img"></div>
          <div className="product-name">product name</div>
          <div className="product-price">$50.00</div>
        </div>
      </div>
    );
  }
}

export default Category;
