import React, { useContext, useEffect, useState, useRef } from "react";
import { Helmet } from "react-helmet";
import { isMobile } from "react-device-detect";
import ReactImageZoom from "react-image-zoom";
import Slider from "react-slick";

import Review from "./review/Review";
import Breadcrumb from "../../../shared/breadcrumb/Breadcrumb";
import ProductDetailContent from "./product-detail-content/ProductDetailContent";
import SelectImageSlider from "./select-image-slider/SelectImageSlider";
import { BsFillCartFill, BsShareFill } from "react-icons/bs";
import { RiDownloadCloudFill } from "react-icons/ri";

import { productItemContext } from "../../../pages/product-detail";

import "./ProductDetail.css";
import {
  useSetCartMutation,
  setCartLists,
  useOfflineAddPostMutation,
  useSendComboMutation,
  setCartLeng,
} from "../../products/productSlice";
import { useNavigate, useParams } from "react-router-dom";
import { CustomToaster } from "../../../common/toaster/CustomToaster";
import { ImgesData } from "../proImgs/ImgesData";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import ModalQuatation from "./ModalQutation";

import strengthens from "../../../assets/img/category/strengthens.webp";
import bain from "../../../assets/img/category/bain.webp";
import oleo from "../../../assets/img/category/oleo.webp";
import KER_BENEFITS from "../../../assets/img/category/KER_BENEFITS.webp";
import maxresdefault from "../../../assets/img/category/maxresdefault.jpg";
import Kerastase_Elixir from "../../../assets/img/category/Kerastase_Elixir.jpg";

