import React, { useEffect, useState } from "react";


import { FiSearch } from "react-icons/fi";
import { RxCross1 } from "react-icons/rx";
import { GrAdd } from "react-icons/gr";
import { BsFillCartFill } from "react-icons/bs";
import { FiShoppingCart } from "react-icons/fi";
import { AiOutlineLock } from "react-icons/ai";
import { TbWorld } from "react-icons/tb";
import { CgShutterstock } from "react-icons/cg";

import Slider from "react-slick";
import { Link } from "react-router-dom";
import {
  useGetProductsQuery,
  useGetRelatedProductsQuery,
} from "../../../../products/productSlice";
import QuiekViewModal from "../../../../../pages/QueikViewModal/QuiekViewModal";
import axios from "axios";
import { base_url } from "../../../../../server";

function RelatedProduct({ productData }) {
  const { data, error, isLoading } = useGetProductsQuery();
  // const { data: relatedProducts } = useGetRelatedProductsQuery(productData?.getaProduct?.category_id[0]._id);
  const [relatedProducts, setrelatedProducts] = useState(null);
  const baseUrl = base_url();
  const getData = async () => {
    try {
      const res = await axios.get(
        `${baseUrl}product/category/${productData?.getaProduct?.category_id[0]._id}`
      );
      setrelatedProducts(res.data);
    } catch (error) { }
  };
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 3000,
    arrows: false,
    autoplaySpeed: 3000,
    centerPadding: "60px",
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const [modelDataId, setModelDataId] = useState(null);

  const [show, setShow] = useState(false);

  const curr = window.localStorage.getItem("currencySym");
  const currencySymbol = curr ? curr : " INR";

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setModelDataId(id);
    setShow(true);
  };
  useEffect(() => {
    if (productData) {
      // getData();
    }
  }, [productData]);
  return (
    <>
      <Slider {...settings}>
        {relatedProducts?.map((item) => {
          return (
            <div className="col-lg-3 col-md-6 col-sm-12" key={item._id}>
              <div className="featuredInfo relatedPro">
                <div className="featuredFigure">
                  <div className="featuredImg">
                    <Link to={`/product/${item._id}`}>
                      <img
                        src={item.variations[0].mainImage_url.url}
                        alt={item.name}
                        className="img-fluid"
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
                          <button type="button">
                            <GrAdd />
                          </button>
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
                </div>
                <div className="featuredContent">
                  <h5>
                    <Link to={`/product/${item._id}`}>{item.name}</Link>
                  </h5>

                  <div className="rateDigit">
                    {/* <span className="cross">{currencySymbol} 59.00</span> */}
                    <span className="currentPrice">{currencySymbol} 87</span>
                  </div>
                  <div className="buyNowInfo">
                    <Link to="/cart" className="buyNow">
                      Add Cart <i className="ri-arrow-right-up-fill"></i>
                    </Link>

                    {/* <Link
                      to="/"
                      className="btn btn-primary buyNow"
                    >
                      <BsFillCartFill />
                      Buy Now
                    </Link> */}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </Slider>

      {modelDataId && (
        <QuiekViewModal
          modelDataId={modelDataId}
          show={show}
          onHide={handleClose}
          size="xl"
          centered
        />
      )}
    </>
  );
}

export default RelatedProduct;
