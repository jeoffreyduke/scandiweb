import React, { Component } from "react";
import { connect } from "react-redux";
import { addIntoCart, removeFromCart } from "../provider/cartSlice";
import { incrementCounter } from "../provider/counterSlice";
import "./styles/Cart.css";

const mapStateToProps = (state) => {
  return {
    counter: state.counterSlice.value,
    count: state.cartSlice.count,
  };
};

const mapDispatchToProps = {
  addIntoCart,
  removeFromCart,
  incrementCounter,
};

export class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 1,
      count: this.props.counter,
    };
    this.handleIncrement = this.handleIncrement.bind(this);
    this.handleDecrement = this.handleDecrement.bind(this);
  }

  handleIncrement = () => {
    this.props.addIntoCart(this.props.products);
  };

  handleDecrement = () => {
    this.props.removeFromCart(this.props.products);
  };

  render() {
    return (
      <>
        <div className="item-desc">
          <div className="item-brand">{this.props.productBrand}</div>
          <div className="item-name">{this.props.productName}</div>
          <div className="item-price">
            {this.props.prices.currency.symbol}
            {this.props.prices.amount}
          </div>

          <div className="item-con">
            <div>
              {
                this.props.productAttr[
                  this.props.productAttrData?.map((attr) => {
                    return attr.selectedIndex;
                  }) && 0
                ].name
              }
            </div>
            {this.props.productAttr[
              this.props.productAttrData?.map((attr) => {
                return attr.selectedIndex;
              }) && 0
            ].items.map((item) => {
              return (
                <div key={Math.random() * 2 + item.id} className="item-sizes">
                  <div
                    className="mid"
                    style={{
                      borderColor: item.value,
                      backgroundColor: item.value,
                      color: item.value,
                    }}
                  >
                    {item.value.includes("#") ? "" : item.value}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="item-rep">
          <div className="amount-manip">
            <div className="amount-inc" onClick={this.handleIncrement}>
              +
            </div>
            <div className="item-amount">{this.props.productQuantity}</div>
            <div className="amount-dec" onClick={this.handleDecrement}>
              -
            </div>
          </div>
          <div className="item-img">
            <img src={this.props.productImage} alt="img" />
          </div>
        </div>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product);
