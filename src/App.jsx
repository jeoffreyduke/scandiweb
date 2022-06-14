import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import { handleApp } from "./provider/appSlice";
import { removeFromCart, emptyCart } from "./provider/cartSlice";
import "./App.css";
import Cart from "./components/Cart";
import Category from "./components/Category";
import CurrencySwitcher from "./components/CurrencySwitcher";
import ProductDisplay from "./components/ProductDisplay";
import CartOverlay from "./components/CartOverlay";

const mapStateToProps = (state) => {
  return {
    cartSize: state.cartSlice.totalItemQuantity,
  };
};

const mapDispatchToProps = {
  handleApp,
  removeFromCart,
  emptyCart,
};

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      csACtive: false,
      ovActive: false,
      allActive: true,
      clotheActive: false,
      techActive: false,
    };
    this.switchClothes = this.switchClothes.bind(this);
    this.switchTech = this.switchTech.bind(this);
    this.switchAll = this.switchAll.bind(this);
    this.handleDropDown = this.handleDropDown.bind(this);
    this.showCartOverlay = this.showCartOverlay.bind(this);
  }

  componentDidMount() {
    this.props.emptyCart();
  }

  switchAll = () => {
    this.props.handleApp(0);
    this.setState({
      allActive: true,
      clotheActive: false,
      techActive: false,
    });
  };

  switchClothes = () => {
    this.props.handleApp(1);
    this.setState({
      clotheActive: true,
      allActive: false,
      techActive: false,
    });
  };

  switchTech = () => {
    this.props.handleApp(2);
    this.setState({
      techActive: true,
      allActive: false,
      clotheActive: false,
    });
  };

  handleDropDown = () => {
    this.setState({
      csACtive: !this.state.csACtive,
    });
  };

  showCartOverlay = () => {
    this.setState({
      ovActive: !this.state.ovActive,
    });
  };

  render() {
    return (
      <div className={this.state.ovActive ? "App active" : "App"}>
        <header
          className={this.state.ovActive ? "App-header h-active" : "App-header"}
        >
          <nav>
            <ul>
              <li
                className={this.state.allActive ? "all green" : "all"}
                onClick={this.switchAll}
              >
                ALL
                <div />
              </li>
              <li
                className={
                  this.state.clotheActive ? "clothes green" : "clothes"
                }
                onClick={this.switchClothes}
              >
                CLOTHES
                <div />
              </li>
              <li
                className={this.state.techActive ? "tech green" : "tech"}
                onClick={this.switchTech}
              >
                TECH
                <div />
              </li>
            </ul>
          </nav>
          <div className="brand-logo">
            <Link to="./" end="true">
              <svg
                width="33"
                height="31"
                viewBox="0 0 33 31"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M30.0222 23.6646C30.0494 23.983 29.8009 24.2566 29.4846 24.2566H3.46924C3.15373 24.2566 2.90553 23.9843 2.93156 23.6665L4.7959 0.912269C4.8191 0.629618 5.05287 0.412109 5.33372 0.412109H27.5426C27.8226 0.412109 28.0561 0.628527 28.0801 0.910361L30.0222 23.6646Z"
                  fill="#1DCF65"
                />
                <path
                  d="M32.0988 29.6014C32.1313 29.9985 31.8211 30.339 31.4268 30.339H1.59438C1.2009 30.339 0.890922 30.0002 0.922082 29.6037L3.06376 2.34717C3.09168 1.9927 3.38426 1.71973 3.73606 1.71973H29.1958C29.5468 1.71973 29.8391 1.99161 29.868 2.34499L32.0988 29.6014Z"
                  fill="url(#paint0_linear_150_362)"
                />
                <path
                  d="M15.9232 21.6953C12.0402 21.6953 8.88135 17.8631 8.88135 13.1528C8.88135 12.9075 9.07815 12.7085 9.32109 12.7085C9.56403 12.7085 9.76084 12.9073 9.76084 13.1528C9.76084 17.3732 12.5253 20.8067 15.9234 20.8067C19.3214 20.8067 22.0859 17.3732 22.0859 13.1528C22.0859 12.9075 22.2827 12.7085 22.5257 12.7085C22.7686 12.7085 22.9654 12.9073 22.9654 13.1528C22.9653 17.8631 19.8062 21.6953 15.9232 21.6953Z"
                  fill="white"
                />
                <path
                  d="M20.2581 13.0337C20.1456 13.0337 20.0331 12.9904 19.9471 12.9036C19.7754 12.7301 19.7754 12.4488 19.9471 12.2753L22.226 9.97292C22.3084 9.88966 22.4203 9.84277 22.5369 9.84277C22.6536 9.84277 22.7654 9.88952 22.8479 9.97292L25.1045 12.2529C25.2762 12.4264 25.2762 12.7077 25.1045 12.8812C24.9327 13.0546 24.6543 13.0547 24.4826 12.8812L22.5368 10.9155L20.569 12.9036C20.4831 12.9904 20.3706 13.0337 20.2581 13.0337Z"
                  fill="white"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_150_362"
                    x1="25.8733"
                    y1="26.3337"
                    x2="7.51325"
                    y2="4.9008"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#52D67A" />
                    <stop offset="1" stopColor="#5AEE87" />
                  </linearGradient>
                </defs>
              </svg>
            </Link>
          </div>

          <div className="cart-div">
            <div className="dollar" onClick={this.handleDropDown}>
              <svg
                width="39"
                height="30"
                viewBox="0 0 39 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M32 16.5L35 19.5L38 16.5"
                  stroke="black"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M15.13 20.798L16.138 20.816V23.426H15.13V20.798ZM15.22 20.6V9.638L16.03 9.512V20.636L15.22 20.6ZM15.13 6.83H16.138V9.404L15.13 9.53V6.83ZM19.144 11.402C19 11.234 18.808 11.072 18.568 10.916C18.328 10.76 18.058 10.622 17.758 10.502C17.458 10.37 17.128 10.268 16.768 10.196C16.42 10.112 16.054 10.07 15.67 10.07C14.686 10.07 13.96 10.256 13.492 10.628C13.024 11 12.79 11.51 12.79 12.158C12.79 12.614 12.91 12.974 13.15 13.238C13.39 13.502 13.756 13.718 14.248 13.886C14.752 14.054 15.388 14.228 16.156 14.408C17.044 14.6 17.812 14.834 18.46 15.11C19.108 15.386 19.606 15.758 19.954 16.226C20.302 16.682 20.476 17.294 20.476 18.062C20.476 18.674 20.356 19.208 20.116 19.664C19.888 20.108 19.564 20.48 19.144 20.78C18.724 21.068 18.232 21.284 17.668 21.428C17.104 21.56 16.492 21.626 15.832 21.626C15.184 21.626 14.548 21.56 13.924 21.428C13.312 21.284 12.73 21.08 12.178 20.816C11.626 20.552 11.11 20.222 10.63 19.826L11.404 18.458C11.596 18.662 11.842 18.866 12.142 19.07C12.454 19.262 12.802 19.442 13.186 19.61C13.582 19.778 14.008 19.916 14.464 20.024C14.92 20.12 15.388 20.168 15.868 20.168C16.78 20.168 17.488 20.006 17.992 19.682C18.496 19.346 18.748 18.86 18.748 18.224C18.748 17.744 18.604 17.36 18.316 17.072C18.04 16.784 17.626 16.544 17.074 16.352C16.522 16.16 15.85 15.968 15.058 15.776C14.194 15.56 13.468 15.326 12.88 15.074C12.292 14.81 11.848 14.468 11.548 14.048C11.26 13.628 11.116 13.082 11.116 12.41C11.116 11.594 11.314 10.904 11.71 10.34C12.106 9.776 12.652 9.35 13.348 9.062C14.044 8.774 14.83 8.63 15.706 8.63C16.282 8.63 16.816 8.69 17.308 8.81C17.812 8.93 18.28 9.098 18.712 9.314C19.144 9.53 19.54 9.788 19.9 10.088L19.144 11.402Z"
                  fill="#1D1F22"
                />
              </svg>
            </div>

            <div className="cart-size">{this.props.cartSize}</div>
            <div className="cart" onClick={this.showCartOverlay}>
              <svg
                width="20"
                height="19"
                viewBox="0 0 20 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.5613 3.87359C19.1822 3.41031 18.5924 3.12873 17.9821 3.12873H5.15889L4.75914 1.63901C4.52718 0.773016 3.72769 0.168945 2.80069 0.168945H0.653099C0.295301 0.168945 0 0.450523 0 0.793474C0 1.13562 0.294459 1.418 0.653099 1.418H2.80069C3.11654 1.418 3.39045 1.61936 3.47434 1.92139L6.04306 11.7077C6.27502 12.5737 7.07451 13.1778 8.00152 13.1778H16.4028C17.3289 13.1778 18.1507 12.5737 18.3612 11.7077L19.9405 5.50575C20.0877 4.941 19.9619 4.33693 19.5613 3.87365L19.5613 3.87359ZM18.6566 5.22252L17.0773 11.4245C16.9934 11.7265 16.7195 11.9279 16.4036 11.9279H8.00154C7.68569 11.9279 7.41178 11.7265 7.32789 11.4245L5.49611 4.39756H17.983C18.1936 4.39756 18.4042 4.49824 18.5308 4.65948C18.6567 4.81994 18.7192 5.0213 18.6567 5.22266L18.6566 5.22252Z"
                  fill="#43464E"
                />
                <path
                  d="M8.44437 13.9814C7.2443 13.9814 6.25488 14.9276 6.25488 16.0751C6.25488 17.2226 7.24439 18.1688 8.44437 18.1688C9.64445 18.1696 10.6339 17.2234 10.6339 16.0757C10.6339 14.928 9.64436 13.9812 8.44437 13.9812V13.9814ZM8.44437 16.9011C7.9599 16.9011 7.58071 16.5385 7.58071 16.0752C7.58071 15.6119 7.9599 15.2493 8.44437 15.2493C8.92885 15.2493 9.30804 15.6119 9.30804 16.0752C9.30722 16.5188 8.90748 16.9011 8.44437 16.9011Z"
                  fill="#43464E"
                />
                <path
                  d="M15.6875 13.9814C14.4875 13.9814 13.498 14.9277 13.498 16.0752C13.498 17.2226 14.4876 18.1689 15.6875 18.1689C16.8875 18.1689 17.877 17.2226 17.877 16.0752C17.8565 14.9284 16.8875 13.9814 15.6875 13.9814ZM15.6875 16.9011C15.2031 16.9011 14.8239 16.5385 14.8239 16.0752C14.8239 15.612 15.2031 15.2493 15.6875 15.2493C16.172 15.2493 16.5512 15.612 16.5512 16.0752C16.5512 16.5188 16.1506 16.9011 15.6875 16.9011Z"
                  fill="#43464E"
                />
              </svg>
            </div>
          </div>
        </header>

        <Routes>
          <Route exact path="/" element={<Category />} />
          <Route exact path="/product-display" element={<ProductDisplay />} />
          <Route exact path="/cart" element={<Cart />} />
        </Routes>
        <CurrencySwitcher clicked={this.state.csACtive} />
        <CartOverlay clicked={this.state.ovActive} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
