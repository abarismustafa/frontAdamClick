import React, { useState } from "react";
import fertilizer3 from "../../../../assets/img/products/3.jpg";
import Rating from "../../../../shared/rating/Rating";

import { FiSearch } from "react-icons/fi";
import { GrAdd } from "react-icons/gr";
import { BsFillCartFill } from "react-icons/bs";
import { BiLoaderAlt } from "react-icons/bi";

import { Link } from "react-router-dom";
import {
  setTodayDeal,
  useGetProductDetailQuery,
} from "../../../products/productSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function TodayDealsProduct({ data, isLoading, error,handleShow }) {
  const curr = window.localStorage.getItem('currencySym')
  const currencySymbol = curr ? curr : 'ZK'

  const dispach = useDispatch()

  useEffect(() => {
    dispach(setTodayDeal(data))
  }, [data])


  return (
    <>
      {isLoading ? (
        <div className="loaderIcon">
          <BiLoaderAlt />
        </div>
      ) : null}
      {data?.slice(0, 4)?.map((item) => {
        return (
          <div className=" col-lg-3 col-md-6 col-sm-12" key={item._id}>
            <div className="featuredInfo">
              <div className="featuredFigure">
                <div className="featuredImg">
                  <Link to={`/product/${item._id}`}>
                    {item.mainimage_url ? <img src={item.mainimage_url?.url} alt="Product" /> : <img src={fertilizer3} alt="Product" />}

                  </Link>
                  <div className="quickView">
                    <ul>
                      <li className="viewProduct">
                        <button
                          className="quick_view_btn"
                          onClick={(e) => {
                            handleShow(item._id)
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
                <ul className="hotList">
                  <li>
                    <Link to="/products">Sale</Link>
                  </li>
                  <li>
                    <Link to="/products">-17%</Link>
                  </li>
                </ul>
              </div>
              <div className="featuredContent">
                {/* <h6>category</h6> */}
                <h5>
                  <Link to={`/product/${item._id}`}>{item.name}</Link>
                </h5>
                <Rating />
                <div className="rateDigit">
                  <span className="cross">{currencySymbol} {item?.variations[0]?.mrp}</span>
                  <span className="currentPrice">{currencySymbol} {item?.variations[0]?.sale_rate}</span>
                </div>

                <div className="buyNowInfo">
                  <Link className="btn btn-danger addCart" to={`/product/${item._id}`}
                  >
                    View Detail
                  </Link>
                  <Link
                    to={`/product/${item._id}`}
                    className="btn btn-primary buyNow"
                  >
                    <BsFillCartFill /> Buy Now
                  </Link>
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

export default TodayDealsProduct;
