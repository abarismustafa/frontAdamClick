import React, { useState } from "react";

import { FiSearch } from "react-icons/fi";
import { GrAdd } from "react-icons/gr";
import { BiLoaderAlt } from "react-icons/bi";
import { isMobile } from "react-device-detect";

// You need to import the CSS only once
// import "react-awesome-lightbox/build/style.css";

import { Link, useNavigate } from "react-router-dom";
import {
  setCartLeng,
  setFeachers,
  useGetProductDetailQuery,
  useSetCartMutation,
} from "../../../products/productSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ImgesData } from "../../proImgs/ImgesData";
import { useTranslation } from "react-i18next";
import { CustomToaster } from "../../../../common/toaster/CustomToaster";
import Brands from "../../brands/Brands";
import Slider from "react-slick";
import Rating from "../../../../shared/rating/Rating";
import LoginAllPage from "../../../../common/loginAllPage/LoginAllPage";

function FeaturedProduct({ isLoading, data, error, handleShow, isPopular }) {
  // function FeaturedProduct({ isLoading, error, handleShow, isPopular }) {
  //   let data = [];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const curr = window.localStorage.getItem("currencySym");
  const currencySymbol = curr ? curr : "QAR";
  const dispacher = useDispatch();

  const [slidesToShow, setSlidesToShow] = useState(3);

  useEffect(() => {
    dispacher(setFeachers(data));
    setSlidesToShow(data?.length);
  }, [data]);

  const [count, setCount] = useState(16);
  const changeLoad = () => {
    setCount(count + 4);
  };
  const { t, i18n } = useTranslation();

  const [
    addToCart,
    {
      data: datacart,
      isLoading: isAddCartLoading,
      isSuccess: isAddToCartSuccess,
      isError: isAddToCartError,
    },
  ] = useSetCartMutation();
  const [names, setNames] = useState("");
  const handleAddCart = (item) => {
    setNames(item.name);
    const payload = {
      qty: 1,
      pickupPoint: null,
      variantId: item.variations[0]?.uid,
      productId: item.uid,
      deliveryType: "HOME DELIVERY",
      seller_id: item.variations[0]?.prices?.seller_id,
      sku: item.variations[0]?.prices?.sku,
    };
    addToCart(payload);
  };
  const [showTaoster, setShowToaster] = useState({
    show: false,
    message: "",
    color: "success",
  });
  useEffect(() => {
    if (isAddToCartSuccess) {
      dispacher(setCartLeng(datacart?.cartLength));
      window.localStorage.setItem("cartItem", datacart?.cart);
      setShowToaster({
        show: true,
        message: "Product added successfully!",
        color: "success",
      });
    }
    if (isAddToCartError) {
      setShowToaster({
        show: true,
        message: "Something went wrong Product Not Add",
        color: "danger",
      });
    }
  }, [isAddToCartSuccess, isAddToCartError]);

  const handleToaster = () => {
    setShowToaster({ ...showTaoster, show: false });
  };

  // Buy Now
  const navigate = useNavigate();

  const BuyNowItem = (item) => {
    console.log(item);

    const isLogin = window.localStorage.getItem('isLogin') === 'true';

    if (!isLogin) {
      setIsModalOpen(true);
      return;
    }
    setNames(item.name);
    // const payload = {
    //   qty: 1,
    //   pickupPoint: null,
    //   variantId: item.variations[0]?.uid,
    //   productId: item.uid,
    //   deliveryType: "HOME DELIVERY",
    //   seller_id: item.variations[0]?.prices?.seller_id,
    //   sku: item.variations[0]?.prices?.sku,
    // };
    const payload = {
      qty: 1,
      pickupPoint: null,
      variantId: item.selectedVariation?.uid,
      productId: item.uid,
      deliveryType: "HOME DELIVERY",
      seller_id: item.selectedVariation?.prices?.seller_id,
      sku: item.selectedVariation?.prices?.sku,
    };

    addToCart(payload);
    setTimeout(() => {
      navigate("/checkout");
    }, 1000);
  };

  const settings = {
    speed: 500,
    slidesToShow: slidesToShow > 3 ? 4 : slidesToShow, // Number of items to show on desktop
    slidesToScroll: 1,
    infinite: true,

    responsive: [
      {
        breakpoint: 1024, // Screen size for tablets
        settings: {
          slidesToShow: slidesToShow > 2 ? 4 : slidesToShow, // Number of items to show on tablets
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 768, // Screen size for mobile devices
        settings: {
          slidesToShow: 3, // Number of items to show on mobile
          slidesToScroll: 1,
          infinite: true,
          // arrows: false,
        },
      },
      {
        breakpoint: 500, // Screen size for mobile devices
        settings: {
          // slidesToShow: slidesToShow > 1 ? 1 : slidesToShow, // Number of items to show on mobile
          slidesToShow: 2, // Number of items to show on mobile
          slidesToScroll: 1,
          infinite: true,
          // arrows: false,
        },
      },
    ],
  };

  return (
    <>
      <CustomToaster
        color={showTaoster.color}
        title={names}
        show={showTaoster.show}
        setShow={handleToaster}
        message={showTaoster.message}
        position="bottom-end"
        delay={10000}
      />
      {isLoading && (
        <div className="loaderIcon">
          <BiLoaderAlt />
        </div>
      )}

      {isPopular ? (
        <div className="categoryWrapper">
          {data?.slice(0, 8).map((item, i) => {
            return (
              <React.Fragment key={item._id}>
                <div className="cusname">
                  <div className="featuredInfo products dddd">
                    <div className="featuredFigure">
                      <div className="featuredImg">
                        {/* <Link to={`/product/${item._id}`}> */}

                        <Link to={`/product/${item?.uid}/${item.slug}`}>
                          <img
                            src={
                              item?.variations[0]?.mainImage_url
                                ? item.variations[0]?.mainImage_url?.url
                                : item.variations[0]?.mainImage_url?.url
                            }
                            alt="Product"
                            className="imgProduct"
                          />
                        </Link>
                      </div>
                    </div>
                    <div className="featuredContent">
                      <h5>
                        <Link to={`/product/${item?.uid}/${item.slug}`}>
                          {item.name}
                        </Link>
                      </h5>

                      <span>
                        {t("MRP")}:{" "}
                        <span className="text-decoration-line-through">
                          ₹{item?.variations[0]?.prices?.mrp}
                        </span>
                      </span>

                      <p>
                        {t("Sale Price")}
                        :{" "}
                        {
                          item?.variations[0]?.prices?.country_id?.currency_id
                            ?.symbol
                        }
                        {item?.variations[0]?.prices?.sale_rate}
                        {/* <span className="currentPrice">{currencySymbol} {item?.variations[0]?.sale_rate}</span> */}
                      </p>

                      <div className="buyNowInfo">
                        <Link
                          className="btn btn-danger buyNow"
                          onClick={() => {
                            BuyNowItem(item);
                          }}
                          to={`/product/${item._id}`}
                        >
                          {t("Buy Now")}
                        </Link>

                        <Link
                          onClick={() => handleAddCart(item)}
                          to={`/product/${item?.uid}/${item.slug}`}
                          className="buyNow"
                        >
                          {t("Add in Cart")}{" "}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                {/* {i === 7 && <Brands />} */}
              </React.Fragment>
            );
          })}
        </div>
      ) : (
        data &&
        data?.slice(0, count).map((item, i) => {
          return (
            <React.Fragment key={item._id}>
              {/* <div className="col-lg-3 col-md-4 col-sm-4 col-6 cusname">
                <div className="featuredInfo products">
                  <div className="">
                    <div className="featuredImg featured">


                      <Link to={`/product/${item?.uid}/${item.slug}`}>
                        <img
                          src={
                            item?.variations[0]?.mainImage_url
                              ? item.variations[0]?.mainImage_url?.url
                              : item.variations[0]?.mainImage_url?.url
                          }
                          alt="Product"
                          className="imgProduct"
                        />
                      </Link>
                    </div>
                  </div>
                  <div className="featuredContent">
                    <Rating />
                    <h5>
                      <Link to={`/product/${item?.uid}/${item.slug}`}>
                        {item.name}
                      </Link>
                    </h5>
                    <span>
                      {t("MRP")}:{" "}
                      <span className="text-decoration-line-through">
                        ₹{item?.variations[0]?.prices?.mrp}
                      </span>
                    </span>

                    <p>
                      {t("Sale Price")}:{" "}
                      {
                        item?.variations[0]?.prices?.country_id?.currency_id
                          ?.symbol
                      }
                      {item?.variations[0]?.prices?.sale_rate}

                    </p>
                    <div className="buyNowInfo">
                      <Link
                        className="btn btn-danger buyNow"
                        to={`#`}
                        onClick={() => {
                          BuyNowItem(item);
                        }}
                      >
                        {t("Buy Now")}
                      </Link>

                      <Link
                        onClick={() => handleAddCart(item)}
                        to={`/product/${item?.uid}/${item.slug}`}
                        className="buyNow cart"
                      >
                        {t("Add in Cart")}
                      </Link>
                    </div>
                  </div>
                </div>
              </div> */}


              {Array.isArray(item?.variations) &&
                item.variations
                  .filter((variation) => variation?.isActive)
                  .map((variation, i) => {
                    return (
                      <div
                        key={variation._id}
                        className="col-lg-3 col-md-4 col-sm-4 col-6 cusname"
                      >
                        <div className="featuredInfo products">
                          <div className="featuredImg featured">
                            <Link
                              to={`/product/${item?.uid}/${item.slug}/${variation?.variant_slug}`}
                            >
                              <img
                                src={
                                  variation?.mainImage_url?.url ||
                                  variation?.images?.[0]?.url ||
                                  "/no-image.jpg"
                                }
                                alt={variation.name}
                                className="imgProduct"
                              />
                            </Link>
                          </div>

                          <div className="featuredContent">
                            <Rating />
                            <h5>
                              <Link
                                to={`/product/${item?.uid}/${item.slug}/${variation?.variant_slug}`}
                              >
                                {item?.name +
                                  (variation?.variant_slug
                                    ? " " + variation.variant_slug
                                    : "")}
                                {variation?.weight ? `(${variation.weight})` : ""}
                              </Link>
                            </h5>

                            <span>
                              {t("MRP")}:{" "}
                              <span className="text-decoration-line-through">
                                ₹{variation?.prices?.mrp}
                              </span>
                            </span>

                            <p>
                              {t("Sale Price")}: ₹{variation?.prices?.sale_rate}
                            </p>

                            <div className="buyNowInfo">
                              <Link
                                className="btn btn-danger buyNow"
                                to="#"
                                onClick={() =>
                                  BuyNowItem({ ...item, selectedVariation: variation })
                                }
                              >
                                {t("Buy Now")}
                              </Link>

                              <Link
                                onClick={() =>
                                  handleAddCart({ ...item, selectedVariation: variation })
                                }
                                to={`/product/${item?.uid}/${item.slug}/${variation?.variant_slug}`}
                                className="buyNow cart"
                              >
                                {t("Add in Cart")}
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}



              {/* {i === 7 && <Brands />} */}
            </React.Fragment >
          );
        })
      )}
      {/* <Brands /> */}
      {
        !isPopular && (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button
              type="button"
              onClick={changeLoad}
              className="commonButton"
              disabled={count > data?.length}
            >
              {t("Load More")}
            </button>
          </div>
        )
      }
      {
        error && (
          <div className="alertMsg mb-4" role="alert">
            No Data Found
          </div>
        )
      }

      <LoginAllPage
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        BuyNowItem={BuyNowItem}
      />
    </>
  );
}

export default FeaturedProduct;
