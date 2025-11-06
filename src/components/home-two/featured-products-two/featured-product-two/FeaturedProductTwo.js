


import React from "react";
import { BsFillCartFill } from "react-icons/bs";
import { BiLoaderAlt } from "react-icons/bi";

// You need to import the CSS only once
// import "react-awesome-lightbox/build/style.css";

import { Link } from "react-router-dom";
import {
  setFeachers,
  useGetProductDetailQuery,
} from "../../../products/productSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
// import { ImgesData } from "../../proImgs/ImgesData";

function FeaturedProductTwo({ isLoading, data, error, handleShow }) {
  const curr = window.localStorage.getItem("currencySym");
  const currencySymbol = curr ? curr : "ZK";
  const dispacher = useDispatch();

  useEffect(() => {
    dispacher(setFeachers(data));
  }, [data]);

  return (
    <>
      {isLoading && (
        <div className="loaderIcon">
          <BiLoaderAlt />
        </div>
      )}
      {data &&
        data?.map((item, i) => {
          return (
            <div className="col-lg-3 col-md-6 col-sm-12" key={item._id}>
              <div className="productInfo">
                <div className="productFigure">
                  <div className="productImg">
                    <Link to={`/product/${item._id}`}>
                      {/* <img src={item?.mainimageurl_url ? item?.mainimage_url?.url : ImgesData[0].url} alt="Product" className="imgProduct" /> */}
                      <img
                        src={item?.url}
                        alt="Product"
                        className="imgProduct"
                      />
                    </Link>
                  </div>
                </div>
                <div className="productContent">
                  <h5>
                    <Link to={`/product/${item._id}`}>{item.name.slice(0, 19)}..</Link>
                  </h5>

                  <div className="rateDigit">
                    <span className="currentPrice">  QAR {item.price}</span>
                    {/* <span className="currentPrice">{currencySymbol} {item?.variations[0]?.sale_rate}</span> */}
                  </div>
                  
                  <div className="buyNowInfo">
                    {/* <Link className="btn btn-danger addCart" to={`/product/${item._id}`}
                  >
                    View Detail
                  </Link> */}

                    <Link
                      to={`/product/${item._id}`}
                      className="btn btn-primary buyNow"
                    >
                       Add to Cart <i className="ri-arrow-right-up-fill"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

      {error && (
        <div className="alertMsg mb-4" role="alert">
          No Data Found
        </div>
      )}
    </>
  );
}

export default FeaturedProductTwo;