// swiper -------------------------------//

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import FeaturedProduct from "../featured-products/featured-product/FeaturedProduct";
import ReactPlayer from "react-player";
import { useTranslation } from "react-i18next";
import {
  FacebookIcon,
  FacebookShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import { base_url } from "../../../server";
import classnames from "classnames";
import { FiShoppingCart } from "react-icons/fi";
import { Spinner } from "react-bootstrap";
import LoginAllPage from "../../../common/loginAllPage/LoginAllPage";
import PdfCanvasViewer from "./PdfCanvasViewer";

function createMarkup(data) {
  return { __html: data };
}
function ProductDetail() {
  // prev
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const userid = window.localStorage.getItem("user_id");
  const isLogin = window.localStorage.getItem("isLogin");

  const [similorItems, setSimilorItems] = useState([]);
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
  const [productAdded, setProductAdded] = useState(false);
  const productData = useContext(productItemContext);
  const [mainImage, setMainImage] = useState(ImgesData[0]);
  const isProductAdded = window.localStorage.getItem("currentProductId");

  const [varint, setVariants] = useState({});
  const params = useParams();
  console.log(params);

  const [data, setData] = useState(null);
  const [isProduceDetailLoading, setisProduceDetailLoading] = useState(true);
  const [isError, setisError] = useState(false);
  const [productId, setProductId] = useState("");
  const token = window.localStorage.getItem("token");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isloadingVal, setIsloadingVal] = useState(true);
  const sliderRef = useRef();
  const baseUrl = base_url();
  const [filterState, setFilterState] = useState({
    categories: [],
    brands: [],
    minPrice: "",
    maxPrice: "",
    sort: "1",
  });
  const getAllDeta = async () => {
    const userId = userid ? userid : null;

    try {
      let user;
      if (params?.var) {
        user = await axios.get(
          `${baseUrl}product/public/${params._id}/${params.var}`,
          {
            withCredentials: true,
            headers: {
              "Access-Control-Allow-Origin": "*",
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        user = await axios.get(`${baseUrl}product/public/${params._id}`, {
          withCredentials: true,
          headers: {
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${token}`,
          },
        });
      }

      setData(user.data.product);
      getFilterd(user?.data.product?.category_id[0]?.uid);
      window.localStorage.setItem(
        "sellerId",
        user?.data?.product?.variations[0]?.prices[0]?.seller_id?._id
      );
      window.localStorage.setItem(
        "sku",
        user?.data?.product?.variations[0]?.prices[0]?.sku
      );
      setisProduceDetailLoading(false);
    } catch (error) {
      setisError(true);
      setisProduceDetailLoading(false);
    }
  };

  const getFilterd = async (id) => {
    try {
      const res = await axios.post(
        `${baseUrl}product/filter`,
        { ...filterState, categories: [id] },
        { withCredentials: true }
      );
      setSimilorItems(res.data);
      setIsloadingVal(false);
    } catch (error) {
      alert("Filter Not Apply");
      setIsloadingVal(false);
    }
  };
  useEffect(() => {
    getAllDeta();
    window.localStorage.setItem("variationsId", null);
    console.log(params._id);
    setProductId(params._id);
  }, [params._id, params.slug, params.var]);
  let imgs = mainImage?.url;
  if (data?.getaProduct?.mainimage_url?.url) {
    imgs = data?.getaProduct?.mainimage_url?.url;
  }

  const [zoomImageProps, setzoomImageProps] = useState({
    width: 530,
    height: 450,
    zoomWidth: 500,
    img: imgs,
  });

  const handleUniqueID = (currentElm) => {
    setMainImage(currentElm);
    setzoomImageProps({ ...zoomImageProps, img: currentElm.url });
  };

  const selllerId = window.localStorage.getItem("sellerId");
  let selId = selllerId;

  const handleAddCart = () => {
    const product_count = window.localStorage.getItem("productCount");
    const pickupPoint = window.localStorage.getItem("pickUpPoint");

    const deliveryType = window.localStorage.getItem("deliveryType");
    const product_id = params._id;
    const product_variant = window.localStorage.getItem("variationsId");

    // selId = '651bb0c828441564809cc1d4'
    if (!product_variant) {
      setShowToaster({
        show: true,
        message: "Something went wrong! Select Atleast  1 Variant",
        color: "danger",
      });
    }
    if (pickupPoint == "null") {
      const payload = {
        qty: product_count,
        pickupPoint: pickupPoint,
        variantId: product_variant,
        productId: params._id,
        deliveryType,
        // userid,
        seller_id: selllerId,
        sku: window.localStorage.getItem("SKU"),
      };
      addToCart(payload);
    } else {
      const payload = {
        qty: product_count,
        pickupPoint: pickupPoint,
        variantId: product_variant,
        productId: params._id,
        deliveryType,
        // userid,
        seller_id: selllerId,
        sku: window.localStorage.getItem("SKU"),
      };
      addToCart(payload);
    }
  };

  const handleToaster = () => {
    setShowToaster({ ...showTaoster, show: false });
  };
  const dispacher = useDispatch();

  const [mergsData, setMergsData] = useState(data?.images);
  useEffect(() => {
    window.scrollTo(0, 0);
    if (data) {
      if (data?.isGlobalImage) {
        const clone = {
          width: 530,
          height: 450,
          zoomWidth: 500,
          img: data?.mainImage_url?.url,
        };
        setzoomImageProps(clone);
        setSiliderImage(data?.images);
      } else {
        const clone = {
          width: 530,
          height: 450,
          zoomWidth: 500,
          img: data?.variations[0]?.mainImage_url?.url,
        };
        setzoomImageProps(clone);
        setSiliderImage(data?.variations[0]?.images);
      }
    }
  }, [data]);

  const setSiliderImage = (images) => {
    const cloen = images;
    // const obj = { url: clone?.img };
    // cloen.push(obj);
    setMergsData(cloen);
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
    if (isProductAdded) {
      setProductAdded(true);
    } else {
      setProductAdded(false);
    }
  }, [isAddToCartSuccess, isAddToCartError, isProductAdded]);

  const shortVariant = (data) => {
    setVariants({ ...data });
  };
  const product_variant = window.localStorage.getItem("variationsId");
  const { updatedProducts: products } = useSelector((state) => {
    return state.productList;
  });
  const [
    postOffline,
    { data: resData, isLoading, isSuccess, isError: offErr },
  ] = useOfflineAddPostMutation();

  const notLogin = (id) => {
    const product_count = window.localStorage.getItem("productCount");
    const pickupPoint = window.localStorage.getItem("pickUpPoint");

    const deliveryType = window.localStorage.getItem("deliveryType");
    const product_variant = window.localStorage.getItem("variationsId");
    if (selllerId === null) {
      selId = "64269f0df127906d53878d3d";
    }
    if (!Object.keys(varint).length) {
      setShowToaster({
        show: true,
        message: "Something went wrong! Select Atleast  1 Variant",
        color: "danger",
      });
    } else {
      if (pickupPoint == "null") {
        postOffline({
          product_count: product_count,
          product_variant: product_variant,
          deliveryType,
          seller_id: selId,
          sku: window.localStorage.getItem("SKU"),
          product_id: params._id,
          pickupPoint: null,
          products: products ? products : "",
          // minimum_order_qty: data?.minimum_order_qty,
          // total_quantity: data?.total_quantity,
        });
      } else {
        postOffline({
          product_count: product_count,
          product_variant: product_variant,
          deliveryType,
          seller_id: selId,
          sku: window.localStorage.getItem("SKU"),
          product_id: params._id,
          pickupPoint: pickupPoint,
          // minimum_order_qty: data?.minimum_order_qty,
          // total_quantity: data?.total_quantity,
        });
      }
    }
  };
  useEffect(() => {
    if (isSuccess) {
      setShowToaster({
        show: true,
        message: "Product added successfully!",
        color: "success",
      });
      dispacher(setCartLists(resData.cart.products));
    }
    if (offErr) {
      setShowToaster({
        show: true,
        message: "Product Not Added!",
        color: "danger",
      });
    }
  }, [isSuccess, offErr]);

  const [varientsval, setVariantsval] = useState(null);

  const navigate = useNavigate();
  const [count1, setCount1] = useState(0);
  const BuyNowItem = (item) => {
    const isLogin = window.localStorage.getItem("isLogin") === "true";

    if (!isLogin) {
      setIsModalOpen(true);
      return;
    }
    const payload = {
      qty: 1,
      pickupPoint: null,
      variantId: item.variations[count1]?.uid,
      productId: item.uid,
      deliveryType: "HOME DELIVERY",
      seller_id: item.variations[count1]?.prices[0].seller_id?._id,
      sku: item.variations[count1]?.prices[0].sku,
    };
    addToCart(payload);
    setTimeout(() => {
      navigate("/checkout");
    }, 1000);

    setTimeout(() => {
      navigate("/checkout");
    }, 1000);
  };

  const [
    sendCombos,
    { isLoading: isLoadingcomb, isError: isErrorcomb, isSuccess: issusscomb },
  ] = useSendComboMutation();

  const [dilevType, setdilevType] = useState("HOME DELIVERY");
  const homeDelever = (str) => {
    setdilevType(str);
  };

  const sendCombo = (id) => {
    if (dilevType === "HOME DELIVERY") {
      sendCombos({
        userid: userid,
        combo_id: id,
        deliveryType: dilevType,
        pickupPoint: null,
      });
    } else {
      console.log(dilevType);
      sendCombos({
        userid: userid,
        combo_id: id,
        deliveryType: dilevType,
        pickupPoint: null,
      });
      alert("Combo Not Added");
    }
    setTimeout(() => {
      navigate("/cart");
    }, 1000);
  };

  useEffect(() => {
    if (isErrorcomb) {
      alert("Server Error Combo Product Not Add");
    }
    if (issusscomb) {
      alert("Combo Product Add Successfully");
    }
  }, [isErrorcomb, issusscomb]);

  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);

  const changeImage = (item) => {
    if (item?.images?.length && !data.isGlobalImage) {
      setSiliderImage(item?.images);
      setzoomImageProps({ ...zoomImageProps, img: item.images[0].url });
    }
  };

  var settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  const settings2 = {
    speed: 500,
    slidesToShow: 7, // Number of items to show on desktop
    slidesToScroll: 1,
    infinite: true,
    responsive: [
      {
        breakpoint: 1024, // Screen size for tablets
        settings: {
          slidesToShow: 7, // Number of items to show on tablets
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768, // Screen size for mobile devices
        settings: {
          infinite: true,
          slidesToShow: 3, // Number of items to show on mobile
          slidesToScroll: 1,
          // arrows: false,
        },
      },
    ],
  };
  const handleSmallItemClick = (index) => {
    setCurrentSlide(index);
    sliderRef.current.slickGoTo(index);
  };

  const tabsData = [
    {
      _id: "1",
      title: "Description",
      text: `
      <h2>Product Description</h2>
      <p>This section contains detailed product information and benefits. Scroll down to explore the next sections.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vulputate lorem ut sem aliquam, vitae iaculis justo euismod. Donec quis augue et orci congue volutpat.</p>
      <p>Fusce dictum, lorem ut suscipit commodo, arcu metus tincidunt magna, et tincidunt nisl risus vel mi. Nullam quis fermentum justo. Curabitur ac gravida neque.</p>
    `,
    },
    {
      _id: "2",
      title: "Benefits",
      text: `
      <h2>Benefits</h2>
      <ul>
        <li>✔ Restores softness</li>
        <li>✔ Adds shine</li>
        <li>✔ Protects from dryness</li>
      </ul>
    `,
    },
    {
      _id: "3",
      title: "How to Use",
      text: `
      <h2>How to Use</h2>
      <p>Use twice a day for best results. Apply evenly on clean skin.</p>
    `,
    },
  ];

  const [activeTab, setActiveTab] = useState(null);
  // const [activeTab, setActiveTab] = useState(data?.description_tabs[0]?._id);
  useEffect(() => {
    if (
      Array.isArray(data?.description_tabs) &&
      data.description_tabs.length > 0
    ) {
      setActiveTab(data.description_tabs[0]?._id);
    } else {
      setActiveTab(null);
    }
  }, [data]);

  const sectionRefs = useRef([]);
  const isClickScrolling = useRef(false);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -40% 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      if (isClickScrolling.current) return;

      // Find the first visible section
      const visibleEntry = entries.find((entry) => entry.isIntersecting);
      if (visibleEntry) {
        const visibleId = visibleEntry.target.getAttribute("id");
        setActiveTab(visibleId);
      }
    }, observerOptions);

    sectionRefs.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, [data]);

  const handleTabClick = (id, index) => {
    setActiveTab(id);
    isClickScrolling.current = true;

    sectionRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    setTimeout(() => {
      isClickScrolling.current = false;
    }, 1000);
  };

  // useEffect(() => {
  //   const observerOptions = {
  //     root: null,
  //     rootMargin: "-40% 0px -40% 0px",
  //     threshold: 0,
  //   };

  //   const observer = new IntersectionObserver((entries) => {
  //     if (isClickScrolling.current) return;

  //     entries.forEach((entry) => {
  //       if (entry.isIntersecting) {
  //         setActiveTab(entry.target.id);
  //       }
  //     });
  //   }, observerOptions);

  //   sectionRefs.current.forEach((section) => {
  //     if (section) observer.observe(section);
  //   });

  //   return () => observer.disconnect();
  // }, []);

  // const handleTabClick = (id, index) => {
  //   setActiveTab(id);
  //   isClickScrolling.current = true;

  //   sectionRefs.current[index]?.scrollIntoView({
  //     behavior: "smooth",
  //     block: "start",
  //   });

  //   setTimeout(() => {
  //     isClickScrolling.current = false;
  //   }, 1000);
  // };

  // console.log(data);


  const isPdf = (url) => url?.toLowerCase().endsWith(".pdf");

  return (
    <>
      <Helmet>
        <title>Product Details</title>
        <meta name="keyword" content={"Adamclick"} />
        <meta
          name="description"
          content={`${data?.getaProduct?.meta_description}`}
        />
      </Helmet>
      {/* <Breadcrumb title={data?.getaProduct?.name} show={true} t={t} /> */}
      <ModalQuatation show={show} setShow={setShow} />
      {/* Start Product Details Area */}
      <CustomToaster
        color={showTaoster.color}
        title={data?.getaProduct?.name}
        show={showTaoster.show}
        setShow={handleToaster}
        message={showTaoster.message}
        position="bottom-end"
        delay={10000}
      />
      <section className="product-details-area">
        {/* {isLoading && <div className="preloaderCount">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>} */}
        {/* {isAddCartLoading && <div className="preloaderCount">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>      
        </div>} */}
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6 col-md-6">
              <div className="SelectImageSec row">
                {!isMobile && (
                  <div className="SelectImg col-lg-2 col-md-2 col-sm-2 col-xs-2">
                    {data && (
                      <SelectImageSlider
                        productData={mergsData}
                        handleUniqueID={handleUniqueID}
                      />
                    )}
                  </div>
                )}

                <div
                  className="product-details-image col-lg-10 col-md-10 col-sm-10 col-xs-10"
                  style={!isMobile ? { zIndex: "10" } : { zIndex: "0" }}
                >
                  {isMobile && (
                    <div className="mobileBanner">
                      <Slider {...settings} ref={sliderRef}>
                        {!!mergsData?.length &&
                          mergsData.map((item, index) => {
                            return (
                              <div className="image">
                                <img src={item?.url} />
                              </div>
                            );
                          })}
                      </Slider>
                      <div className="small-items">
                        {!!mergsData?.length && (
                          // <SelectImageSlider
                          //   productData={mergsData}
                          //   handleUniqueID={handleSmallItemClick}
                          // />
                          <Slider {...settings2}>
                            {mergsData?.map((item, i) => {
                              return (
                                <div
                                  className="productSliderItem"
                                  key={i}
                                  style={{ marginRight: "10px" }}
                                >
                                  <img
                                    src={item.url}
                                    className="img-fluid"
                                    alt="images"
                                    onClick={() => {
                                      handleSmallItemClick(i);
                                    }}
                                  />
                                </div>
                              );
                            })}
                          </Slider>
                        )}
                      </div>
                    </div>
                  )}
                  {!isMobile && zoomImageProps?.img && (
                    <ReactImageZoom
                      // style={{ zIndex: "9999999", position: "relative" }}
                      {...zoomImageProps}
                    />
                  )}
                  {/* <div className="product-add-to-cart addToCart picture">
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
                        className={classnames("default-btn buy btn-row", {
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
                      className="default-btn cart"
                      onClick={() => BuyNowItem(data)}
                    >
                      <BsFillCartFill />
                      {t("Buy it now")}
                    </button>
                  </div> */}

                  <div className="product-add-to-cart addToCart picture">
                    {(() => {
                      const rawStatus =
                        data?.variations?.[0]?.display_status || "";
                      const status = rawStatus
                        .replace(/\u00A0/g, " ")
                        .trim()
                        .toLowerCase()
                        .replace(/[-_]/g, " ");

                      const isDisabled =
                        status.includes("coming soon") ||
                        status.includes("out of stock") ||
                        isAddCartLoading;

                      console.log("STATUS CHECK:", {
                        rawStatus,
                        parsed: status,
                        isDisabled,
                      });

                      return (
                        <>
                          <button
                            type="button"
                            className={classnames("default-btn cart btn-row", {
                              disabled: isDisabled,
                            })}
                            disabled={isDisabled}
                            onClick={() => {
                              if (!isDisabled)
                                handleAddCart(data?.product?.uid);
                            }}
                          >
                            <FiShoppingCart className="svg-icon" />
                            {t("Add to Cart")}
                            {isAddCartLoading && (
                              <Spinner animation="border" className="spinner" />
                            )}
                          </button>

                          <button
                            type="button"
                            className={classnames("default-btn cart", {
                              disabled: isDisabled,
                            })}
                            disabled={isDisabled}
                            onClick={() => {
                              if (!isDisabled) BuyNowItem(data);
                            }}
                          >
                            <BsFillCartFill />
                            {t("Buy it now")}
                          </button>
                        </>
                      );
                    })()}
                  </div>

                  <div className="shareProductSec button d-none">
                    <div className="titleText">
                      <BsShareFill />
                      <h6>{t("Share")}</h6>
                    </div>
                    <div className="shareProduct">
                      <ul>
                        <li>
                          <FacebookShareButton url={window.location.href}>
                            <FacebookIcon
                              logofillcolor="white"
                              round={true}
                            ></FacebookIcon>
                          </FacebookShareButton>
                        </li>

                        <li>
                          <WhatsappShareButton url={window.location.href}>
                            <WhatsappIcon
                              logofillcolor="white"
                              round={true}
                            ></WhatsappIcon>
                          </WhatsappShareButton>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {data?.comboDeals?.length > 0 && (
                    <div className="comboShowBox">
                      {data?.comboDeals[0]?.products.map((item, i) => {
                        return (
                          <div>
                            <div className="innerCombo" key={i}>
                              <div>
                                <img
                                  style={{ width: "110px", height: "110px" }}
                                  src={item?.image?.url}
                                  alt="images"
                                />
                              </div>
                              <div>
                                Product Name : {item.name} , variant :{" "}
                                {item?.variant[0].weight}
                              </div>
                            </div>
                            {data?.comboDeals[0]?.products.length === i + 1 ? (
                              <span></span>
                            ) : (
                              <span>+</span>
                            )}
                          </div>
                        );
                      })}
                      <div className="btncomboSec">
                        <div style={{ margin: "10px 0" }}>
                          <h5>
                            Offer Price : {data?.comboDeals[0]?.offer_Price}
                          </h5>
                        </div>
                        <ul
                          className="deliveryModeList storageNumber"
                          id="myTab"
                          role="tablist"
                        >
                          <li role="presentation">
                            <button
                              className={`nac-link`}
                              // className={`nac-link ${!str && 'active'}`}
                              id="homeDelivery-tab"
                              data-bs-toggle="tab"
                              data-bs-target="#homeDelivery"
                              type="button"
                              role="tab"
                              aria-controls="homeDelivery"
                              aria-selected="true"
                              onClick={() => homeDelever("HOME DELIVERY")}
                            >
                              Home Delivery
                            </button>
                          </li>

                          <li role="presentation">
                            <button
                              className={`nac-link`}
                              // className={`nac-link ${!str && 'active'}`}
                              id="pickup-tab"
                              data-bs-toggle="tab"
                              data-bs-target="#pickup"
                              type="button"
                              role="tab"
                              aria-controls="pickup"
                              aria-selected="true"
                              onClick={() => homeDelever("pickuppoint")}
                            >
                              Pickup From Store
                            </button>
                          </li>
                        </ul>
                        <button
                          type="Button"
                          className="default-btn buy"
                          onClick={() => {
                            sendCombo(data?.comboDeals[0]._id);
                          }}
                        >
                          <BsFillCartFill />
                          Buy it now!
                        </button>
                      </div>
                      {isLoadingcomb && (
                        <div className="preloaderCount">
                          <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="col-lg-6 col-md-6">
              <ProductDetailContent
                t={t}
                count1={count1}
                setCount1={setCount1}
                setVariantsval={setVariantsval}
                getAllDeta={getAllDeta}
                shortVariant={shortVariant}
                value={data}
                data={data}
                wish={data?.wish}
                isError={isError}
                isLoading={isProduceDetailLoading}
                isAddToCartSuccess={isAddToCartSuccess}
                isAddToCartError={isAddToCartError}
                changeImage={changeImage}
                handleShow={handleShow}
                handleAddCart={handleAddCart}
                isAddCartLoading={isAddCartLoading}
                BuyNowItem={BuyNowItem}
                params={params}
              />
            </div>

            <div className="col-lg-12">
              <div className="product-tabs-container">
                {/* Sidebar */}
                <div className="sidebar">
                  <ul className="tab-list">
                    {data?.description_tabs?.map((tab, index) => (
                      <li
                        key={tab._id}
                        className={`tab-item ${activeTab === tab._id ? "active" : ""
                          }`}
                        onClick={() => handleTabClick(tab._id, index)}
                      >
                        {tab.title}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Content */}
                <div className="tab-content">
                  {data?.description_tabs?.map((tab, index) => (
                    <section
                      key={tab._id}
                      id={tab._id}
                      ref={(el) => (sectionRefs.current[index] = el)}
                      className={`tab-section ${activeTab === tab._id ? "visible" : ""
                        }`}
                    >
                      <div
                        className="tab-inner"
                        dangerouslySetInnerHTML={{ __html: tab.text }}
                      />

                      {/* {tab?.images?.map((item, i) => (
                        <img
                          src={item}
                          alt=""
                          key={i}
                          style={{ maxHeight: "400px", width: "300px", marginRight: "10px" }}
                        />
                      ))} */}
                    </section>
                  ))}
                </div>
              </div>
            </div>



            <div className="container my-4">
              <div className="row g-4">
                {data?.reports?.map((item) => (
                  <div key={item._id} className="col-lg-12">
                    {/* <div className="p-3 border rounded shadow-sm bg-white"> */}
                    {/* <h5 className="mb-3">{item.title}</h5> */}
                    <PdfCanvasViewer url={item.url} title={item.title} />
                    {/* </div> */}
                  </div>
                ))}
              </div>
            </div>

            {/* <div
              style={{
                width: "100%",
                height: "100vh",
                overflowY: "scroll",
                scrollSnapType: "y mandatory",
                scrollBehavior: "smooth",
                backgroundColor: "#f8f9fa",
              }}
            >
              {data?.reports?.map((item) => (
                <section
                  key={item._id}
                  style={{
                    height: "100vh",
                    scrollSnapAlign: "start",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "20px",
                  }}
                >
                  <PdfCanvasViewer url={item.url} />
                </section>
              ))}
            </div> */}
          </div>
        </div>
      </section>

      <section className="productsSection sectionPD">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="fishermanHeader ">
                <div className="fisherman-content">
                  <h3>{t("Similar items")}</h3>
                  <p></p>
                </div>
                {/* <div className="fisherman-btn d-none">
                  <Link to="/products" className="optional-btn">
                    View More
                  </Link>
                </div> */}
              </div>
            </div>
            <FeaturedProduct
              data={similorItems}
              isLoading={isloadingVal}
              handleShow={handleShow}
            />
          </div>
        </div>

        {/* {modelDataId && (
          <QuiekViewModal modelDataId={modelDataId} show={show} onHide={handleClose} size="xl"
            centered />
        )} */}
      </section>

      <Review ids={params._id} />
      {/* <Review ids={window.localStorage.getItem('variant_id')} /> */}
      {/* {data && <RelatedProducts productData={data} />} */}
      {/* End Product Details Area */}

      <LoginAllPage
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}

export default ProductDetail;
