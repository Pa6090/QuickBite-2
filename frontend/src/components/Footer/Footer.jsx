import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";

export default function Footer() {
  return (
    <div style={{'backgroundColor' : 'tomato'}} id="footer">
      <footer className="d-flex space-around justify-content-around align-items-center py-3 my-4 border-top">
        <div>
            <h3 style={{color:"white"}}>QuickBite</h3>
        </div>

        <ul className="nav col-md-4 justify-content-center" style={{color:"white"}}>
          <li className="nav-item">
            <a href="#" className="nav-link px-2 text-muted">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link px-2 text-muted">
              About Us
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link px-2 text-muted">
              Delivery
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link px-2 text-muted">
              Privacy Policy
            </a>
          </li>
          <li className="nav-item">
            <img src={assets.facebook_icon}/>
          </li>
          <li className="nav-item">
            <img src={assets.twitter_icon}/>
          </li>
        </ul>
        <p className="text-center text-muted">© 2024 Company, Inc</p>
      </footer>

    </div>
  );
}
