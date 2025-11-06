import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaFacebookF, FaMapMarkerAlt } from "react-icons/fa";
import { BsTwitter, BsInstagram, BsWhatsapp } from "react-icons/bs";

import { MdCall } from "react-icons/md";
import { HiMail } from "react-icons/hi";
import { GoArrowUpRight } from "react-icons/go";

import footerBG from "../../assets/img/banner/luchiana-1913484823.webp";

import visa from "../../assets/img/rki/payment/visa.svg";
import master from "../../assets/img/rki/payment/master.svg";
import american from "../../assets/img/rki/payment/american.svg";

import "./Footer.css";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { base_url } from "../../server";

function Footer() {
  const { pathname } = useLocation();
  const [state, setState] = useState({
    about_company: "",
    office_address: "",
    location:
      "98B, 2nd Floor, Namberdar Estate, Taimoor Nagar, New Friends Colony, New Delhi-110025",
    phoneNo: "+974 6636 2210 ",
    email: "info@adamclick.com",
  });
  const baseUrl = base_url();
  const getData = async () => {
    const res = await axios.get(`${baseUrl}adminWeb_footer/get`, {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    });
    setState({
      about_company: res.data.about_company,
      office_address: res.data.office_address,
      location: res.data.contact_info.location,
      phoneNo: res.data.contact_info.phoneNo,
      email: res.data.contact_info.email,
    });
    window.localStorage.setItem("callNum", res.data.contact_info.phoneNo);
  };

  const [allCategories, setallCategories] = useState(null);

  const getData2 = async () => {
    try {
      const res = await axios.get(`${baseUrl}category/public`, {
        withCredentials: true,
      });
      setallCategories(res.data);
    } catch (error) {
      console.error("An error occurred while fetching data:", error);
    }
  };

  const [categoriesDatas, setCateData] = useState(null);
  const getcateData = async () => {
    try {
      const res = await axios.get(`${baseUrl}category/public`, {
        withCredentials: true,
      });
      setCateData(res.data);
    } catch (error) {}
  };

  useEffect(() => {
    getcateData();
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    // getData();
    getData2();
  }, []);
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState();
  const senDatas = async () => {
    const obj = { email: email };

    try {
      const res = await axios.post(`${baseUrl}newsletter/add_newsletter`, obj);
      setEmail("");
      alert("Subscribe Successfully");
    } catch (error) {
      alert("Not Subscribe");
    }
  };
  const { t, i18n } = useTranslation();
  return (
    <>
      {/* Start Footer Section */}
      <footer className="footer-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <div className="aboutCompanyText">
                {/* <h3>{t("About Company")}</h3> */}

                {/* <p>{t("footAbout")}</p> */}
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 col-12">
              <div className="single-footer-widget line mob">
                <div className="col-lg-12 col-md-12 col-sm-12">
                  <div className="footer-heading">
                    <h3>{t("Newsletter signup")}</h3>
                  </div>
                  <p>{t("letter")}</p>
                </div>

                <form className="newsletter-form">
                  <input
                    type="email"
                    className="input-newsletter"
                    placeholder="Enter your email"
                    name="email"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    value={email}
                    required
                    autoComplete="off"
                  />
                  <button type="button" onClick={senDatas}>
                    {/* <i className="ri-arrow-right-up-fill"></i> */}
                    <GoArrowUpRight />
                  </button>
                  <div id="validator-newsletter" className="form-result"></div>
                </form>

                <div className="paymentOption">
                  <ul>
                    <li>
                      <img src={visa} alt="Visa" className="img-fluid" />
                    </li>
                    <li>
                      <img src={master} alt="Master" className="img-fluid" />
                    </li>
                    <li>
                      <img
                        src={american}
                        alt="American"
                        className="img-fluid"
                      />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-6 col-sm-6 col-6">
              <div className="single-footer-widget line">
                <div className="footer-heading">
                  <h3 className="mb-3">{t("Quick-Links")}</h3>
                </div>
                <ul className="footer-quick-links sellerLists">
                  <li>
                    <Link to="/blog">{t("Blogs")}</Link>
                  </li>
                  <li>
                    <Link to="/faq">{t("FAQs")}</Link>
                  </li>
                  <li>
                    <Link to="/about">{t("About Us")}</Link>
                  </li>
                  <li>
                    <Link to="/all_categories">{t("All Categories")}</Link>
                  </li>
                  <li>
                    <Link to="/contact">{t("Contact Us")}</Link>
                  </li>
                  <li>
                    <Link to="/products">{t("All Products")}</Link>
                  </li>
                  <li>
                    <Link to="/view-all-brands">{t("All Brands")}</Link>
                  </li>
                </ul>

                {/* <p>{state?.office_address}</p> */}
              </div>
            </div>

            <div className="col-lg-3 col-md-6 col-sm-6 col-6">
              <div className="single-footer-widget line mob">
                <div className="footer-heading">
                  <h3> {t("Useful Links")}</h3>
                </div>

                <ul className="footer-quick-links">
                  <li>
                    <Link to="/terms-of-use">{t("Terms & Conditions")}</Link>
                  </li>
                  <li>
                    <Link to="/privacy-policy">{t("Privacy Policy")}</Link>
                  </li>
                  <li>
                    <Link to="returns-refund-cancellation">
                      {t("Returns & Refund & Cancellation")}
                    </Link>
                  </li>
                  {/* {allCategories &&
                    allCategories?.map((item, i) => {
                      return (
                        <li key={i}>
                          <Link
                            to={`/product/category/${item?.uid}/${item?.slug}`}
                          >
                            {" "}
                            {item?.name}
                          </Link>
                        </li>
                      );
                    })}
                  <li>
                    <Link to="/track-order">Track Order</Link>
                  </li> */}

                  {/* <li>
                    <Link to="/"> Daipers</Link>
                  </li>
                  <li>
                    <Link to="/"> Bath & Baby Care</Link>
                  </li>
                  <li>
                    <Link to="/refund-policy">Toys</Link>
                  </li>
                  <li>
                    <Link to="/faq">Travel</Link>
                  </li>
                  <li>
                    <Link to="/">Moms</Link>
                  </li>
                  <li>
                    <Link to="/">Memories</Link>
                  </li> */}
                </ul>
                <div className="single-footer-widget mt-4">
                  <div className="footer-heading">
                    <h3 className="mb-3">{t("Follow us on")}</h3>
                  </div>
                  <ul className="footer-social">
                    <li>
                      <a
                        href="https://www.facebook.com/"
                        className="facebook"
                        target="_blank"
                      >
                        <FaFacebookF />
                      </a>
                    </li>

                    <li>
                      <a
                        href="https://api.whatsapp.com/send?phone="
                        className="whatsapp"
                        target="_blank"
                      >
                        <BsWhatsapp />
                      </a>
                    </li>

                    <li>
                      <a
                        href="https://www.instagram.com/"
                        className="instagram"
                        target="_blank"
                      >
                        <BsInstagram />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 col-sm-6 col-12">
              <div className="single-footer-widget">
                <div className="footer-heading">
                  <h3>{t("Contact info")}</h3>
                </div>

                <div className="footer-info-contact">
                  <div className="topIcon">
                    <FaMapMarkerAlt />
                    <span>
                      <h3>{t("Location - 1")}</h3>
                      {t("companyAddress")}
                    </span>
                  </div>
                </div>
                {/* <div className="footer-info-contact">
                  <div className="topIcon">
                    <FaMapMarkerAlt />
                    <span>
                      <h3>{t('Location - 2')}</h3>
                      {t(`loc-2`)}
                    </span>
                  </div>
                </div> */}

                <div className="footer-info-contact">
                  <div className="topIcon">
                    <MdCall />
                    <span>
                      <h3>{t("Call Us")}</h3>
                      {/* <a href={`tel:+91-9045206022`}> {state?.phoneNo}</a> */}
                      {/* <a href={`tel:${state?.phoneNo}`}> {state?.phoneNo}</a> */}
                      <a href={`tel:+91-9810341423`}> +91-9810341423</a>
                    </span>
                  </div>
                </div>

                <div className="footer-info-contact">
                  <div className="topIcon">
                    <HiMail />
                    <span>
                      <h3>{t("Email Us")}</h3>
                      {/* <a href={`mailto:${state?.email}`}> */}
                      <a href={`mailto:rizwan@adamclick.com`}>
                        <span className="__cf_email__">
                          {/* {state?.email}  */}
                          rizwan@adamclick.com
                        </span>
                      </a>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="categoryFooter">
          <div className="container">
            <div className="fisherman-content text-start">
              <h5>Top Categories</h5>
            </div>
            <div className="categoryListFooter">
              <ul>
                {categoriesDatas?.slice(0,5)?.map((item, i) => {
                  return (
                    <li key={i}>
                      <h6>
                        <Link
                          to={`/product/category/${item.uid}/${item?.slug}`}
                        >
                          {item?.name}{" "}
                        </Link>
                      </h6>
                      <p>{item?.meta_description}</p>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>

       

          <div className="container">
        <div className="copyright-area">
            <div className="copyright-area-content">
              <div className="copyright-left">
                <p>
                  {t("Copyright")} @ {currentYear} {t("Adamclick")}.{" "}
                  {t("All rights reserved")}. |{t("Powered By")}:{" "}
                  <a href="https://www.abarissoftech.com/" target="_blank">
                    {t("Abaris Softech")}{" "}
                  </a>
                </p>
              </div>

              {/* <div className="copyright-right">
                <ul>
                  <li>
                    <Link to="/terms-of-use">Terms & Conditions</Link>
                  </li>
                  <li>
                    <Link to="/privacy-policy">Privacy Policy</Link>
                  </li>
                </ul>
              </div> */}
            </div>
          </div>
        </div>
      </footer>
      {/* End Footer Section */}
    </>
  );
}

export default Footer;
