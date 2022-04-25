import React, { Component } from "react";
import Product from "./Product";
import { connect } from "react-redux";
import { addIntoCart, removeFromCart } from "../provider/cartSlice";
import { handleSwitch } from "../provider/csSlice";
import { incrementCounter } from "../provider/counterSlice";
import "./styles/Cart.css";
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

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 1,
    };
    this.addTax = this.addTax.bind(this);
  }

  incrementTotalPrice(tempTotalPrice, item) {
    let totalPrice = tempTotalPrice;
    for (let i = 0; i < item.quantity; i += 1) {
      const price = item.product.data.prices[this.props.currencyIndex];
      totalPrice += price.amount;
    }
    return totalPrice;
  }

  addTax(size) {
    return size * 5;
  }

  render() {
    let tempTotalPrice = 0;
    return (
      <div className="Cart">
        <p>CART</p>
        {this.props.cartData?.map((products) => {
          tempTotalPrice = this.incrementTotalPrice(tempTotalPrice, products);
          return (
            <div key={Math.random() + products.id} className="cart-item">
              <Product
                products={products}
                prices={products.product.data.prices[this.props.currencyIndex]}
                productId={products.id}
                productName={products.product.data.name}
                productBrand={products.product.data.brand}
                productImage={products.product.data.gallery[0]}
                productQuantity={products.quantity}
                productAttr={products.product.data.attributes}
                productAttrData={products.product.attributeData}
              />
            </div>
          );
        })}

        <div className="extras">
          <div className="tax">
            Tax:{" "}
            <strong>
              {this.props.price[this.props.currencyIndex].currency.symbol}
              {this.addTax(this.props.cartSize)}
            </strong>
          </div>
          <div className="qty">
            <span>
              Qty: <strong>{this.props.cartSize}</strong>
            </span>
          </div>

          <div className="total">
            Total:
            <strong>
              {this.props.price[this.props.currencyIndex].currency.symbol}
              {Math.round((tempTotalPrice + Number.EPSILON) * 100) / 100 +
                this.addTax(this.props.cartSize)}
            </strong>
          </div>
          <Link to="/">
            <button className="order-btn">Order</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
