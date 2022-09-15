import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchProductData } from "../provider/pdpSlice";
import { fetchProductById } from "../provider/pIdSlice";
import { handleSwitch } from "../provider/csSlice";
import {
  addIntoCart,
  removeFromCart,
  setNewAttributeSelectedIndex,
} from "../provider/cartSlice";
import "./styles/PDP.css";

const mapStateToProps = (state) => {
  return {
    productData: state.pdpSlice.value,
    currencyIndex: state.csSlice.value,
    productById: state.pIdReducer.value,
    cartData: state.cartSlice.products,
    attrData: state.cartSlice.attrData,
  };
};

const mapDispatchToProps = {
  fetchProductData,
  handleSwitch,
  fetchProductById,
  addIntoCart,
  removeFromCart,
  setNewAttributeSelectedIndex,
};

class ProductDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAttributes: [],
      imageSrc: this.props.productData.gallery[0],
    };
    this.handleAddToCart = this.handleAddToCart.bind(this);
  }

  handleAddToCart = (product) => {
    this.props.addIntoCart(product);
  };

  setSelectedChip(attrName, attrindex) {
    if (this.state.selectedAttributes.find((el) => el.name === attrName)) {
      const newSelectedAttributes = this.state.selectedAttributes.map((el) =>
        el.name === attrName
          ? {
              ...el,
              selectedIndex: attrindex,
            }
          : el
      );
      this.setState(() => ({ selectedAttributes: newSelectedAttributes }));
    } else {
      this.setState((prevState) => ({
        selectedAttributes: [
          ...prevState.selectedAttributes,
          {
            name: attrName,
            selectedIndex: attrindex,
          },
        ],
      }));
    }

    this.props.setNewAttributeSelectedIndex(attrName, attrindex);
  }

  componentDidMount() {
    this.props.fetchProductById(this.props.productData.id);
  }

  render() {
    return (
      <div className="PDP">
        <div className="small-imgs-con">
          <div className="small-imgs">
            {this.props.productData.gallery.map((pic) => {
              return (
                <img
                  key={Math.random()}
                  src={pic}
                  alt="img"
                  onClick={() => this.setState({ imageSrc: pic })}
                />
              );
            })}
          </div>
        </div>

        <div className="big-img">
          <img src={this.state.imageSrc} alt="img" />
        </div>
        <div className="desc">
          <div className="pdp-brand">{this.props.productById.brand}</div>
          <div className="pdp-name">{this.props.productData.name}</div>
          {this.props.productById.attributes &&
            this.props.productById.attributes.map((attr, index) => {
              return (
                <div key={attr.id} className="pdp-sizes">
                  <span>{attr.name}:</span>
                  {attr.items.map((item) => {
                    return (
                      <div key={item.id} className="item-con">
                        <div
                          className="pdp-mid"
                          style={{
                            backgroundColor: item.value,
                            color: item.value,
                          }}
                          onClick={() => this.setSelectedChip(attr.name, index)}
                        >
                          {item.value.includes("#") ? "" : item.value}
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          <div className="pdp-price">
            <span>PRICE:</span>
            {
              this.props.productData.prices[this.props.currencyIndex].currency
                .symbol
            }
            {this.props.productData.prices[this.props.currencyIndex].amount}
          </div>
          <div className="pdp-btn">
            <button
              onClick={() =>
                this.handleAddToCart({
                  product: {
                    data: this.props.productById,
                    attributeData: this.state.selectedAttributes,
                  },
                })
              }
              className={this.props.productById.inStock ? "" : "nostock"}
              disabled={!this.props.productById.inStock}
            >
              {this.props.productById.inStock
                ? "ADD TO CART"
                : "ITEM NOT IN STOCK"}
            </button>
          </div>
          <div
            className="desc"
            dangerouslySetInnerHTML={{
              __html: this.props.productById.description,
            }}
          />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDisplay);
