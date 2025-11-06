import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import classnames from "classnames";

import payment1 from "../../../../assets/img/payment/1.svg";
import payment2 from "../../../../assets/img/payment/2.svg";
import payment3 from "../../../../assets/img/payment/3.svg";
import payment4 from "../../../../assets/img/payment/4.svg";
import payment5 from "../../../../assets/img/payment/5.svg";
import payment6 from "../../../../assets/img/payment/6.svg";
import payment7 from "../../../../assets/img/payment/7.svg";
import Spinner from "react-bootstrap/Spinner";

import { FiPackage, FiShoppingCart } from "react-icons/fi";
import { AiOutlineHeart, AiTwotoneHeart } from "react-icons/ai";
import { TbTags } from "react-icons/tb";
import { RxCross1 } from "react-icons/rx";
import { BiLoaderAlt, BiSolidColor } from "react-icons/bi";

import {
  setWishCalc,
  useGetPickUpPointsQuery,
  usePickupStockMutation,
  useSetWishListMutation,
} from "../../../products/productSlice";

import "./ProductDetailContent.css";
import { QuantityCounter } from "../../../cart/QuantityCounter";
import { CustomToaster } from "../../../../common/toaster/CustomToaster";
import axios from "axios";
import OthersSellers from "./OthersSellers";
import {
  BsChatLeftQuoteFill,
  BsFillCartFill,
  BsShareFill,
} from "react-icons/bs";
import { useDispatch } from "react-redux";
import { base_url } from "../../../../server";
import Slider from "react-slick";
import Rating from "../../../../shared/rating/Rating";

