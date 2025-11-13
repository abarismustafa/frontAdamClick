import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import axios from "axios";
import { useRef } from "react";
import { HiMiniBars3BottomRight } from "react-icons/hi2";
import { IoLanguageSharp } from "react-icons/io5";

import { useTranslation } from "react-i18next";
import {
  AiOutlineCloseCircle,
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from "react-icons/ai";
import { IoMdCall } from "react-icons/io";
import { BiLogInCircle, BiSearch, BiUser } from "react-icons/bi";
import { BsBuildingAdd, BsCart } from "react-icons/bs";
import { FaBabyCarriage, FaBars, FaShippingFast } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";

import tempProfileImg from "../../../assets/img/17822103.png";
import {
  getProducts,
  setCartLeng,
  setObjectVal,
  setUpdatedProducts,
  setWishCalc,
  useGetCartQuery,
} from "../../../components/products/productSlice";
import { base_url } from "../../../server";
import { getCartToken, getCouponToken } from "../../../Utils/localStorage";
import MobileMenu from "../menu/MobileMenu";
import "./SearchBox.css";
import Menus from "../menu/Menus";
import { TbGridDots, TbJewishStarFilled } from "react-icons/tb";
import { GrLanguage } from "react-icons/gr";
import { MdOutlineArrowDropDown, MdSell } from "react-icons/md";
import { CgTrack } from "react-icons/cg";
import { HiOutlineReceiptRefund } from "react-icons/hi";
import { SiAdobecreativecloud } from "react-icons/si";
import { VscActivateBreakpoints } from "react-icons/vsc";
import { GiNewspaper, GiWallet } from "react-icons/gi";

function SearchBox({ val, setCartLengLogout, setUpdatedProductsblack }) {
  const { t, i18n } = useTranslation();

  const userName = window.localStorage.getItem("userName");
  const profileImg = window.localStorage.getItem("profilePic");
  const userid = window.localStorage.getItem("user_id");
  const isLogin = window.localStorage.getItem("isLogin");
  const token = window.localStorage.getItem("token");
  const nums = window.localStorage.getItem("callNum");
  const mobile = window.localStorage.getItem("mobile");
  const [click, setClick] = useState(false);

  const { data, isSuccess, isFetching } = useGetCartQuery(token);
  // const { data: categoryData } = useGetMenuListQuery();

  const location = useLocation();

  const [brandLogo, setBrandLogo] = useState(null);
  const [categoryData, setcategoryData] = useState(null);
  const baseUrl = base_url();
  const getData3 = async () => {
    const res = await axios.get(`${baseUrl}category/public`, {
      withCredentials: true,
    });
    setcategoryData(res.data);
  };
  const getbrandLogo = async () => {
    const res = await axios.get(`${baseUrl}brand/public`, {
      withCredentials: true,
    });
    setBrandLogo(res.data);
  };

  useEffect(() => {
    getData3();
    getbrandLogo();
  }, []);

  const logout = async () => {
    // console.log("dfgfdg");

    try {
      const res = await axios.get(`${baseUrl}auth/logout`, {
        withCredentials: true,
      });
    } catch (error) { }
    window.localStorage.setItem("isLogin", false);
    window.localStorage.setItem("user_id", "");
    window.localStorage.setItem("token", "");
    window.localStorage.setItem("userName", "");
    window.localStorage.setItem("profilePic", false);
    window.localStorage.setItem("mobile", "");
    navigate("/login");
    dispatch(setWishCalc(0));
    dispatch(setCartLengLogout());
    dispatch(setUpdatedProductsblack());
  };

  useEffect(() => {
    setShowMenu(false);
    document.body.style.overflow = "unset";
  }, [location.pathname]);

  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  // const { data: value } = useGetWishListQuery(userid);
  const value = [];
  const [trendSearch, setTrendSearch] = useState(null);
  const inputRef = useRef();
  const handleRef = useRef();
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const [valuewish, setValuewish] = useState();

  const getDatas = async () => {
    try {
      // const res = await axios.get(`${baseUrl}user/wishlist`, {
      const res = await axios.get(`${baseUrl}user/wishlist_nw`, {
        withCredentials: true,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(setWishCalc(res.data.length));
    } catch (error) { }
    if (!token) {
      return;
    }
    try {
      const res2 = await axios.get(
        `${baseUrl}cart?products=${getCartToken() || ""}&coupon=${getCouponToken() || ""
        }`,
        {
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(setCartLeng(res2.data?.cart?.products.length));
      // window.localStorage.setItem("cartItem", res2.data?.cart);
    } catch (error) { }
  };

  useEffect(() => {
    getDatas();
  }, []);

  const [state, setState] = useState();
  const [countryPut, setCountryPut] = useState();

  const handleShow = () => {
    setShow(!show);
  };
  const handleShow2 = () => {
    setShow(false);
  };

  const { updatedProducts, products, cartLengh, WishLengh } = useSelector(
    (item) => {
      console.log(item);
      return item.productList;
    }
  );
  // console.log(WishLengh);

  useEffect(() => {
    if (data) {
      dispatch(getProducts(data.cart.products));
      dispatch(setObjectVal(data));
      if (isLogin === "true") {
        dispatch(setUpdatedProducts(data.cart));
      }
      // dispatch(setCartLeng(data.cart.products.length));
    }
  }, [data]);

  const handleClick = async () => {
    let currentVal = inputRef.current.value.toLowerCase();
    const res = await axios.get(
      `${baseUrl}product/search/${inputRef.current.value}`,
      { withCredentials: true }
    );
    navigate(`/products/${currentVal}`);
    currentVal = "";
    setShow(false);
    getData();
    inputRef.current.value = "";
  };

  const getData = async () => {
    const resData = await axios.get(`${baseUrl}product/trendingSearches`);
    setTrendSearch(resData?.data);
  };
  useEffect(() => {
    getData();
  }, []);

  // useEffect(() => {
  //   if (!handleRef.current) {
  //     return;
  //   }
  //   let handler = (e) => {
  //     if (show === true) {
  //       if (handleRef?.current && handleRef?.current?.contains(e.target)) {
  //         setShow(false);
  //       }
  //     }
  //   };
  //   document.addEventListener("mousedown", handler);

  //   return function () {
  //     document.removeEventListener("mousedown", handler);
  //   };
  // }, []);

  useEffect(() => {
    const handler = (e) => {
      if (show && handleRef.current && !handleRef.current.contains(e.target)) {
        setShow(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [show]);

  useEffect(() => {
    if (isLogin === "true") {
      setState(data);
    } else {
      setState([]);
    }
  }, [isFetching]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleClick();
    }
  };
  const onSearch = (onSearch) => {
    navigate(`/products/${onSearch}`);
    setShow(false);
  };

  const [data2, setData2] = useState();
  // console.log(data2);

  const changeApiData = async (e) => {
    if (e.target.value?.length > 2) {
      try {
        const resData = await axios.get(
          `${baseUrl}product/search/${e.target.value}`
        );
        // console.log(
        //   "resData.data?.getSearchedProduct",
        //   resData.data?.getSearchedProduct
        // );
        setData2(resData.data?.getSearchedProduct);
      } catch (error) { }
    }
  };
  const changeROutes = (item) => {
    // console.log(item);

    // navigate(`/product/${item.uid}/${item.slug}`);
    navigate(
      `/product/${item?.uid}/${item.slug}/${item?.variation?.variant_slug}`
    );
    setShow(false);
    inputRef.current.value = "";
    setData2([]);
  };

  const hideShowMenu = () => {
    if (showMenu) {
      document.body.style.overflow = "unset";
    } else {
      document.body.style.overflow = "hidden";
    }
    setShowMenu(!showMenu);
  };

  const putLangData = async (id) => {
    try {
      const res4 = await axios.put(`${baseUrl}settings/v1/change/language`, {
        id: id,
      });
      window.localStorage.setItem("languageCode", res4?.data?.languageCode);
      setCountryPut(res4.data);
      window.location.reload();
    } catch (error) {
      console.error("Error updating language data:", error);
      // Handle error appropriately, e.g., show a user-friendly message
    }
  };

  const handleLanguage = (id) => {
    if (id == "65111f1f78085e4cc5cce8ff") {
      // if (id == "687b531df91204f9c019b4c1") {
      i18n.changeLanguage("ten");
      window.localStorage.setItem("preferredLanguage", "ten");
      putLangData(id);
    } else {
      i18n.changeLanguage("de");
      window.localStorage.setItem("preferredLanguage", "de");
      putLangData(id);
    }
  };

  const [profileData, setProfiledata] = useState();
  // console.log(profileData);

  const getDataprofile = async () => {
    const res = await axios.get(`${baseUrl}user/profile`, {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${token}`,
      },
    });
    setProfiledata(res.data);
  };

  useEffect(() => {
    getDataprofile();
  }, []);

  return (
    <>
      <section
        className={`searchSec`}
        style={showMenu ? { height: "100vh" } : { height: "auto" }}
      >
        <div className={`d-flex mobileMenu ${showMenu ? "open" : ""}`}>
          <MobileMenu />
          <AiOutlineCloseCircle
            className="closeBtnDrop"
            onClick={hideShowMenu}
          />
        </div>
        <div className="container-fluid">
          <div className="searchItem">
            <div className="logo mamas">
              {/* <div
                className="categoryIcon"
                type="button"
                data-bs-toggle="offcanvas"
                href="#offcanvasExample"
                role="button"
                aria-controls="offcanvasExample"
              >
                <span>
                  <FaBars /> ddsfdsf
                </span>
              </div> */}

              <button
                id="menuButton"
                className="btn border-0 bg-transparent categoryIcon"
                type="button"
              >
                <span>
                  <FaBars />
                </span>
              </button>



              <Link to="/">
                <img
                  src={brandLogo ? brandLogo[0]?.logo?.url : ""}
                  alt={brandLogo ? brandLogo[0]?.name : ""}
                  title={brandLogo ? brandLogo[0]?.name : ""}
                  onClick={handleShow2}
                />

                {/* {brandLogo[0]?.logo?.url ? (
                  <img
                    src={brandLogo[0]?.logo?.url}
                    alt={brandLogo[0]?.name}
                    title={brandLogo[0]?.name}
                    onClick={handleShow2}
                  />
                ) : (
                  <img src={logo} alt="logo" onClick={handleShow2} />
                )} */}
              </Link>

              <div className="bar">
                <button
                  className="navbar-toggler"
                  type="button"
                // data-bs-toggle="collapse"
                // data-bs-target="#navbarSupportedContent"
                // aria-controls="navbarSupportedContent"
                // aria-expanded="false"
                // aria-label="Toggle navigation"
                >
                  <HiMiniBars3BottomRight onClick={hideShowMenu} />
                </button>
              </div>
              <div className="searchIcons mobile">
                <div className="supportNumberMobile">
                  <a href="tel:+91-9084074524">+91-9084074524</a>
                </div>
                {/*  <div className="optionSelect">
                <div className="lang1">
                  <select name="language" id="languId" className="form-select">
                    <option value="63fb926bba4c51937001628a">English</option>
                    <option value="DEFAULT" selected>
                      Hindi
                    </option>
                  </select>
                </div>
                <div className="rupees1">
                  <select name="currency" id="currId" className="form-select">
                    <option value="DEFAULT" selected>
                      {" "}
                      QAR{" "}
                    </option>
                  </select>
                </div>
              </div> */}
                <div className="socialMedia">
                  <ul>
                    {/* {isLogin === "true" && (
                      <li>
                        <button
                          type="button"
                          className="logoutBtn"
                          onClick={logout}
                        >
                          {t("welcome_to_react")}
                        </button>
                      </li>
                    )}
                    {isLogin === "false" && (
                      <li>
                        <Link to="/login"> {t("welcome_to_reactt")} </Link>
                      </li>
                    )} */}
                    {isLogin === "true" && (
                      <li
                        style={{
                          background: "white",
                          borderRadius: "100%",
                          marginRight: "-10px",
                          overflow: "hidden",
                        }}
                      >
                        {/* <AiOutlineUser /> */}
                        {profileImg ? (
                          <img
                            style={{ width: "20px", height: "20px" }}
                            src={
                              profileImg &&
                                profileImg != "" &&
                                profileImg != undefined
                                ? profileImg
                                : profileData?.getaUser?.profilePhoto?.url &&
                                  profileData?.getaUser?.profilePhoto?.url !==
                                  ""
                                  ? profileData?.getaUser.profilePhoto.url
                                  : tempProfileImg
                            }
                          />
                        ) : (
                          <img
                            style={{ width: "20px", height: "20px" }}
                            src={tempProfileImg}
                          />
                        )}
                      </li>
                    )}

                    {isLogin === "true" && (
                      <li className="userNamePro">
                        <Link to="/" className="userNameText">
                          {/* {profileData?.getaUser?.firstname &&
                          profileData?.getaUser?.lastname
                            ? `${profileData?.getaUser.firstname} ${profileData?.getaUser.lastname}`
                            : profileData?.getaUser?.selectedBillingAddress
                                ?.firstname &&
                              profileData?.getaUser?.selectedBillingAddress
                                ?.lastname
                            ? `${profileData?.getaUser.selectedBillingAddress.firstname} ${profileData?.getaUser.selectedBillingAddress.lastname}`
                            : profileData?.getaUser?.mobile || ""} */}
                          <MdOutlineArrowDropDown
                            style={{ fontSize: "19px" }}
                          />
                        </Link>
                        <ul className="dropdown-menu helll">
                          <li>
                            <AiOutlineShoppingCart />{" "}
                            <Link to="/myAccount">{t("My Oders")}</Link>
                          </li>
                          <li>
                            <TbJewishStarFilled />{" "}
                            <Link to="/wishlist">{t("My WishList")}</Link>
                          </li>
                          <li>
                            <FaBabyCarriage />{" "}
                            <Link to="/cart">{t("My Cart")}</Link>
                          </li>
                          <li>
                            <GiWallet />{" "}
                            <Link to="/myWallet">{t("My Wallet")}</Link>
                          </li>
                          <li>
                            <GiNewspaper />{" "}
                            <Link to="/my_product_reviews">
                              {t("My Product Reviews")}{" "}
                            </Link>
                          </li>
                          <li>
                            <VscActivateBreakpoints />{" "}
                            <Link to="/earning-points">
                              {t("My Earning Points")}
                            </Link>
                          </li>
                          <li>
                            <SiAdobecreativecloud />{" "}
                            {/* <Link to="/rma_history">{t("RMA History")}</Link> */}
                            <Link to="/returns/rma/list">{t("RMA List")}</Link>
                          </li>
                          <li>
                            <HiOutlineReceiptRefund />{" "}
                            <Link to="/sent-refund-request">
                              {t("Sent Refund Request")}
                            </Link>
                          </li>
                          <li>
                            <BsBuildingAdd />{" "}
                            <Link to="/billingAddress">
                              {t("My Billing Address")}
                            </Link>
                          </li>
                          <li>
                            <FaShippingFast />{" "}
                            <Link to="/shippingAddress">
                              {t("My Delivery Address")}
                            </Link>
                          </li>
                          <li>
                            <MdSell />{" "}
                            <Link to="/allSeller">{t("Visit Sellers")}</Link>
                          </li>
                          {/* <li><SiAdobecreativecloud /> <Link to="/seller/sign-Up">Become ETG Seller</Link></li> */}

                          <li>
                            <BiUser />{" "}
                            <Link to="/profile">{t("My Profile")}</Link>
                          </li>
                          <li>
                            <BiUser />{" "}
                            <Link to="/changePassword">
                              {t("Change Password")}
                            </Link>
                          </li>
                          <li>
                            <CgTrack />{" "}
                            <Link to="/track-order">{t("Track My Order")}</Link>
                          </li>
                          <li>
                            <MdSell />{" "}
                            {/* <Link to="/support_ticket">
                              {t("Support Ticket")}
                            </Link> */}
                            <Link to="/list-tickets">
                              {t("Support Ticket")}
                            </Link>
                          </li>
                          {isLogin === "true" && (
                            <li
                              className="py-1 px-3 text-uppercase"
                              onClick={logout}
                            >
                              <BiLogInCircle /> {t("welcome_to_react")}
                            </li>
                          )}
                          {isLogin === "false" && (
                            <li>
                              <BiLogInCircle />{" "}
                              <Link className="py-1 px-3" to="/login">
                                {t("welcome_to_reactt")}{" "}
                              </Link>
                            </li>
                          )}
                        </ul>
                      </li>
                    )}
                  </ul>
                </div>
                <div className="searchIconsItem">
                  <ul>
                    {isLogin === "false" && (
                      <li className="mobileDrop">
                        <Link to="/myAccount">
                          <BiUser />
                          <span className="iconText">{t("Account")}</span>
                        </Link>
                      </li>
                    )}

                    <li className="countWish">
                      <Link to="/wishlist">
                        {WishLengh > 0 && (
                          <span className="count">{WishLengh}</span>
                        )}
                        <AiOutlineHeart />
                        <span>{t("Wishlist")}</span>
                      </Link>
                    </li>
                    <li className="countParent">
                      <Link to="/cart">
                        <BsCart />
                        {cartLengh > 0 && (
                          <span className="count">{cartLengh}</span>
                        )}{" "}
                        <span>{t("Cart")}</span>
                      </Link>
                    </li>
                    <li>
                      {window.localStorage.getItem("preferredLanguage") ==
                        "de" ? (
                        <span
                          onClick={() => {
                            handleLanguage("65111f1f78085e4cc5cce8ff");
                          }}
                        >
                          <IoLanguageSharp />
                        </span>
                      ) : (
                        <span
                          onClick={() => {
                            handleLanguage("65111f5278085e4cc5cce904");
                          }}
                        >
                          <IoLanguageSharp />
                        </span>
                      )}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* <nav className="navbar navbarItem navbar-expand-md p-0">
              <Menus />
            </nav> */}
            <div className="searchSec customer">
              <div className="searchInf">
                <input
                  type="text"
                  className="form-control"
                  placeholder={`${t("Search Products")}...`}
                  onClick={handleShow}
                  ref={inputRef}
                  onKeyDown={handleKeyDown}
                  onChange={changeApiData}
                />

                <div className="rightSearchInfo">
                  <div className="allCategory">
                    <select defaultValue="all category">
                      <option value="All Category">{t("All Category")}</option>
                      {categoryData?.map((item) => {
                        return (
                          <option key={item?._id}>
                            <Link
                              to={`product/category/${item._id}/${item.slug}`}
                            >
                              {item?.name}
                            </Link>
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="searchIcon">
                    <BiSearch onClick={handleClick} />
                    {/* <button type="button" ></button> */}
                  </div>
                </div>
              </div>
              <div className="supportNumber">
                <p>
                  <span>
                    {" "}
                    <IoMdCall />
                  </span>{" "}
                  <a href="tel:+91-9084074524">+91-9084074524</a>
                </p>
              </div>
              {show && (
                <div className="treandingSec" id="DropShow" ref={handleRef}>
                  <div className="trendingItem">
                    {data2?.length > 0 && (
                      <div className="mainnaed">
                        {data2 &&
                          data2?.map((item) => {
                            // console.log(item);

                            return (
                              <>
                                {/* <div
                                  className="mainViy"
                                  onClick={() => {
                                    changeROutes(item);
                                  }}
                                >
                                  <img
                                    src={item?.variations[0]?.mainImage_url?.url}
                                    style={{
                                      border: "1px solid gray",
                                      width: "80px",
                                      height: "80px",
                                    }}
                                  />
                                  <div>
                                    <h6>{item?.name}</h6>
                                    <h6 style={{ whiteSpace: "nowrap" }}>
                                      {item?.country?.code}{" "}
                                      {item?.prices?.sale_rate}
                                    </h6>
                                  </div>
                                </div> */}

                                {Array.isArray(item?.variations) &&
                                  item?.variations
                                    // ✅ Only show active variations
                                    .filter((variation) => variation?.isActive)
                                    .map((variation, i) => {
                                      // console.log(variation);

                                      return (
                                        <div
                                          key={variation._id || i}
                                          className="mainViy"
                                          onClick={() => {
                                            changeROutes({
                                              ...item,
                                              variation,
                                              i,
                                            });
                                          }}
                                        >
                                          <img
                                            src={
                                              variation?.mainImage_url?.url ||
                                              variation?.images?.[0]?.url ||
                                              "/no-image.jpg"
                                            }
                                            style={{
                                              border: "1px solid gray",
                                              width: "80px",
                                              height: "80px",
                                              objectFit: "cover",
                                              borderRadius: "6px",
                                            }}
                                            alt={
                                              variation?.variant_slug ||
                                              "Product"
                                            }
                                          />
                                          <div>
                                            <h6>
                                              {item?.name +
                                                (variation?.variant_slug
                                                  ? " " +
                                                  variation?.variant_slug
                                                  : "")}
                                            </h6>
                                            <h6
                                              style={{ whiteSpace: "nowrap" }}
                                            >
                                              {variation?.country?.code}{" "}
                                              {variation?.prices?.sale_rate}
                                            </h6>
                                          </div>
                                        </div>
                                      );
                                    })}
                              </>
                            );
                          })}
                      </div>
                    )}

                    <h5 className="trendingTitle">Trending Search</h5>
                    <ul>
                      {trendSearch &&
                        trendSearch?.slice(0, 10)?.map((item, i) => {
                          return (
                            <li key={i}>
                              <Link
                                to={`/products/${item.query}`}
                                onClick={() => onSearch(item.query)}
                              >
                                {/* <div className="searchProduct">
                                  <img
                                    src={icon}
                                    alt={item?.query}
                                    title={item?.query}
                                    className="img-fluid"
                                  />
                                </div> */}
                                <span className="d-block"> {item?.query}</span>
                                {/* <span>₹379</span> */}
                              </Link>
                            </li>
                          );
                        })}
                    </ul>
                    <AiOutlineCloseCircle
                      className="closeBtnDrop"
                      onClick={handleShow}
                    />
                  </div>
                  {/* <div className="trendingItem">
                    <h5 className="trendingTitle">Discover more</h5>
                    <ul>
                      <li>
                        <Link to="/">INSECTICIDES</Link>
                      </li>
                      <li>
                        <Link to="/">FUNGICIDES</Link>
                      </li>
                      <li>
                        <Link to="/">HERBICIDES</Link>
                      </li>
                      <li>
                        <Link to="/">BACTERICIDES</Link>
                      </li>
                      <li>
                        <Link to="/">ACARICIDES/MITICIDES</Link>
                      </li>
                    </ul>
                    <AiOutlineCloseCircle className="closeBtnDrop" onClick={handleShow} />
                  </div> */}
                </div>
              )}
            </div>
            <div className="searchItemRight">
              <div className="searchIcons desktop">
                {/*  <div className="optionSelect">
                <div className="lang1">
                  <select name="language" id="languId" className="form-select">
                    <option value="63fb926bba4c51937001628a">English</option>
                    <option value="DEFAULT" selected>
                      Hindi
                    </option>
                  </select>
                </div>
                <div className="rupees1">
                  <select name="currency" id="currId" className="form-select">
                    <option value="DEFAULT" selected>
                      {" "}
                      QAR{" "}
                    </option>
                  </select>
                </div>
              </div> */}
                <div className="socialMedia">
                  <ul>
                    {/* {isLogin === "true" && (
                      <li>
                        <button
                          type="button"
                          className="logoutBtn"
                          onClick={logout}
                        >
                          {t("welcome_to_react")}
                        </button>
                      </li>
                    )}
                    {isLogin === "false" && (
                      <li>
                        <Link to="/login"> {t("welcome_to_reactt")} </Link>
                      </li>
                    )} */}
                    {isLogin === "true" && (
                      <li
                        style={{
                          background: "white",
                          borderRadius: "100%",
                          marginRight: "-10px",
                          overflow: "hidden",
                        }}
                      >
                        {/* <AiOutlineUser /> */}
                        {profileImg ? (
                          <img
                            style={{ width: "20px", height: "20px" }}
                            src={
                              profileImg &&
                                profileImg != "" &&
                                profileImg != undefined
                                ? profileImg
                                : profileData?.getaUser?.profilePhoto?.url &&
                                  profileData?.getaUser?.profilePhoto?.url !==
                                  ""
                                  ? profileData?.getaUser.profilePhoto.url
                                  : tempProfileImg
                            }
                          />
                        ) : (
                          <img
                            style={{ width: "20px", height: "20px" }}
                            src={tempProfileImg}
                          />
                        )}
                      </li>
                    )}

                    {isLogin === "true" && (
                      <li className="userNamePro">
                        <Link to="/" className="userNameText">
                          {profileData?.getaUser?.firstname &&
                            profileData?.getaUser?.lastname
                            ? `${profileData?.getaUser.firstname} ${profileData?.getaUser.lastname}`
                            : profileData?.getaUser?.selectedBillingAddress
                              ?.firstname &&
                              profileData?.getaUser?.selectedBillingAddress
                                ?.lastname
                              ? `${profileData?.getaUser.selectedBillingAddress.firstname} ${profileData?.getaUser.selectedBillingAddress.lastname}`
                              : profileData?.getaUser?.mobile || ""}
                          <MdOutlineArrowDropDown
                            style={{ fontSize: "19px" }}
                          />
                        </Link>
                        <ul className="dropdown-menu helll">
                          <li>
                            <AiOutlineShoppingCart />{" "}
                            <Link to="/myAccount">{t("My Oders")}</Link>
                          </li>
                          <li>
                            <TbJewishStarFilled />{" "}
                            <Link to="/wishlist">{t("My WishList")}</Link>
                          </li>
                          <li>
                            <FaBabyCarriage />{" "}
                            <Link to="/cart">{t("My Cart")}</Link>
                          </li>
                          <li>
                            <GiWallet />{" "}
                            <Link to="/myWallet">{t("My Wallet")}</Link>
                          </li>
                          <li>
                            <GiNewspaper />{" "}
                            <Link to="/my_product_reviews">
                              {t("My Product Reviews")}{" "}
                            </Link>
                          </li>
                          <li>
                            <VscActivateBreakpoints />{" "}
                            <Link to="/earning-points">
                              {t("My Earning Points")}
                            </Link>
                          </li>
                          <li>
                            <SiAdobecreativecloud />{" "}
                            {/* <Link to="/rma_history">{t("RMA History")}</Link> */}
                            <Link to="/returns/rma/list">{t("RMA List")}</Link>
                          </li>
                          <li>
                            <HiOutlineReceiptRefund />{" "}
                            <Link to="/sent-refund-request">
                              {t("Sent Refund Request")}
                            </Link>
                          </li>
                          <li>
                            <BsBuildingAdd />{" "}
                            <Link to="/billingAddress">
                              {t("My Billing Address")}
                            </Link>
                          </li>
                          <li>
                            <FaShippingFast />{" "}
                            <Link to="/shippingAddress">
                              {t("My Delivery Address")}
                            </Link>
                          </li>
                          <li>
                            <MdSell />{" "}
                            <Link to="/allSeller">{t("Visit Sellers")}</Link>
                          </li>
                          {/* <li><SiAdobecreativecloud /> <Link to="/seller/sign-Up">Become ETG Seller</Link></li> */}

                          <li>
                            <BiUser />{" "}
                            <Link to="/profile">{t("My Profile")}</Link>
                          </li>
                          <li>
                            <BiUser />{" "}
                            <Link to="/changePassword">
                              {t("Change Password")}
                            </Link>
                          </li>
                          <li>
                            <CgTrack />{" "}
                            <Link to="/track-order">{t("Track My Order")}</Link>
                          </li>
                          <li>
                            <MdSell />{" "}
                            {/* <Link to="/support_ticket">
                              {t("Support Ticket")}
                            </Link> */}
                            <Link to="/list-tickets">
                              {t("Support Ticket")}
                            </Link>
                          </li>
                          {isLogin === "true" && (
                            <li
                              className="py-1 px-3 text-uppercase"
                              onClick={logout}
                            >
                              <BiLogInCircle /> {t("welcome_to_react")}
                            </li>
                          )}
                          {isLogin === "false" && (
                            <li>
                              <BiLogInCircle />{" "}
                              <Link className="py-1 px-3" to="/login">
                                {t("welcome_to_reactt")}{" "}
                              </Link>
                            </li>
                          )}
                        </ul>
                      </li>
                    )}
                  </ul>
                </div>
                <div className="searchIconsItem">
                  <ul>
                    {isLogin === "false" && (
                      <li>
                        <Link to="/myAccount">
                          <BiUser />
                          <span className="iconText">{t("Account")}</span>
                        </Link>
                      </li>
                    )}

                    <li className="countWish">
                      <Link to="/wishlist">
                        <AiOutlineHeart />
                        {WishLengh > 0 && (
                          <span className="count">{WishLengh}</span>
                        )}
                        <span className="iconText">{t("Wishlist")}</span>
                      </Link>
                    </li>
                    <li className="countParent">
                      <Link to="/cart">
                        <BsCart />
                        {cartLengh > 0 && (
                          <span className="count">{cartLengh}</span>
                        )}{" "}
                        <span className="iconText">{t("Cart")}</span>
                      </Link>
                    </li>
                    <li>
                      {window.localStorage.getItem("preferredLanguage") ==
                        "de" ? (
                        <span
                          onClick={() => {
                            handleLanguage("65111f1f78085e4cc5cce8ff");
                          }}
                        >
                          <IoLanguageSharp />
                        </span>
                      ) : (
                        <span
                          onClick={() => {
                            handleLanguage("65111f5278085e4cc5cce904");
                          }}
                        >
                          <IoLanguageSharp />
                        </span>
                      )}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default SearchBox;
