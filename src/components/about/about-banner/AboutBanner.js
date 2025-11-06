import React from "react";
import { Link } from "react-router-dom";
import pageHeaderBg from "../../../assets/img/page-header-bg.jpg";

function AboutBanner() {
  return (
    <>
      <section
        className="aboutBanner p-30"
        style={{ background: `url(${pageHeaderBg})` }}
      >
        <div className="container">
          <div className="aboutBannerInfo">
            <h6>ABOUT US</h6>
            <h2>OUR COMPANY</h2>
            <Link to="/contact" className="btn btn-dark">
              Contact
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default AboutBanner;
