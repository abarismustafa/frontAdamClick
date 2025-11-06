import React, { useEffect } from "react";

import etg from "../../../assets/img/brands/etg.png";
import kynoch from "../../../assets/img/brands/kynoch.png";
import falcon from "../../../assets/img/brands/falcon.png";
import oemff from "../../../assets/img/brands/oemff.png";
import "./Brands.css";
import { Link } from "react-router-dom";
import { useListAllBrandQuery } from "../../products/productSlice";
import axios from "axios";
import { AiFillCar } from "react-icons/ai";
import { RiArrowGoForwardLine } from "react-icons/ri";
import { FaMoneyBill } from "react-icons/fa";
import { BsShieldLockFill } from "react-icons/bs";
import { useTranslation } from "react-i18next";
import { MdOutlineLocalShipping } from "react-icons/md";

const imgs = [etg, kynoch, falcon, oemff];

function Brands() {
  const { t } = useTranslation();
  // const { data, isLoading, error } = useListAllBrandQuery()

  return (
    <>
      <section className="brandSection sectionPD bgGray">
        <div className="container">
          <div className="brandsSec row">
            <div className="mainRap col-lg-3 col-md-3 col-sm-6 col-6">
              <div className="icon">
                <MdOutlineLocalShipping />
              </div>
              <div className="text">
                <h6>
                  <Link to="/">{t("Free Shipping")}</Link>
                </h6>
                <p>{t("shippingText")}</p>
              </div>
            </div>
            <div className="mainRap col-lg-3 col-md-3 col-sm-6 col-6">
              <div className="icon">
                <RiArrowGoForwardLine />
              </div>
              <div className="text">
                <h6>
                  <Link to="/">{t("Full Refund")}</Link>
                </h6>
                <p>{t("refundText")}</p>
              </div>
            </div>
            <div className="mainRap col-lg-3 col-md-3 col-sm-6 col-6">
              <div className="icon">
                <FaMoneyBill />
              </div>
              <div className="text">
                <h6>
                  <Link to="/">{t("Debit & Credit Card")}</Link>
                </h6>
                <p>{t("debitText")}</p>
              </div>
            </div>
            <div className="mainRap col-lg-3 col-md-3 col-sm-6 col-6">
              <div className="icon">
                <BsShieldLockFill />
              </div>
              <div className="text">
                <h6>
                  <Link to="/">{t("100% Secure Payment")}</Link>
                </h6>
                <p>{t("paymentText & Credit Card")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Brands;
