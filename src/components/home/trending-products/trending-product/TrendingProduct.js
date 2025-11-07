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
  const currencySymbol = curr ? curr : "₹";
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
          <>
            {/* <div className="col-lg-3 col-md-4 col-sm-6 col-6" key={item._id}>
              <div className="featuredInfo products border bg-white ">
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
                <ul className="hotList  d-none">
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

                  <span>{t("MRP")}: {item?.variations[0]?.prices?.mrp}</span>
                  <p>
                    {t("Sale Price")}:{" "}
                    {item?.variations[0]?.prices?.country_id?.currency_id?.symbol}
                    {item?.variations[0]?.prices?.sale_rate}
                  </p>

                  <div className="buyNowInfo">
                    <Link
                      to={`/product/${item?.uid}/${item.slug}`}
                      className="btn btn-danger buyNow"
                    >
                      {t("Buy Now")}
                    </Link>
                    <Link
                      to={`/product/${item?.uid}/${item.slug}`}
                      className="buyNow bgGray"
                    >
                      {t("Add in Cart")}
                    </Link>
                  </div>
                </div>
              </div>
            </div> */}

            {Array.isArray(item?.variations) &&
              item.variations.length > 0 &&
              item?.variations?.map((variation, i) => {
                return (
                  <div
                    className="col-lg-3 col-md-4 col-sm-6 col-6"
                    key={item._id}
                  >
                    <div className="featuredInfo products border bg-white ">
                      <div className="featuredImg">
                        <Link
                          to={`/product/${item?.uid}/${item.slug}/${variation?.variant_slug}`}
                        >
                          <img
                            src={
                              variation?.mainImage_url?.url ||
                              variation?.images?.[0]?.url ||
                              "/no-image.jpg"
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
                      <ul className="hotList  d-none">
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
                          <Link
                            to={`/product/${item?.uid}/${item.slug}/${variation?.variant_slug}`}
                          >
                            {/* {item?.name}  */}
                            {item?.name +
                              (variation?.variant_slug
                                ? " " + variation.variant_slug
                                : "")}
                          </Link>
                        </h5>

                        <span>
                          {t("MRP")}:{" "}
                          <span className="text-decoration-line-through">
                            ₹{variation?.prices?.mrp}
                          </span>
                        </span>
                        <p>
                          {t("Sale Price")}:{" "}
                          {
                            item?.variations[0]?.prices?.country_id?.currency_id
                              ?.symbol
                          }
                          ₹{variation?.prices?.sale_rate}
                        </p>

                        <div className="buyNowInfo">
                          <Link
                            to={`/product/${item?.uid}/${item.slug}/${variation?.variant_slug}`}
                            className="btn btn-danger buyNow"
                          >
                            {t("Buy Now")}
                          </Link>
                          <Link
                            to={`/product/${item?.uid}/${item.slug}/${variation?.variant_slug}`}
                            className="buyNow bgGray"
                          >
                            {t("Add in Cart")}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </>
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
