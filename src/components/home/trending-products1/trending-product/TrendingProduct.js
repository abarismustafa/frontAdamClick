import React, { useEffect, useState } from "react";
import Rating from "../../../../shared/rating/Rating";

import { FiSearch } from "react-icons/fi";
import { GrAdd } from "react-icons/gr";
import { BsFillCartFill } from "react-icons/bs";
import { BiLoaderAlt } from "react-icons/bi";

import { Link } from "react-router-dom";
import { setTrendingProduct } from "../../../products/productSlice";
import { useDispatch } from "react-redux";
import { ImgesData } from "../../proImgs/ImgesData";
import { useTranslation } from "react-i18next";

function TrendingProduct({ data, isLoading, handleShow, error }) {
  const curr = window.localStorage.getItem("currencySym");
  const currencySymbol = curr ? curr : "ZK";
  const [renderValid, setReder] = useState(false);
  const dispacher = useDispatch();

  useEffect(() => {
    setReder(!renderValid);
    dispacher(setTrendingProduct(data));
  }, [data]);
  const { t } = useTranslation();

  return (
    <>
      {isLoading ? (
        <div className="loaderIcon">
          <BiLoaderAlt />
        </div>
      ) : null}
      {data?.slice(0, 6).map((item, i) => {
        return (
          <div className="col-lg-3 col-md-3 col-sm-3 col-6" key={item._id}>
            <div className="featuredInfo products">
              <div className="featuredImg">
                <Link to={`/product/${item?.uid}/${item.slug}`}>
                  <img
                    src={
                      item?.variations[0]?.mainImage_url
                        ? item?.variations[0]?.mainImage_url?.url
                        : ImgesData[i + 1]?.url
                    }
                    alt="Product"
                  />
                </Link>
                <div className="quickView d-none">
                  <ul>
                    <li className="viewProduct">
                      <button
                        className="quick_view_btn"
                        onClick={(e) => {
                          handleShow(item._id);
                        }}
                      >
                        <FiSearch />
                      </button>
                    </li>
                    <li className="addProduct">
                      <Link to="/products">
                        <GrAdd />
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <ul className="hotList d-none">
                <li>
                  <Link to="/products">Sale</Link>
                </li>
                <li>
                  <Link to="/products">-24%</Link>
                </li>
              </ul>
              <div className="featuredContent">
                <Rating />
                <h5>
                  <Link to={`/product/${item?.uid}/${item.slug}`}>
                    {item?.name}
                  </Link>
                </h5>

                <div className="rateDigit">
                  <span className="cross">
                    {currencySymbol} {item?.variations[0]?.mrp}
                  </span>
                  <span className="currentPrice">
                    {currencySymbol} {item?.variations[0]?.sale_rate}
                  </span>
                </div>
                <div className="rateDigit">
                  <span className="currentPrice">
                    {" "}
                    {
                      item?.variations[0]?.prices?.country_id?.currency_id
                        ?.symbol
                    }
                    :{item?.variations[0]?.prices?.sale_rate}
                  </span>
                  <span className="currentPrice">
                    {currencySymbol} {item?.variations[0]?.sale_rate}
                  </span>
                </div>

                <div className="buyNowInfo">
                  <Link
                    to={`/product/${item?.uid}/${item.slug}`}
                    className="buyNow cart"
                  >
                    {t("View")}{" "}
                  </Link>
                </div>
                <div className="productDesc">
                  <p>
                    CAN(Calcium ammonium nitrate: N(27), P(0), K(0), S(0),
                    Zn(0), Ca(3.2) Dosage: 5-6 gm per plant. Time of
                    Application: During vegetative stage. Use: Top dressing
                    containing calcium
                  </p>
                </div>
                <div className="featuredOption">
                  <select defaultValue={"DEFAULT"}>
                    <option value="DEFAULT Option">Select Option</option>
                    <option value="one">One</option>
                    <option value="two">Two</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      {error && (
        <div className="alertMsg mb-4" role="alert">
          {" "}
          No Data Found{" "}
        </div>
      )}
    </>
  );
}

export default TrendingProduct;
