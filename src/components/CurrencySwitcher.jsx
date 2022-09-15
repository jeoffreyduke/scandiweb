import React, { Component } from "react";
import { fetchData } from "../provider/globalSlice";
import { connect } from "react-redux";
import { handleSwitch } from "../provider/csSlice";
import "./styles/CurrencySwitcher.css";

const mapStateToProps = (state) => {
  return {
    data: state.globalReducer.value,
  };
};

const mapDispatchToProps = {
  fetchData,
  handleSwitch,
};

class CurrencySwitcher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currencies: this.props.data.currencies,
    };
    this.switchDollar = this.switchDollar.bind(this);
    this.switchGBP = this.switchGBP.bind(this);
    this.switchAUD = this.switchAUD.bind(this);
    this.switchJaps = this.switchJaps.bind(this);
    this.switchRUB = this.switchRUB.bind(this);
  }

  switchDollar = () => {
    this.props.handleSwitch(0);
  };

  switchGBP = () => {
    this.props.handleSwitch(1);
  };

  switchAUD = () => {
    this.props.handleSwitch(2);
  };

  switchJaps = () => {
    this.props.handleSwitch(3);
  };

  switchRUB = () => {
    this.props.handleSwitch(4);
  };

  render() {
    return (
      <div
        className={
          this.props.clicked ? "CurrencySwitcher active" : "CurrencySwitcher"
        }
      >
        <div className="currency" onClick={this.switchDollar}>
          $ USD
        </div>
        <div className="currency" onClick={this.switchGBP}>
          £ GBP
        </div>
        <div className="currency" onClick={this.switchAUD}>
          A$ AUD
        </div>
        <div className="currency" onClick={this.switchJaps}>
          ¥ JPY
        </div>
        <div className="currency" onClick={this.switchRUB}>
          ₽ RUB
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrencySwitcher);
