import React from "react";
import AboutSeller from "./about-seller/AboutSeller";
import SellerHeader from "./sell-header/SellerHeader";
import SellerBanner from "./seller-banner/SellerBanner";
import SellerTestimonial from "./seller-testimonial/SellerTestimonial";
import shopsy from "../../assets/img/shopsy.png";
import SellMoreTool from "./sell-more-tool/SellMoreTool";

import ignite from "../../assets/img/ignite.PNG";
// import apple from "../../assets/img/appleStore.PNG";
// import playStore from "../../assets/img/playStore.PNG";

import SellEvent from "./sell-event/SellEvent";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

function SellWithUs() {
  return (
    <>
      <Helmet>
        <title>Sell With Us | adamclick</title>
        <meta name="keyword" content="adamclick" />
        <meta name="description" content="adamclick" />
      </Helmet>
      <SellerHeader />
      <SellerBanner />
      <SellerTestimonial />
      <AboutSeller />
      <div className="stripedSec">
        <div className="stripedBackground">
          <Link to="/home">
            <img src={shopsy} alt="Shopsy By ETG" />
          </Link>
          <span>Avail 0% Commission for Selling on Shopsy!</span>
          <Link className="link-color" to="/sell-with-us">
            Know More
          </Link>
        </div>
      </div>
      <SellMoreTool />
      <div className="igniteSec">
        <img src={ignite} alt="Ignite" className="img-fluid" />
      </div>
      <SellEvent />
      <section className="PopularCategoriesSec p-30">
        <div className="container">
          <div className="PopularCategoryInfo">
            <h4 className="mb-3">Popular categories to sell online in India</h4>
            <ul className="pVaIx">
              <li>
                <Link to="/">Sell Mobile </Link>
              </li>
              <li>
                <Link to="/">Sell Clothes </Link>
              </li>
              <li>
                <Link to="/">Sell Sarees </Link>
              </li>
              <li>
                <Link to="/">Sell Electronics </Link>
              </li>
              <li>
                <Link to="/">Sell Shoes </Link>
              </li>
              <li>
                <Link to="/">Sell Jewellery </Link>
              </li>
              <li>
                <Link to="/">Sell T-shirts </Link>
              </li>
              <li>
                <Link to="/">Sell Furniture </Link>
              </li>
              <li>
                <Link to="/">Sell Paintings </Link>
              </li>
              <li>
                <Link to="/">Sell Watch </Link>
              </li>
              <li>
                <Link to="/">Sell Books </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="p-30">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="sell-heading">
                <h4 className="mb-3">SELL ON ETG</h4>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="sell-para">
                <p>
                  {" "}
                  ETG Marketplace is India’s leading platform for selling
                  online. Be it a manufacturer, vendor or supplier, simply sell
                  your products online on ETG and become a top e-commerce player
                  with minimum investment. Through a team of experts offering
                  exclusive seller workshops, training, and{" "}
                  <Link href="mailto:sell@ ETG.com" target="_blank">
                    seller support
                  </Link>
                  , ETG focuses on empowering sellers across India.
                </p>
                <p>
                  Selling on ETG.com is easy and absolutely free. All you need
                  is to{" "}
                  <Link to="/" target="_blank">
                    register
                  </Link>
                  , list your catalog and start selling your products.
                </p>
                <p>
                  What's more? We have third party ‘E-commerce Service
                  Providers’ who provide logistics,{" "}
                  <Link to="/" target="_blank">
                    cataloging support
                  </Link>
                  , product photoshoot and packaging materials. We have a
                  program called Seller Protection Fund to safeguard sellers
                  from losses via compensations. We provide{" "}
                  <Link to="/" target="_blank">
                    {" "}
                    ETG Fulfilment
                  </Link>{" "}
                  services through which you can ensure faster delivery of your
                  items, quality check by our experts and a delightful
                  packaging. Combine these with the{" "}
                  <Link to="/" target="_blank">
                    fastest payments
                  </Link>{" "}
                  in the industry and you get an excellent seller portal. No
                  wonder ETG is India’s favorite place to{" "}
                  <Link to="/" target="_blank">
                    sell online
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer className="sellFooter p-30">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <div className="sellFooterInfo">
                <h5>Services</h5>
                <ul>
                  <li>
                    <Link to="/">Fulfillment Services</Link>
                  </li>
                  <li>
                    <Link to="/">Account Management</Link>
                  </li>
                  <li>
                    <Link to="/">Partner Services</Link>
                  </li>
                  <li>
                    <Link to="/">Packaging Services</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="sellFooterInfo">
                <h5>Resources</h5>
                <ul>
                  <li>
                    <Link to="/">Online Selling Guide</Link>
                  </li>
                  <li>
                    <Link to="/">Products in Demand</Link>
                  </li>
                  <li>
                    <Link to="/">Success Stories</Link>
                  </li>
                  <li>
                    <Link to="/">Seller Learning Center</Link>
                  </li>
                  <li>
                    <Link to="/">News</Link>
                  </li>
                  <li>
                    <Link to="/">API Documentation</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="sellFooterInfo">
                <h5>FAQs</h5>
                <ul>
                  <li>
                    <Link to="/">General</Link>
                  </li>
                  <li>
                    <Link to="/">Fees and Charges</Link>
                  </li>
                  <li>
                    <Link to="/">Managing your Account</Link>
                  </li>
                  <li>
                    <Link to="/">Services and Fulfillment by etg (FBF)</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="sellFooterInfo">
                <h5>Contact Us</h5>
                <ul>
                  <li>
                    <Link to="/">example@etg.com</Link>
                  </li>
                </ul>
                <hr />
                <h5>Download our App</h5>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default SellWithUs;
