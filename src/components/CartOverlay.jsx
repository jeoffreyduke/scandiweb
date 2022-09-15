import React, { Component } from "react";
import { connect } from "react-redux";
import { addIntoCart, removeFromCart } from "../provider/cartSlice";
import { handleSwitch } from "../provider/csSlice";
import { incrementCounter } from "../provider/counterSlice";
import "./styles/CartOverlay.css";
import { Link } from "react-router-dom";

const mapStateToProps = (state) => {
  return {
    cartData: state.cartSlice.products,
    price: state.pdpSlice.value.prices,
    cartSize: state.cartSlice.totalItemQuantity,
    currencyIndex: state.csSlice.value,
    counter: state.counterSlice.value,
  };
};

const mapDispatchToProps = {
  addIntoCart,
  removeFromCart,
  handleSwitch,
  incrementCounter,
};

export class CartOverlay extends Component {
  constructor(props) {
    super(props);
    this.handleIncrement = this.handleIncrement.bind(this);
    this.handleDecrement = this.handleDecrement.bind(this);
    this.addTax = this.addTax.bind(this);
  }

  handleIncrement = (products) => {
    this.props.addIntoCart(products);
  };

  handleDecrement = (products) => {
    this.props.removeFromCart(products);
  };

  addTax(size) {
    return size * 5;
  }

  incrementTotalPrice(tempTotalPrice, item) {
    let totalPrice = tempTotalPrice;
    for (let i = 0; i < item.quantity; i += 1) {
      const price = item.product.data.prices[this.props.currencyIndex];
      totalPrice += price.amount;
    }
    return totalPrice;
  }

  render() {
    let tempTotalPrice = 0;
    return (
      <div
        className={this.props.clicked ? "CartOverlay active" : "CartOverlay"}
      >
        <div className="bag">
          <strong>My Bag: </strong>
          {this.props.cartSize} items
        </div>
        {this.props.cartData?.map((products) => {
          tempTotalPrice = this.incrementTotalPrice(tempTotalPrice, products);
          return (
            <div key={Math.random() + products.id} className="ov-cart-item">
              <div className="ov-item-desc">
                <div className="ov-item-name">{products.product.data.name}</div>
                <div className="ov-item-price">
                  {
                    products.product.data.prices[this.props.currencyIndex]
                      .currency.symbol
                  }
                  {
                    products.product.data.prices[this.props.currencyIndex]
                      .amount
                  }
                </div>

                {products.product.attributeData.map((data) => {
                  return (
                    <div key={Math.random() + data.name + "jes"}>
                      <div className="ov-attr-label">{data.name}</div>
                      {products.product.data.attributes[
                        data.selectedIndex ?? 0
                      ].items.map((item) => {
                        return (
                          <div
                            key={Math.random() + data.name + "jas"}
                            className="attr-con"
                          >
                            <div className="ov-item-sizes">
                              <div
                                className="ov-mid"
                                style={{
                                  borderColor: item.value,
                                  backgroundColor: item.value,
                                  color: item.value,
                                }}
                              >
                                {item.value.includes("#") ? "" : item.value}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>

              <div className="ov-item-rep">
                <div className="ov-amount-manip">
                  <div
                    className="ov-amount-inc"
                    onClick={() => this.handleIncrement(products)}
                  >
                    +
                  </div>
                  <div className="ov-item-amount">{products.quantity}</div>
                  <div
                    className="ov-amount-dec"
                    onClick={() => this.handleDecrement(products)}
                  >
                    -
                  </div>
                </div>
                <div className="ov-item-img">
                  <img src={products.product.data.gallery[0]} alt="img" />
                </div>
              </div>
            </div>
          );
        })}

        <div className="ov-extras">
          <div className="ov-total">
            Total:
            <strong>
              {this.props.price
                ? this.props.price[this.props.currencyIndex].currency.symbol
                : ""}
              {Math.round((tempTotalPrice + Number.EPSILON) * 100) / 100 +
                this.addTax(this.props.cartSize)}
            </strong>
          </div>
          <div className="ov-btns">
            <Link to="/cart" end="true">
              <button className="ov-view">View Bag</button>
            </Link>
            <button className="ov-checkout">Check Out</button>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartOverlay);
