import React, { Component } from "react";
import "./styles/PDP.css";

class PDP extends Component {
  render() {
    return (
      <div className="PDP">
        <div className="small-imgs"></div>
        <div className="big-img"></div>
        <div className="desc">
          <div className="pdp-brand">Apollo</div>
          <div className="pdp-name">Running Short</div>
          <div className="pdp-sizes">
            <span>SIZE:</span>
            <div className="pdp-small">S</div>
            <div className="pdp-mid">M</div>
            <div className="pdp-mid">M</div>
            <div className="pdp-mid">M</div>
          </div>
          <div className="pdp-price">
            <span>PRICE:</span>$50.00
          </div>
          <div className="pdp-btn">
            <button>ADD TO CART</button>
          </div>
          <div className="pdp-desc">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam
            culpa quos aliquid molestias voluptatem excepturi, amet unde nobis
            hic non earum eum quia aliquam cum? Excepturi, error. Natus, dolorum
            illum!
          </div>
        </div>
      </div>
    );
  }
}

export default PDP;
