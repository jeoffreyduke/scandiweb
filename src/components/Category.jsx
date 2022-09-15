import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./styles/Category.css";
import { fetchData } from "../provider/globalSlice";
import { handleApp } from "../provider/appSlice";
import { handleSwitch } from "../provider/csSlice";
import { fetchProductData } from "../provider/pdpSlice";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    data: state.globalReducer.value,
    productData: state.pdpSlice.value,
    categoryIndex: state.appSlice.value,
    currencyIndex: state.csSlice.value,
  };
};

const mapDispatchToProps = {
  fetchData,
  handleApp,
  handleSwitch,
  fetchProductData,
};

class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: this.props.data.categories,
    };
    this.displayProduct = this.displayProduct.bind(this);
  }

  displayProduct = (product) => {
    this.props.fetchProductData(product);
  };

  componentDidMount() {
    this.props.fetchData(this.props.data);
  }

  render() {
    return (
      <div className="Category">
        <p>
          {this.state.categories
            ? this.state?.categories[this.props.categoryIndex].name
            : null}
        </p>
        <div className="category-con">
          <div className="product-con">
            {this.state.categories &&
              this.state.categories[this.props.categoryIndex].products.map(
                (product) => {
                  return (
                    <div key={product.id}>
                      <Link to="/product-display" end="true" className="link">
                        <div
                          className={
                            !product.inStock
                              ? "product-display overlay"
                              : "product-display"
                          }
                          onClick={() => this.displayProduct(product)}
                        >
                          <p
                            className={
                              !product.inStock
                                ? "product-ol ol-display"
                                : "product-ol"
                            }
                          >
                            OUT OF STOCK
                          </p>
                          <div className="product-img">
                            <img src={product.gallery[0]} alt="img" />
                          </div>
                          <div className="product-name">{product.name}</div>
                          <div className="product-price">
                            {
                              product.prices[this.props.currencyIndex].currency
                                .symbol
                            }
                            {product.prices[this.props.currencyIndex].amount}
                          </div>
                        </div>
                      </Link>
                    </div>
                  );
                }
              )}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Category);
