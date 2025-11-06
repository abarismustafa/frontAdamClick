import React, { useState } from "react";
import Breadcrumb from "../../shared/breadcrumb/Breadcrumb";
import Rating from "../../shared/rating/Rating";
import logo from "../../assets/img/about-seller/abaris.png";
import { FaFacebookF } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { BsTwitter, BsInstagram, BsWhatsapp } from "react-icons/bs";
import { Link, NavLink, Outlet, useParams } from "react-router-dom";
import PrivacyPolicy from "../../common/privacy-policy/PrivacyPolicy";
import { Helmet } from "react-helmet";
import { useSellerDetailQuery } from "../products/productSlice";
function Seller() {
  const params = useParams();
  const [id, setId] = useState(params.id);
  const { data, isLoading } = useSellerDetailQuery(params.id);
  return (
    <>
      <Helmet>
        <title>Seller | adamclick</title>
        <meta name="keyword" content="adamclick" />
        <meta name="description" content="adamclick" />
      </Helmet>
      <Breadcrumb title="Seller" />
      <section className="sellerBrand p-30">
        {isLoading && (
          <div className="preloaderCount">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="sellerAbout">
                <div className="brandLogo">
                  <img
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                    }}
                    src={data?.profilePhoto ? data?.profilePhoto.url : logo}
                    alt="Seller"
                  />
                </div>
                <div className="brandContent">
                  <h4>
                    {data?.firstname} {data?.lastname}
                  </h4>
                  <h4>{data?.email}</h4>
                  <Rating />
                  <p style={{ marginBottom: "0px" }}>
                    G-44, 2nd Floor, Shaheen Bagh, New Delhi-110025, INDIA
                  </p>
                  <p>
                    Phone : <strong>{data?.mobile}</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="sellerTab p-30">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="sellerDetail">
                <div className="sellerMenus">
                  <ul>
                    <li>
                      <NavLink to={`seller-home/${id}`}> Store Home </NavLink>
                    </li>
                    <li>
                      <NavLink to="top-selling">Top Selling </NavLink>
                    </li>
                    {/* <li>
                      <NavLink to="all-products">All products</NavLink>
                    </li> */}
                  </ul>
                </div>
                <div className="sellerSocial">
                  <div className="searchSeller">
                    <input
                      type="text"
                      placeholder="Search..."
                      className="form-control"
                    />
                    <FiSearch />
                  </div>
                  <ul className="footer-social">
                    <li>
                      <a href="https://mmslfashions.in/" className="facebook">
                        <FaFacebookF />
                      </a>
                    </li>

                    <li>
                      <a href="https://mmslfashions.in/" className="twitter">
                        <BsTwitter />
                      </a>
                    </li>

                    <li>
                      <a href="https://mmslfashions.in/" className="instagram">
                        <BsInstagram />
                      </a>
                    </li>

                    <li>
                      <a href="https://mmslfashions.in/" className="whatsapp">
                        <BsWhatsapp />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <Outlet />
          </div>
        </div>
      </section>
      <PrivacyPolicy />
    </>
  );
}

export default Seller;
