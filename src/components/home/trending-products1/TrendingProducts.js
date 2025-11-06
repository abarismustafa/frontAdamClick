import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useGetTrendingProductQuery } from "../../products/productSlice";
import TrendingProduct from "./trending-product/TrendingProduct";
import QuiekViewModal from "../../../pages/QueikViewModal/QuiekViewModal";

import Rating from "../../../shared/rating/Rating";
import { useTranslation } from "react-i18next";

function TrendingProducts() {
  const { data, isLoading, error } = useGetTrendingProductQuery();
  console.log("trending", data);
  console.log("trending error", error);

  const [modelDataId, setModelDataId] = useState(null);
  const setProduct_id = (id) => {
    setModelDataId(id);
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setModelDataId(id);
    setShow(true);
  };

  const { t } = useTranslation();

  return (
    <>
      {data?.length > 0 && (
        <section className="trendingProductSec bg-white sectionPD">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="fishermanHeader">
                  <div className="fisherman-content">
                    <h3>{t("Trending Products")}</h3>
                  </div>
                </div>
              </div>
              <TrendingProduct
                data={data}
                error={error}
                isLoading={isLoading}
                handleShow={handleShow}
                setProduct_id={setProduct_id}
              />

              {/* <div className="serviceItemInfo">
                <div className="row">
                  {ourCategory.map((item) => {
                    return (
                      <div
                        className="col-lg-2 col-md-2 col-sm-4 col-xs-12"
                        key={item.id}
                      >
                        <div className="serviceItem">
                          <div className="serviceItemImg">
                            <img
                              src={item.url}
                              className="img-fluid"
                              alt={item.name}
                              title={item.name}
                            />
                          </div>
                          <div className="serviceItemText1">
                            <Rating />
                            <h5>
                              <Link to={`/`}>
                                {item.name}{" "}
                                <i className="ri-arrow-right-up-fill"></i>
                              </Link>
                            </h5>
                            <div className="rateDigit">
                              <span className="currentPrice">
                                {" "}
                                INR : {item.price}.00
                              </span>
                            </div>
                            <div className="buyNowInfo">
                              <Link className="btn buyNow cart" to="/">
                                Add <i className="ri-arrow-right-up-fill" />
                              </Link>
                              <Link className="btn buyNow d-none" to="/">
                                Buy Now
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div> */}
            </div>
          </div>

          {modelDataId && (
            <QuiekViewModal
              modelDataId={modelDataId}
              show={show}
              onHide={handleClose}
              size="xl"
              centered
            />
          )}
        </section>
      )}
    </>
  );
}

export default TrendingProducts;
