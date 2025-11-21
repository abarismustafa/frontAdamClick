import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useGetTrendingProductQuery } from "../../products/productSlice";
import TrendingProduct from "./trending-product/TrendingProduct";
import QuiekViewModal from "../../../pages/QueikViewModal/QuiekViewModal";


// import category1 from "../../../assets/img/products/13.jpg";
// import category2 from "../../../assets/img/products/14.jpg";
// import category3 from "../../../assets/img/products/15.jpg";
// import category4 from "../../../assets/img/products/16.jpg";
// import category5 from "../../../assets/img/products/17.jpg";
// import category6 from "../../../assets/img/products/18.jpg";
import Rating from "../../../shared/rating/Rating";
import { base_url } from "../../../server";
import axios from "axios";
import { t } from "i18next";

// const ourCategory = [
//   {
//     id: 1,
//     url: category1,
//     name: "Amul Masti Pouch Curd",
//     price: 10,
//   },
//   {
//     id: 2,
//     url: category2,
//     name: "Amul Cow Milk",
//     price: 20,
//   },
//   {
//     id: 3,
//     url: category3,
//     name: "Moreish Classic White Bread",
//     price: 25,
//   },
//   {
//     id: 4,
//     url: category4,
//     name: "Moreish Brown Bread",
//     price: 15,
//   },
//   {
//     id: 5,
//     url: category5,
//     name: "Cool Eggs - 12 pcs White Eggs",
//     price: 30,
//   },
//   {
//     id: 6,
//     url: category6,
//     name: "Cool Eggs - 6 pcs White Eggs",
//     price: 45,
//   }
// ];

function TrendingProducts() {
  const { data, isLoading, error } = useGetTrendingProductQuery();

  const [ourTrendingData, setOurTrendingData] = useState(null);
  // console.log("ourTrendingData", ourTrendingData);

  const baseUrl = base_url();
  const getTrendingData = async () => {
    try {
      const res = await axios.get(`${baseUrl}trending`, {
        withCredentials: true,
      });
      setOurTrendingData(res?.data);
    } catch (error) {
      console.error("An error occurred while fetching data:", error);
    }
  };
  useEffect(() => {
    getTrendingData();
  }, []);


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

  return (
    <>
      {ourTrendingData?.length > 0 && (
        <section className="trendingProductSe bg-white p-30">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="fishermanHeader">
                  <div className="fisherman-content">
                    <h3>
                      {t("Trending Products")}
                    </h3>
                  </div>
                </div>
              </div>
              <TrendingProduct
                data={ourTrendingData}
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
