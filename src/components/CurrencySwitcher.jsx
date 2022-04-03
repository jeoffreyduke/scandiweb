import React, { Component } from "react";
import "./styles/CurrencySwitcher.css";

class CurrencySwitcher extends Component {
  render() {
    return (
      <div className="CurrencySwitcher">
        <div className="currency">$ USD</div>
        <div className="currency">€ EUR</div>
        <div className="currency">¥ JPY</div>
      </div>
    );
  }
}

export default CurrencySwitcher;
