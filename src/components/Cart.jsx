import React, { Component } from "react";
import "./styles/Cart.css";

class Cart extends Component {
  render() {
    return (
      <div className="Cart">
        <p>CART</p>
        <div className="cart-item">
          <div className="item-desc">
            <div className="item-brand">Apollo</div>
            <div className="item-name">Running Short</div>
            <div className="item-price">$50.00</div>
            <div className="item-sizes">
              <div className="small">S</div>
              <div className="mid">M</div>
            </div>
          </div>
          <div className="item-rep">
            <div className="amount-manip">
              <div className="amount-inc">+</div>
              <div className="item-amount">1</div>
              <div className="amount-dec">-</div>
            </div>
            <div className="item-img"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Cart;
