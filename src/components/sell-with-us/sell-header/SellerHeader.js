import React from "react";
import { Link } from "react-router-dom";
import brandLogo from "../../../assets/img/logo.png";

function SellerHeader() {
  return (
    <>
      <section className="sellerHeaderSec">
        <div className="sellerHeader">
          <div className="sellerMenu">
            <Link to="/">
              <img src={brandLogo} alt="ETG" className="img-fluid" />
            </Link>
            <ul className="">
              <li>
                <Link className="link-color" to="/sell-with-us">
                  Fee Structure
                </Link>
              </li>
              <li>
                <Link className="link-color" to="/sell-with-us">
                  Services
                </Link>
              </li>
              <li>
                <Link className="link-color" to="/sell-with-us">
                  Resources
                </Link>
              </li>
              <li>
                <Link className="link-color" to="/sell-with-us">
                  FAQs
                </Link>
              </li>
              <li>
                <Link className="link-color" to="/sell-with-us">
                  Shopsy
                </Link>
              </li>
            </ul>
          </div>
          <div className="sellerRegistration">
            <ul>
              <li className="startSellingBtn">
                <button className="btn btn-warning"> Start Selling </button>
              </li>
              <li className="startSellingBtn">
                <button className="btn btn-primary"> Login </button>{" "}
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}

export default SellerHeader;
