import React, { useEffect, useState } from "react";
import fertilizer1 from "../../../../assets/img/products/1.jpg";
import Rating from "../../../../shared/rating/Rating";

import { FiSearch } from "react-icons/fi";
import { GrAdd } from "react-icons/gr";
import { BiLoaderAlt } from "react-icons/bi";

// You need to import the CSS only once
// import "react-awesome-lightbox/build/style.css";

import { Link, useNavigate, useParams } from "react-router-dom";
import { ImgesData } from "../../proImgs/ImgesData";
import axios from "axios";
import {
  setCartLeng,
  setCartLists,
  useOfflineAddPostMutation,
  useSetCartMutation,
} from "../../../products/productSlice";
import { useDispatch, useSelector } from "react-redux";
import CollectionFilter from "../../../collecttion-filter/CollectionFilter";
import { CustomToaster } from "../../../../common/toaster/CustomToaster";
import { base_url } from "../../../../server";

function ProductItem({
  loadMore,
  setTotalProductLength,
  latestData,
  setLatestData,
  value,
  setValue,
  handleShow,
  t,
}) {
  const userid = window.localStorage.getItem("user_id");
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [isLoading, SetIsloading] = useState(true);
  const baseUrl = base_url();
  const getData = async () => {
    try {
      const res = await axios.post(`${baseUrl}product/filter`, {
        categories: [],
        brands: [],
        minPrice: "",
        maxPrice: "",
        sort: "1",
      });
      setData(res.data);
      setValue(res.data);
      setTotalProductLength(res.data);
      SetIsloading(false);
    } catch (error) {
      setError(true);
      SetIsloading(false);
    }
  };

  const getdataVal = async () => {
    try {
      const res = await axios.post(`${baseUrl}product/filter`, {
        categories: [],
        brands: [],
        minPrice: "",
        maxPrice: "",
        sort: "1",
        search: params?.val,
      });
      setData(res?.data);
      setValue(res?.data);
      setTotalProductLength(res?.data);
      SetIsloading(false);
    } catch (error) {
      setError(true);
      SetIsloading(false);
    }
  };

  const curr = window.localStorage.getItem("currencySym");
  let currencySymbol = curr;
  if (currencySymbol === "undefined") {
    currencySymbol = "AED";
  }

  const params = useParams();
  useEffect(() => {
    if (params.val) {
      getdataVal();
    } else {
      getData();
    }
  }, [params?.val]);

  const isLogin = window.localStorage.getItem("isLogin");
  const [
    postOffline,
    { data: resData, isSuccess, isError: offErr, isLoading: isloadPost },
  ] = useOfflineAddPostMutation();
  const navigate = useNavigate();

  const { updatedProducts: products } = useSelector((state) => {
    return state.productList;
  });

  const [
    addToCart,
    {
      data: datacart,
      isLoading: isAddCartLoading,
      isSuccess: isAddToCartSuccess,
      isError: isAddToCartError,
    },
  ] = useSetCartMutation();
  const [showTaoster, setShowToaster] = useState({
    show: false,
    message: "",
    color: "success",
  });
  const [names, setNames] = useState("");

  useEffect(() => {
    if (datacart) window.localStorage.setItem("cartItem", datacart?.cart);
  }, [datacart]);
  const BuyNowPro = (item) => {
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
      seller_id: item.variations[0]?.prices?.seller_id,
      sku: item.variations[0]?.prices?.sku,
    };
    addToCart(payload);
    setTimeout(() => {
      navigate("/checkout");
    }, 1000);
  };
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

  useEffect(() => {
    if (isSuccess) {
      navigate("/cart");
    }
  }, [isSuccess]);

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

  const dispacher = useDispatch();
  useEffect(() => {
    if (isSuccess) {
      dispacher(setCartLists(resData.cart.products));
    }
  }, [isSuccess, offErr]);

  const handleToaster = () => {
    setShowToaster({ ...showTaoster, show: false });
  };

  const [count, setCount] = useState(9);
  const changeLoad = () => {
    setCount(count + 3);
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
      {isLoading ? (
        <div className="loaderIcon">
          <BiLoaderAlt />
        </div>
      ) : null}
      {/* <CollectionFilter latestData={latestData} /> */}
      {latestData?.length === 0 && (
        <h6 className="text-center mb-5">No Found Data</h6>
      )}
      {value?.length ? (
        value?.slice(0, count).map((item, i) => {
          return (
            <>
              {/* <div
                className="col-lg-4 col-md-6 col-sm-6 col-6 cusname"
                key={item._id}
              >
                <div className="featuredInfo products">
                  <div className="">
                    {isloadPost && (
                      <div className="preloaderCount">
                        <div className="spinner-border" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </div>
                    )}
                    <div className="featuredImg">
                      <Link to={`/product/${item?.uid}/${item.slug}`}>
                        {item?.variations[0]?.mainImage_url?.url ? (
                          <img
                            src={item?.variations[0]?.mainImage_url?.url}
                            alt="Product"
                            className="img-fluid"
                          />
                        ) : (
                          <h5>product Not Found</h5>
                        )}
                      </Link>

                    </div>

                  </div>
                  <div className="featuredContent">
                    <Rating />
                    <h5>
                      <Link to={`/product/${item?.uid}/slug`}>{item.name}</Link>
                    </h5>

                    <span>
                      {t("MRP")}:{" "}
                      <span className="text-decoration-line-through">
                        ₹{item?.variations[0]?.prices?.mrp}
                      </span>
                    </span>

                    {item?.prices ? (
                      <p>
                        {t("Sale Price")}: {item?.country && item?.country?.code}{" "}
                        {item?.prices && item?.prices?.sale_rate}
                      </p>
                    ) : (
                      <p>
                        {
                          item?.variations[0]?.prices.country_id.currency_id
                            ?.symbol
                        }{" "}
                        {item?.variations[0]?.prices.sale_rate}
                      </p>
                    )}
                    <div className="buyNowInfo">
                      <Link
                        to="#"
                        onClick={() => {
                          BuyNowPro(item);
                        }}
                        className="btn btn-danger buyNow"
                      >
                        {t("Buy Now")}
                      </Link>
                      <Link
                        to={`#`}
                        onClick={() => handleAddCart(item)}
                        className="buyNow cart"
                      >
                        {t("add to Cart")}
                      </Link>
                    </div>
                    <div className="productDesc">
                      <p>{item.meta_description}</p>
                    </div>
                    <div className="featuredOption">
                      <select defaultValue={"DEFAULT"}>
                        <option value="DEFAULT">Select Option</option>
                        <option value="one">One</option>
                        <option value="two">Two</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div> */}

              {Array.isArray(item?.variations) &&
                item?.variations?.length > 0 &&
                item?.variations?.map((variation, i) => {
                  return <div
                    className="col-lg-4 col-md-6 col-sm-6 col-6 cusname"
                    key={item._id}
                  >
                    <div className="featuredInfo products">
                      <div className="">
                        {isloadPost && (
                          <div className="preloaderCount">
                            <div className="spinner-border" role="status">
                              <span className="visually-hidden">Loading...</span>
                            </div>
                          </div>
                        )}
                        <div className="featuredImg">
                          <Link to={`/product/${item?.uid}/${item.slug}/${variation?.variant_slug}`}>
                            {item?.variations[0]?.mainImage_url?.url ? (
                              <img
                                src={
                                  variation?.mainImage_url?.url ||
                                  variation?.images?.[0]?.url ||
                                  "/no-image.jpg"
                                }
                                alt="Product"
                                className="img-fluid"
                              />
                            ) : (
                              <h5>product Not Found</h5>
                            )}
                          </Link>
                          {/* <div className="quickView">
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
                  </div> */}
                        </div>
                        {/* <ul className="hotList">
                  <li>
                    <Link to="/products">hot ds</Link>
                  </li>
                  <li>
                    <Link to="products">- {item?.variations[0].discount}</Link>
                  </li>
                </ul> */}
                      </div>
                      <div className="featuredContent">
                        <Rating />
                        <h5>
                          <Link to={`/product/${item?.uid}/${item.slug}/${variation?.variant_slug}`}>{item.name}</Link>
                        </h5>

                        <span>
                          {t("MRP")}:{" "}
                          <span className="text-decoration-line-through">
                            ₹{variation?.prices?.mrp}
                          </span>
                        </span>

                        {item?.prices ? (
                          <p>
                            {t("Sale Price")}: {item?.country && item?.country?.code}{" "}
                            {item?.prices && variation?.prices?.sale_rate}
                          </p>
                        ) : (
                          <p>
                            {
                              item?.variations[0]?.prices.country_id.currency_id
                                ?.symbol
                            }{" "}
                            {variation?.prices.sale_rate}
                          </p>
                        )}
                        <div className="buyNowInfo">
                          <Link
                            to="#"
                            onClick={() => {
                              BuyNowPro(item);
                            }}
                            className="btn btn-danger buyNow"
                          >
                            {t("Buy Now")}
                          </Link>
                          <Link
                            to={`#`}
                            onClick={() => handleAddCart(item)}
                            className="buyNow cart"
                          >
                            {t("add to Cart")}
                          </Link>
                        </div>
                        <div className="productDesc">
                          <p>{item.meta_description}</p>
                        </div>
                        <div className="featuredOption">
                          <select defaultValue={"DEFAULT"}>
                            <option value="DEFAULT">Select Option</option>
                            <option value="one">One</option>
                            <option value="two">Two</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>


                })}
            </>
          );
        })
      ) : (
        <h4>No Data</h4>
      )}

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

      {error && (
        <div className="alertMsg mb-4" role="alert">
          <h4 style={{ color: "red" }}>Server Error</h4>
        </div>
      )}
    </>
  );
}

export default ProductItem;
