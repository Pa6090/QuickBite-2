import React, { useContext, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

export default function Navbar({ setShowLogin }) {
  const [menu, setMenu] = useState("home");
  const {getCartTotal, cartItems, token, setToken} = useContext(StoreContext)
  const navigate = useNavigate()
  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("userId")
    setToken("")
    navigate('/')
  }
  return (
    <nav className="navbar navbar-expand-lg" id="navbar">
      <div className="container-fluid">
        <a className="navbar-brand fs-2" href="/" style={{ color: "tomato" }}>
          QuickBite
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li
              onClick={() => setMenu("home")}
              className={menu === "home" ? "active1 nav-item" : "nav-item"}
            >
              <Link
                to="/"
                className="nav-link active"
                aria-current="page"
                href="#navbar"
              >
                Home
              </Link>
            </li>
            <li
              onClick={() => setMenu("menu")}
              className={menu === "menu" ? "active1 nav-item" : "nav-item"}
            >
              <a
                className="nav-link active"
                aria-current="page"
                href="#explore-menu"
              >
                Menu
              </a>
            </li>
            <li
              onClick={() => setMenu("mobile-app")}
              className={
                menu === "mobile-app" ? "active1 nav-item" : "nav-item"
              }
            >
              <a
                className="nav-link active"
                aria-current="page"
                href="#app-download"
              >
                Mobile App
              </a>
              {/* <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Dropdown
                    </a> */}
              {/* <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#">Action</a></li>
                        <li><a className="dropdown-item" href="#">Another action</a></li>
                        <li><hr className="dropdown-divider" /></li>
                        <li><a className="dropdown-item" href="#">Something else here</a></li>
                    </ul> */}
            </li>
            <li
              onClick={() => setMenu("contact-us")}
              className={
                menu === "contact-us" ? "active1 nav-item" : "nav-item"
              }
            >
              <a className="nav-link active" href="#footer">
                Contact Us
              </a>
            </li>
          </ul>

          {!token ? <></> : <button
              className={menu === "myOrders" ? "active1 nav-item btn btn-outline-secondary mx-2" : "nav-item btn btn-outline-secondary mx-2"}
            >
              <Link
                to="/listorders"
                className="nav-link active"
                aria-current="page"
                href="#navbar"
              >
                My Orders
              </Link>
            </button>}

          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Type here.."
              aria-label="Search"
            />
            <button className="btn btn-outline-primary nav-item mx-2" type="submit">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                </svg>
            </button>
          </form>
          <Link to='/cart' className={menu === "cart" ? "active1 nav-item" : "nav-item"}>
            <button className="btn btn-outline-primary mx-2 log">
                {/* <p >{getCartTotal()>0 ? cartItems.length : "" }</p> */}
                <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-cart"
                viewBox="0 0 16 16"
                >
                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                </svg>
                {/* <p className="change">Cart({getCartTotal>0 ? cartItems.length : "" })</p> */}
            </button>
          </Link>
          <a className="nav-item">
            {!token ? (<button
              onClick={() => setShowLogin(true)}
              className="btn btn-outline-primary mx-2"
              type="submit"
            >
              Sign in
            </button>) : 
            (<div className="nav-item">
              <button className="btn btn-outline-primary mx-2 log">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
                </svg>
                <div className="change">Profile</div>
              </button>
              <button onClick={logout} className="btn btn-outline-primary mx-2 log">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/>
                  <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
                </svg>
                <div className="change">Log Out</div>
              </button>
            </div>)}
          </a>
        </div>
      </div>
    </nav>
  );
}
