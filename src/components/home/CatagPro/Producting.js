import React, { useState } from "react";

import { FiSearch } from "react-icons/fi";
import { GrAdd } from "react-icons/gr";
import { BiLoaderAlt } from "react-icons/bi";

// You need to import the CSS only once
// import "react-awesome-lightbox/build/style.css";

import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  setCartLeng,
  setFeachers,
  useGetProductDetailQuery,
  useSetCartMutation,
} from "../../products/productSlice";
import { CustomToaster } from "../../../common/toaster/CustomToaster";
import { useTranslation } from "react-i18next";

function Producting({ data, handleShow }) {
  const curr = window.localStorage.getItem("currencySym");
  const currencySymbol = curr ? curr : "QAR";
  const dispacher = useDispatch();

  useEffect(() => {
    dispacher(setFeachers(data));
  }, [data]);

  const [value, setValue] = useState(data);
  const [count, setCount] = useState(4);
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
      seller_id: item.prices?.seller_id,
      sku: item.prices?.sku,
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

  const navigate = useNavigate();

  const BuyNowItem = (item) => {
    // if (window.localStorage.getItem('isLogin') == 'false') {
    //   alert('Login First')
    //   return
    // }
    setNames(item.name);
    const payload = {
      qty: 1,
      pickupPoint: null,
      variantId: item.variations[0]?.uid,
      productId: item.uid,
      deliveryType: "HOME DELIVERY",
      seller_id: item.prices?.seller_id,
      sku: item.prices?.sku,
    };
    addToCart(payload);
    setTimeout(() => {
      navigate("/checkout");
    }, 1000);
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
      {value &&
        value?.slice(0, count).map((item, i) => {
          return (
            <div className="col-lg-3 col-md-6 col-sm-12" key={item._id}>
              <div className="featuredInfo">
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
                      {/* <img
                        src={item?.url}
                        alt="Product"
                        className="imgProduct"
                      /> */}
                    </Link>
                  </div>
                </div>
                <div className="featuredContent">
                  <h6>category</h6>
                  <h5>
                    <Link to={`/product/${item?.uid}/${item.slug}`}>
                      {item.name}
                    </Link>
                  </h5>

                  <p>

                      {" "}
                      {item?.prices?.country_id?.currency_id?.symbol}:
                      {item?.prices?.sale_rate}
                    
                    {/* <span className="currentPrice">{currencySymbol} {item?.variations[0]?.sale_rate}</span> */}
                  </p>

                  <div className="buyNowInfo">
                    <Link
                      className="btn btn-danger buyNow"
                      to={`#`}
                      onClick={() => {
                        BuyNowItem(item);
                      }}
                    // to={`/product/${item._id}`}
                    >
                      Buy Now
                    </Link>

                    <Link
                      to={`#`}
                      onClick={() => handleAddCart(item)}
                      // to={`/product/${item?.uid}/${item.slug}`}
                      className="buyNow"
                    >
                      {t("Add to Cart")}{" "}
                      <i className="ri-arrow-right-up-fill"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      {/* <div style={{display:"flex" , justifyContent:"center"}}>
        <button type="button" onClick={changeLoad} className="btn btn-info" disabled={count > data?.length}>Load More..</button>
      </div> */}

      {false && (
        <div className="alertMsg mb-4" role="alert">
          No Data Found
        </div>
      )}
    </>
  );
}

export default Producting;