function ProductDetailContent({
  changeImage,
  wish,
  data,
  isLoading,
  value,
  isAddToCartSuccess,
  isAddToCartError,
  isError,
  shortVariant,
  setCount1,
  count1,
  getAllDeta,
  t,
  setVariantsval,
  handleShow,
  handleAddCart,
  isAddCartLoading,
  BuyNowItem,
  params
}) {
  const specialNotes = [
    "Effectively promotes skin regeneration and repairs damage with Salmon DNA (PDRN).",
    "Natural spicules enhance absorption of active ingredients and smoothen skin texture.",
    "Clinically proven to improve pores and skin texture after just one use.",
    "A blend of 5 types of ceramides and sea buckthorn water helps strengthen the skin barrier and soothe irritation.",
    "Dual-functional cosmetic certified for brightening and anti-wrinkle benefits.",
    "High-quality formula widely used in Korean aesthetic clinics and skincare salons.",
  ];

  const settingsForSpecial = {
    speed: 500,
    slidesToShow: 2, // Number of items to show on desktop
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1120, // Screen size for tablets
        settings: {
          slidesToShow: 2, // Number of items to show on tablets
          slidesToScroll: 1,
          arrows: false,
        },
      },
      {
        breakpoint: 1024, // Screen size for tablets
        settings: {
          slidesToShow: 2, // Number of items to show on tablets
          slidesToScroll: 1,
          arrows: false,
        },
      },
      {
        breakpoint: 768, // Screen size for mobile devices

        settings: {
          slidesToShow: 2, // Number of items to show on mobile
          slidesToScroll: 1,
          arrows: false,
        },
      },
      {
        breakpoint: 500, // Screen size for mobile devices
        settings: {
          slidesToShow: 1, // Number of items to show on mobile
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  };

  // console.log(params);


  const curr = window.localStorage.getItem("currencySym");
  let currencySymbol = curr;
  if (currencySymbol === "undefined") {
    currencySymbol = "QAR";
  }
  const { data: pickUpPointsData, isSuccess: pickupSuccess } =
    useGetPickUpPointsQuery();
  const [setWishList, { data: wishData, isSuccess, isError: wisherr }] =
    useSetWishListMutation();

  const [str, setStr] = useState(null);
  const [showTaoster, setShowToaster] = useState({
    show: false,
    message: "",
    color: "success",
  });
  const [pickupData, setPickupData] = useState();
  const [variantId, setVariantId] = useState("");
  const [storeAdd, setStoreAdd] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [selectedAtributeValue, setSelectedAtributeValue] = useState([]);
  const baseUrl = base_url();
  const handleActive = (itemId, itemIndex, item) => {
    changeImage(item);
    setCount1(itemIndex);
    window.localStorage.setItem("variationsId", item.uid);
    window.localStorage.setItem("sellerId", data.seller_id);
    setVariantId(itemId);
    setStoreAdd(null);
    shortVariant(item);
    window.localStorage.setItem("variant_id", itemId);
    window.localStorage.setItem(
      "SKU",
      data?.variations[itemIndex].prices[0].sku
    );
    setVariantsval(item);
  };
  const isLogin = window.localStorage.getItem("isLogin");
  const token = window.localStorage.getItem("token");
  const handleWishlist = (id) => {
    if (isLogin === "false") {
      setShowToaster({ show: true, message: "Login First !", color: "danger" });
      return;
    }
    const paylode = {
      userid: window.localStorage.getItem("user_id"),
      productid: id,
    };
    setWishList({ data: paylode, token: token });
  };

  const getDataPickUp = async (id) => {
    const res = await axios.get(`${baseUrl}pickupPoints/${id}`);
    setPickupData(res.data);
  };

  console.log(data?.seller_id);


  const handlePick = (pickup) => {
    setStr(pickup.pickupPoints.pickupPoint_name);
    window.localStorage.setItem("deliveryType", "Pickup Point Delivery");
    window.localStorage.setItem("pickUpPoint", pickup.pickupPoints._id);
    getDataPickUp(pickup.pickupPoints._id);
  };

  const dispacher = useDispatch();
  useEffect(() => {
    if (isAddToCartSuccess) {
      setShowToaster({
        show: true,
        message: "Product added successfully!",
        color: "success",
      });
    }
    if (isAddToCartError) {
      setShowToaster({
        show: true,
        message: "Something went wrong!",
        color: "danger",
      });
    }
    if (isSuccess) {
      getAllDeta();
      dispacher(setWishCalc(wishData?.wishlist?.length));
      setShowToaster({
        show: true,
        message: "Product WishList Add successfully!",
        color: "success",
      });
    }
    if (wisherr) {
      setShowToaster({
        show: true,
        message: "Product WishList Removed successfully!",
        color: "success",
      });
    }
  }, [isSuccess]);

  const handleToaster = () => {
    setShowToaster({ ...showTaoster, show: false });
  };

  useEffect(() => {
    window.localStorage.setItem("pickUpPoint", null);
    window.localStorage.setItem("deliveryType", "HOME DELIVERY");
    setStr(null);
  }, [pickupSuccess, data, isAddToCartSuccess, isAddToCartError, isSuccess]);

  const homeDelever = () => {
    setStr(null);
    window.localStorage.setItem("pickUpPoint", null);
    window.localStorage.setItem("deliveryType", "HOME DELIVERY");
  };
  useEffect(() => {
    window.localStorage.setItem("productCount", 1);
    window.localStorage.setItem("shippingId", "");
    console.log();
    setVariantsval(data?.variations[0]);
    window.localStorage.setItem("variant_id", data?.variations[0]?._id);
    const urlPath = window.location.pathname; // "/product/4/Baofeng-BF-888s-Licence-Free-Walkie-Talkie/pack-of-1"
    const segments = urlPath.split('/'); // splits by "/"
    const lastParam = segments[segments.length - 1]; // gets the last part
    // console.log('lastParam', lastParam, lastParam.length);
    if (data?.variantLists) {
      let firstItem = [];
      let varientData = [];
      data.variantLists.forEach((item) => {
        let obj = {};
        obj.title = item.title;
        obj.str = item?.data[0];
        firstItem.push(item?.data[lastParam.length > 12 ? 0 : lastParam]);
        varientData.push(obj);
      });
      console.log("varientData", varientData);
      setArrSave(varientData);
      // setSelectedAtributeValue(firstItem);
      setSelectedAtributeValue(param?.var);

      handleActive(data?.variations[0].uid, 0, data.variations[0]);
    }
  }, [data]);

  const setStoreSeller = (value) => {
    setStoreAdd(value);
    window.localStorage.setItem("otherSeller", value?.seller_id._id);
    window.localStorage.setItem("SKU", value?.sku);
  };

  const [getData, { data: dataVal, isSuccess: loads }] =
    usePickupStockMutation();
  const [newData, setNewData] = useState();

  const getPickupsPoints = () => {
    let val = window.localStorage.getItem("variationsId");
    if (val === "null") {
      val = data?.variations[0]._id;
    }
    let obj = {
      product_id: data._id,
      variant: val,
    };
    getData({ data: obj, token: token });
  };

  useEffect(() => {
    setNewData(dataVal);
    console.log(dataVal);
  }, [dataVal]);
  const param = useParams();
  const [arrSave, setArrSave] = useState([]);

  const getOnlyString = (str) => {
    const modifiedString = str.replace(
      /[\s!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/g,
      ""
    );
    const lowercaseString = modifiedString.toLowerCase();
    const sortedString = lowercaseString.split("").sort().join("");
    return sortedString;
  };
  function createMarkup(data) {
    return { __html: data };
  }
  const changeRequar = (str, title, i) => {
    // console.log(str);
    // debugger
    let variantState = [...arrSave];
    // console.log("variantState", variantState);
    if (variantState.length === 0) {
      variantState.push({ title, str });
    } else {
      let found = false;
      variantState.forEach((variant) => {
        if (variant.title === title) {
          found = true;
          variant.str = str;
        }
      });
      if (!found) {
        variantState.push({ title, str });
      }
    }
    setArrSave(variantState);
    let attributes = variantState.map((item) => item.str);
    // setSelectedAtributeValue(attributes);

    setSelectedAtributeValue(param?.var)
    data.variations.forEach((item, index) => {
      if (getOnlyString(item.weight) === getOnlyString(attributes?.join(" "))) {
        handleActive(item.uid, index, item);
      }
    });
  };

  const [pinInitial, setPinInitial] = useState("");
  const [uiShow, setUiShow] = useState(false);
  const [messageShow, setMessageShow] = useState("");
  const [isServiceable, setIsServiceable] = useState(null);

  const checkDelevery = async () => {
    if (!pinInitial) return;

    const clone = { pincode: pinInitial };
    try {
      const res = await axios.post(`${baseUrl}delivery-service/pincode`, clone);
      if (res?.data?.is_serviceable === true) {
        setMessageShow(res?.data?.message);
        setIsServiceable(true);
        setUiShow(true);
      } else {
        setMessageShow(res?.data?.message);
        setIsServiceable(false);
        setUiShow(true);
      }
    } catch (error) {
      setMessageShow("Something went wrong, please try again.");
      setIsServiceable(false);
      setUiShow(true);
    }
  };
  const navigate = useNavigate()

  console.log(data?.variations[0]?.variant_slug);

  return (
    <>
      {isLoading ? (
        <div className="loaderIcon details_loader">
          <BiLoaderAlt />
        </div>
      ) : (
        <div className="product-details-desc ">
          <CustomToaster
            color={showTaoster.color}
            title={data?.name}
            show={showTaoster.show}
            setShow={handleToaster}
            message={showTaoster.message}
            position="bottom-end"
            delay={5000}
          />

          <div>
            <div className="productBreadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item">
                  <Link
                    to={`/product/category/${data?.category_id[0]?.uid}/${data?.category_id[0]?.name}`}
                  >
                    {data?.category_id[0]?.name}
                  </Link>
                </li>
                <li className="breadcrumb-item">
                  <Link to="/">{data?.brand_id?.name}</Link>
                </li>
                <li className="breadcrumb-item active ellipsis">
                  <Link to="#">{data?.name}</Link>
                </li>
              </ol>
              <div className="shareFlex">
                <div className="iconSec">
                  <div className="iconD">
                    <BsShareFill />
                  </div>
                  <div className="iconD">
                    {wish ? (
                      <AiTwotoneHeart
                        style={{ fontSize: "20px" }}
                        onClick={() => {
                          handleWishlist(data?.uid);
                        }}
                      />
                    ) : (
                      <AiOutlineHeart
                        style={{ fontSize: "20px" }}
                        className="productWishList"
                        l
                        onClick={() => {
                          handleWishlist(data?.uid);
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
            <h5>
              {/* {data?.name} */}
              {data?.name + (data?.variations[0]?.variant_slug ? " " + data?.variations[0]?.variant_slug : "")}</h5>
            <div className="rateProduct">
              <div className="rateStar">
                <span>Rating: </span>
                <Rating />
              </div>
              <div className="rateNumber">
                <p>
                  <span>4</span>/5
                </p>
              </div>
            </div>
          </div>

          {isError && (
            <h3 style={{ color: "red" }}>Something Went Wrong Server Error </h3>
          )}

          {data?.brand_id && (
            <div style={{ display: "flex", alignItems: "center", marginBottom: '9px' }}>
              <h6 className="m-0"> {t("Brand")} : &nbsp; </h6>
              {/* <div style={{ maxWidth: "100px" }}> */}
              {!data?.brand_id?.logo.url ? (
                <span
                  style={{
                    color: "#242424",
                    fontWeight: "600",
                    fontSize: "24px",
                  }}
                >
                  {" "}
                  {data.brand_id.name}{" "}
                </span>
              ) : (
                <img src={data?.brand_id?.logo.url} style={{ maxWidth: '100px' }} className="w-50" />
              )}
              {/* </div> */}
            </div>
            // <h6>

            //   {!data?.brand_id?.logo.url ? (
            //     <span
            //       style={{
            //         color: "#242424",
            //         fontWeight: "600",
            //         fontSize: "24px",
            //       }}
            //     >
            //       {" "}
            //       {data.brand_id.name}{" "}
            //     </span>
            //   ) : (
            //     <div style={{ height: "30px", maxWidth: "100px" }}>
            //       <img src={data?.brand_id?.logo.url} />
            //     </div>
            //   )}
            // </h6>
          )}
          {false ? (
            "----"
          ) : (
            <div className="price d-block">
              <span className="d-block">
                MRP:{" "}
                <span className="text-decoration-line-through">
                  ₹ {data?.variations[count1]?.prices[0]?.mrp}
                </span>
              </span>

              <span className="new-price d-block">
                {t("Sale Price")}:{" "}
                <span
                  style={{
                    borderRadius: "5px",
                    color: "#000",
                  }}
                >
                  {
                    data?.variations[count1]?.prices[0]?.country_id?.currency_id
                      ?.symbol
                  }
                </span>{" "}
                <span></span>
                <>
                  {data ? (
                    <span style={{ fontSize: "24px" }}>
                      {data?.variations[count1]?.prices[0]?.sale_rate}
                    </span>
                  ) : (
                    // <span>{data?.variations[1]?.prices[1]?.sale_rate}</span>
                    <span>----</span>
                  )}
                  {/* {data ? (
                    <span style={{ margin: "0 10px" }} className="old-price">
                      {t('MRP')}: <span style={{ background: "green", padding: "1px 12px", borderRadius: "5px", color: "white" }}>{data?.variations[count1]?.prices[0]?.country_id?.currency_id?.symbol}</span> {data?.variations[count1]?.prices[0]?.mrp}

                    </span>
                  ) : (
                    <span style={{ margin: "0 10px" }} className="old-price">
                      {t('MRP')}: <span style={{ background: "green", padding: "1px 12px", borderRadius: "5px", color: "white" }}>{data?.variations[count1]?.prices[0]?.country_id?.currency_id?.symbol}</span> {data?.variations[count1]?.prices?.mrp}

                    </span>
                  )} */}
                  {/* {data ? (
                    <span className="save-price text-success">
                      {t('You save')}: {currencySymbol}{" "}
                      {data?.variations[0]?.prices[0]?.mrp - data?.variations[count1]?.prices[0]?.sale_rate}
                    </span>
                  ) :
                    (
                      <span className="save-price text-success">
                        {t('You save')}: {currencySymbol}{" "}
                        {data?.variations[count1]?.prices[0]?.mrp - data?.variations[count1]?.prices[0]?.sale_rate}
                      </span>
                    )
                  }           */}{" "}
                </>
              </span>
              <div className="pincodePart">
                <span>COD Delivery:</span>
                <div>
                  <div className="check">
                    <input
                      type="text"
                      inputMode="numeric"
                      maxLength={6}
                      placeholder="Enter Delivery Pincode"
                      className="form-control"
                      value={pinInitial}
                      onChange={(e) => {
                        let value = e.target.value.replace(/\D/g, "");
                        if (value.length <= 6) {
                          setPinInitial(value);
                        }

                        if (value === "") {
                          setUiShow(false);
                          setMessageShow("");
                          setIsServiceable(null);
                        }
                      }}
                    />

                    <button
                      type="button"
                      className="checkBtn"
                      onClick={checkDelevery}
                    >
                      Check
                    </button>
                  </div>
                  {uiShow && (
                    <p
                      style={{
                        color: isServiceable ? "green" : "red",
                        marginTop: "5px",
                        fontSize: "14px",
                      }}
                    >
                      {messageShow}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
          {/* {storeAdd ? (
            <span className="allTaxes">{storeAdd.tax_type} of All Taxes.</span>
          ) : (
            <span className="allTaxes">

              {data?.variations[0]?.prices[0]?.tax_type} of All Taxes.
            </span>
          )} */}
          {/* 
          {data?.tags?.length > 0 && (
            <div className="shareProductSec borderTop">
              <div className="titleText">
                <TbTags />
                <h6>
                  TAGS:
                  {data.tags.map((item, i) => {
                    return (
                      <span key={i} className="tags">
                        {item}
                      </span>
                    );
                  })}
                </h6>
              </div>
            </div>
          )} */}

          <div className="storagecontainer">
            <div className="storageInfo">
              <div className="productColorInfo ">
                <ul className="storageNumber productColorChoose d-block">

                  {Array.isArray(data?.variantLists) &&
                    data?.variantLists.map((item, i) => {
                      return (
                        <li key={i}>
                          <span>{item?.title}: </span>
                          {Array.isArray(item?.data) &&
                            item.data
                              .filter((val) => val?.variant_slug)
                              .map((val, it) => {
                                console.log(val);


                                return <button
                                  key={it}
                                  type="button"
                                  className={classnames({
                                    active: selectedAtributeValue.includes(val?.variant_slug),
                                  })}
                                  onClick={() => {
                                    changeRequar(val, item?.title, i);
                                    navigate(
                                      `/product/${params?._id}/${params?.slug}/${val?.variant_slug}`
                                    );
                                  }}
                                >
                                  {val?.variant_name}
                                </button>
                              })}
                        </li>
                      );
                    })}
                  {/* {data?.variation_Form &&
                    data?.variation_Form.map((item, i) => {
                      console.log(item);

                      return (
                        <li>
                          <span>{item?.title}: </span>
                          {item?.data?.map((val) => {
                            return (
                              <button
                                type="button"
                                className={classnames({
                                  active: selectedAtributeValue.includes(val),
                                })}
                                onClick={() => {
                                  changeRequar(val, item?.title);
                                }}
                              >
                                {val}
                              </button>
                            );
                          })}
                        </li>
                      );
                    })} */}
                </ul>
              </div>
            </div>
            {data?.variations?.[0]?.display_status && (
              <div className="productColorInfo mt-3">
                <div className="titleText flex items-center gap-2">
                  <BiSolidColor />
                  <h6>{t("AVAILABILITY")} :</h6>

                  {(() => {
                    const rawStatus = data?.variations?.[0]?.display_status || "";
                    const cleanStatus = rawStatus
                      .replace(/\u00A0/g, " ")
                      .trim()
                      .toLowerCase();

                    let color = "green";
                    let fontWeight = "bold";

                    if (cleanStatus.includes("out of stock")) {
                      color = "red";
                    } else if (cleanStatus.includes("coming soon")) {
                      color = "deeppink";
                    } else {
                      color = "green";
                    }

                    return (
                      <span
                        style={{
                          fontSize: "13px",
                          textTransform: "uppercase",
                          color,
                          fontWeight,
                        }}
                      >
                        {rawStatus}
                      </span>
                    );
                  })()}
                </div>
              </div>
            )}
            <div className="productCount">
              <div className="titleText">
                <FiPackage />
              </div>
              <div className="addQuantity _p-qty">
                <span>{t("Add Quantity")}</span>
                <div className="IncItem">
                  <QuantityCounter
                    countValue={data?.minimum_order_qty || 1}
                    val={data}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="product-details-desc">
            {data?.getaProduct?.quotation ? (
              <div className="product-add-to-cart addToCart">
                <button
                  type="button"
                  className={classnames("default-btn cart btn-row")}
                  onClick={handleShow}
                >
                  Ask Quotation
                  <BsChatLeftQuoteFill className="svg-icon" />
                </button>
              </div>
            ) : (
              <div className="product-add-to-cart addToCart d-none">
                {isLogin === "true" ? (
                  <button
                    type="button"
                    className={classnames("default-btn cart btn-row", {
                      disabled: isAddCartLoading,
                    })}
                    onClick={() => {
                      handleAddCart(data?.product?.uid);
                    }}
                  >
                    <FiShoppingCart className="svg-icon" />
                    {t("Add to Cart")}
                    {isAddCartLoading && (
                      <Spinner animation="border" className="spinner" />
                    )}
                  </button>
                ) : (
                  <button
                    type="button"
                    className={classnames("default-btn cart btn-row", {
                      disabled: isAddCartLoading,
                    })}
                    onClick={() => {
                      handleAddCart(data?.product?.uid);
                    }}
                  >
                    <FiShoppingCart className="svg-icon" />
                    {t("Add to Cart")}
                  </button>
                )}

                <button
                  type="Button"
                  className="default-btn buy"
                  onClick={() => BuyNowItem(data)}
                >
                  <BsFillCartFill />
                  {t("Buy it now")}
                </button>
              </div>
            )}
          </div>

          {/* <div className="storagecontainer borderTop">
            <div className="storageInfo">
              <div className="titleText">
                <TbTruckDelivery />
                <h6>DELIVERY MODE & SELLER</h6>
              </div> 
              <ul
                className="deliveryModeList storageNumber"
                id="myTab"
                role="tablist"
              >
                <button
                  type="button"
                  className={`btn btn-primary PickUpTab ${str && "active"}`}
                  data-bs-toggle="modal"
                  data-bs-target="#pickupStore"
                  onClick={getPickupsPoints}
                >
                  Pick up from store
                </button>
                {str && <div>Pick up Point :{str}</div>}

                <div
                  className="modal fade"
                  id="pickupStore"
                  tabIndex={-1}
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog sellerPriceInfo">
                    <div className="modal-content">
                      <div className="sellerPriceContent">
                        <div className="sellerPriceHeader">
                          <h5>Pick up from store</h5>
                          <hr />
                          <button
                            type="button"
                            className="changeModalCancel"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          >
                            <RxCross1 />
                          </button>
                        </div>
                        <div className="modal-body sellerPriceBody p-0">
                          {dataVal?.length ? (
                            <div className="pickupList">
                              {dataVal.map((item, i) => {
                                if (!item.overSelling) {
                                  return (
                                    <div
                                      className="form-check mb-2 d-flex"
                                      key={item._id}
                                    >
                                      {!item.qty <= 0 && (
                                        <>
                                          {" "}
                                          <input
                                            className="form-check-input"
                                            type="radio"
                                            name={`flexRadioDefault`}
                                            id={item._id}
                                            value={item?.pickupPoints?.address}
                                            onClick={() => {
                                              handlePick(item);
                                            }}
                                            data-bs-dismiss="modal"
                                            aria-label="Close"
                                            readOnly
                                          />
                                          <label
                                            style={{ marginLeft: "10px" }}
                                            className="form-check-label"
                                            htmlFor={`flexRadioDefault`}
                                            onClick={() => {
                                              handlePick(item);
                                            }}
                                            data-bs-dismiss="modal"
                                            aria-label="Close"
                                          >
                                            {
                                              item?.pickupPoints
                                                ?.pickupPoint_name
                                            }
                                            dd
                                          </label>
                                          <div style={{ marginLeft: "20px" }}>
                                            ({item.qty})
                                          </div>
                                        </>
                                      )}
                                    </div>
                                  );
                                } else {
                                  return (
                                    <>
                                      {item.qty > 0 && (
                                        <div
                                          className="form-check mb-2 d-flex"
                                          key={item._id}
                                        >
                                          <input
                                            className="form-check-input"
                                            type="radio"
                                            name={`flexRadioDefault`}
                                            id={item._id}
                                            value={item?.pickupPoints?.address}
                                            onClick={() => {
                                              handlePick(item);
                                            }}
                                            data-bs-dismiss="modal"
                                            aria-label="Close"
                                            readOnly
                                          />
                                          <label
                                            style={{ marginLeft: "10px" }}
                                            className="form-check-label"
                                            htmlFor={`flexRadioDefault`}
                                            onClick={() => {
                                              handlePick(item);
                                            }}
                                            data-bs-dismiss="modal"
                                            aria-label="Close"
                                          >
                                            {
                                              item?.pickupPoints
                                                ?.pickupPoint_name
                                            }
                                          </label>
                                          {item.qty > 0 && (
                                            <div style={{ marginLeft: "20px" }}>
                                              ({item.qty})
                                            </div>
                                          )}
                                        </div>
                                      )}
                                    </>
                                  );
                                }
                              })}
                            </div>
                          ) : (
                            <div>No Pickup Points...</div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </ul> 

              <div className="tab-content" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="homeDelivery"
                  role="tabpanel"
                  aria-labelledby="homeDelivery-tab"
                >
                  <div className="deliveryDetail">
                    <div className="deliveryVan">
                      <span className="vanCircle">
                        <img
                          src={pickupVan}
                          alt="Product"
                          className="img-fluid"
                        />
                      </span>
                    </div>
                    <div className="deliveryDays">
                      <h6>Free Home Delivery</h6>
                      <p>in 1-2 days</p>
                    </div>
                  </div>
                </div>
              </div> *
            </div>
          </div> */}

          {str && (
            <div className="sellerInformation">
              <h5 className="sellerTitle">Pickup Address Detail</h5>
              <div className="sellerInfo">
                <span>You are buying from:</span>
                <p>
                  <h6>Pickup Point Name : {pickupData?.pickupPoint_name}</h6>
                </p>
                <h6>{pickupData?.address}</h6>
                <h6>Phone :{pickupData?.phone}</h6>
                <p>
                  <h6>Province : {pickupData?.province}</h6>
                </p>
              </div>
              <em className="sellerInfoProd">
                Product price may vary basis the selected seller
              </em>

              <div
                className={`modal fade`}
                id="sellerPriceModal"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog sellerPriceInfo">
                  <div className="modal-content ">
                    <div className="sellerPriceContent">
                      <div className="sellerPriceHeader">
                        <h5>Select a seller</h5>
                        <button
                          type="button"
                          className="changeModalCancel"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        >
                          <RxCross1 />
                        </button>
                      </div>
                      <div className="sellerPriceBody">
                        <ul
                          className="deliveryModeList storageNumber"
                          id="myTab"
                          role="tablist"
                        >
                          <li role="presentation">
                            <button
                              className="nav-link active"
                              id="home-tab"
                              data-bs-toggle="tab"
                              data-bs-target="#home"
                              type="button"
                              role="tab"
                              aria-controls="home"
                              aria-selected="true"
                              typeof="button"
                            >
                              Home Delivery
                            </button>
                          </li>
                          <li role="presentation">
                            <button
                              className="nav-link"
                              id="store-tab"
                              data-bs-toggle="tab"
                              data-bs-target="#store"
                              type="button"
                              role="tab"
                              aria-controls="store"
                              typeof="button"
                            >
                              Store Pickup
                            </button>
                          </li>
                        </ul>
                        <div className="tab-content" id="myTabContent">
                          <div
                            className="tab-pane fade show active"
                            id="home"
                            role="tabpanel"
                            aria-labelledby="home-tab"
                          >
                            <div className="homePriceInfo">
                              <div className="homePriceName">
                                <input
                                  type="radio"
                                  checked
                                  className="checkBox"
                                  readOnly
                                />
                                <span className="name">Zebrs</span>
                              </div>
                              <div className="priceSec">
                                <span className="priceInText">Price</span>
                                <span className="priceInInteger">
                                  ZK 57,754
                                </span>
                              </div>
                            </div>
                            <div className="homePriceInfo">
                              <div className="homePriceName">
                                <input
                                  type="radio"
                                  className="checkBox"
                                  readOnly
                                />
                                <span className="name">
                                  National Distributor
                                </span>
                              </div>
                              <div className="priceSec">
                                <span className="priceInText">Price</span>
                                <span className="priceInInteger">
                                  ZK 24,999
                                </span>
                              </div>
                            </div>
                          </div>
                          <div
                            className="tab-pane fade"
                            id="store"
                            role="tabpanel"
                            aria-labelledby="store-tab"
                          >
                            <div className="homePriceInfo">
                              <div className="homePriceName">
                                <input
                                  type="radio"
                                  checked
                                  className="checkBox"
                                  readOnly
                                />
                                <span className="name">
                                  vijay sales, lajpatnagar
                                </span>
                              </div>
                              <div className="priceSec">
                                <span className="priceInText">Price</span>
                                <span className="priceInInteger">
                                  ZK 37,754
                                </span>
                              </div>
                            </div>
                            <div className="homePriceInfo">
                              <div className="homePriceName">
                                <input
                                  type="radio"
                                  className="checkBox"
                                  readOnly
                                />
                                <span className="name">
                                  vijay sales, kalkaji
                                </span>
                              </div>
                              <div className="priceSec">
                                <span className="priceInText">Price</span>
                                <span className="priceInInteger">
                                  ZK 24,999
                                </span>
                              </div>
                            </div>
                            <div className="homePriceInfo">
                              <div className="homePriceName">
                                <input
                                  type="radio"
                                  className="checkBox"
                                  readOnly
                                />
                                <span className="name">
                                  anand electronics, south delhi
                                </span>
                              </div>
                              <div className="priceSec">
                                <span className="priceInText">Price</span>
                                <span className="priceInInteger">
                                  ZK 37,754
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="sellerScorecard">
                          <em className="text">
                            The Sellers are listed as per your internal city and
                            scorecard
                          </em>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {storeAdd && (
            <div className="sellerInfo">
              <span>You are buying from:</span>
              <p>
                <h6>
                  Store Name : {storeAdd.seller_id.firstname}{" "}
                  {storeAdd.seller_id.lastname}
                </h6>
              </p>

              <p>
                <strong>Address Line 1</strong>
                <h6>{storeAdd.seller_id?.addressLine1}</h6>
              </p>
              <p>
                <strong>Address line 2</strong>
                <h6> {storeAdd.seller_id?.addressLine1}</h6>
              </p>
              <p>
                <strong>Seller Company Name</strong>
                <h6>{storeAdd.seller_id?.company}</h6>
              </p>

              <p>
                <strong>landmark</strong>
                <h6> {storeAdd.seller_id?.landmark}</h6>
              </p>
            </div>
          )}

          {/* <h6
            style={{
              color: "#0074c9",
              cursor: "pointer",
              textAlign: "center",
              marginTop: "7px",
            }}
            onClick={() => setModalShow(true)}
          >
            {t("View More Sellers (Click Here)")}{" "}
          </h6> */}

          {/* <div className="buy-checkbox-btn">
            <div className="trustFigure">
              <img src={trust} alt="Product" className="img-fluid" />
            </div>
          </div> */}

          {data?.special_notes &&
            <div className="productDescText p-3 mb-3 border-start border-4 border-warning bg-warning bg-opacity-10 rounded">
              <h5 className="fw-bold text-warning mb-2">Special Notes</h5>
              <ul className="mb-0 list-unstyled">
                {console.log(data)
                }
                {data?.special_notes?.map((item, i) => {
                  // console.log(item);

                  return < li key={i} className="text-dark" > {item}</li>
                })}
                {/* {specialNotes.map((item, i) => (
                  <li key={i} className="text-dark">{item}</li>
                ))} */}
              </ul>
            </div>
          }

          {/* <div className="productDescText">
            <h5>Special Notes</h5>
            <ul>
              {specialNotes.map((item, i) => {
                return <li key={i}>{item}</li>;
              })}
            </ul>
          </div> */}

          {data?.offer_info_slid && (
            <div className="slideInfoText">
              <Slider {...settingsForSpecial}>
                {data?.offer_info_slid?.map((offer, i) => {
                  // Highlight words with <code> tag
                  let highlightedText = offer?.text;
                  if (offer?.highlights && Array.isArray(offer.highlights)) {
                    offer.highlights.forEach((word) => {
                      const regex = new RegExp(`(${word})`, "gi");
                      highlightedText = highlightedText.replace(
                        regex,
                        `<code>$1</code>`
                      );
                    });
                  }

                  return (
                    <div key={i}>
                      <div className="item">
                        <span>{offer?.title}</span>
                        <p
                          dangerouslySetInnerHTML={{ __html: highlightedText }}
                        />
                      </div>
                    </div>
                  );
                })}
              </Slider>
            </div>
          )}



          <div className="custom-payment-options d-none">
            <span>{t("Guaranteed safe checkout")}:</span>
            <div className="payment-methods">
              {/* <Link to="/">
                <img src={payment1} alt="image" />
              </Link> */}
              <Link to="/">
                <img src={payment2} alt="image" />
              </Link>
              <Link to="/">
                <img src={payment3} alt="image" />
              </Link>
              {/* <Link to="/">
                <img src={payment4} alt="image" />
              </Link> */}
              {/* <Link to="/">
                <img src={payment5} alt="image" />
              </Link> */}
              <Link to="/">
                <img src={payment6} alt="image" />
              </Link>
              {/* <Link to="/">
                <img src={payment7} alt="image" />
              </Link> */}
            </div>
          </div>
          <div
            className="custom_be07ed36-330c-456e-87db-e4b2a601c9cf d-none"
            style={{ margin: "10px 0" }}
          >
            <div
              width="100%"
              style={{
                borderRadius: 10,
                padding: "10px 20px 10px 20px",
                border: "1px solid #edf1f0",
              }}
            >
              <span color="#ca830a" style={{ color: "#2d2d2d" }}>
                {" "}
                {t("Free delivery for orders above 200")}
              </span>
              <br />
              <span style={{ color: "#2d2d2d" }}>
                {t("INR 100 delivery inside india")}
              </span>
              <br />
              <span style={{ color: "#2d2d2d" }} mce-data-marked={1}>
                {t("Cash or card on delivery")}{" "}
              </span>
            </div>
          </div>

          {modalShow && (
            <OthersSellers
              show={modalShow}
              onHide={() => setModalShow(false)}
              setStoreSeller={setStoreSeller}
              data={data}
              count1={count1}
            />
          )}
        </div >
      )
      }
    </>
  );
}

export default ProductDetailContent;
