import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { GrFacebookOption } from "react-icons/gr";
import {
  AiOutlineTwitter,
  AiOutlineInstagram,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from "react-icons/ai";
import { TbBrandWhatsapp, TbJewishStarFilled } from "react-icons/tb";
import { FaBabyCarriage, FaShippingFast, FaUser } from "react-icons/fa";
import "./TopHeader.css";
import { Link, useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import { MdOutlineArrowDropDown, MdSell } from "react-icons/md";
import { BiLogInCircle, BiUser } from "react-icons/bi";
import { SiAdobecreativecloud } from "react-icons/si";
import { VscActivateBreakpoints } from "react-icons/vsc";
import { isMobile } from "react-device-detect";
import {
  setCartLeng,
  setCartLengLogout,
  setUpdatedProductsblack,
  setWishCalc,
  useChangeCurrencyMutation,
  useChangeLanguageMutation,
  useGetCurrencyQuery,
  useGetLanguageQuery,
  useGetUserDetailQuery,
  usePostCartOfflineMutation,
} from "../../../components/products/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { clearUpdatedProduct } from "../../../components/products/productSlice";
import img from "../../../assets/img/client/2.jpg";
import { BsBuildingAdd } from "react-icons/bs";
import { CgTrack } from "react-icons/cg";
import { HiOutlineReceiptRefund } from "react-icons/hi";
import { GiNewspaper, GiWallet } from "react-icons/gi";
import axios from "axios";
import { base_url } from "../../../server";
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import { Button } from "react-bootstrap";
function TopHeader({ state, changeLange }) {
  const isLogin = window.localStorage.getItem("isLogin");
  const user_id = window.localStorage.getItem("user_id");
  const userName = window.localStorage.getItem("userName");
  const token = window.localStorage.getItem("token");
  const profileImg = window.localStorage.getItem("profilePic");
  const [user, setUser] = useState();
  const navigate = useNavigate();

  const [changeCurr, { isLoading: curLoad }] = useChangeCurrencyMutation();
  const [changeLang, { isLoading: langLoad }] = useChangeLanguageMutation();

  const { updatedProducts } = useSelector((state) => {
    return state.productList;
  });
  const { data: language } = useGetLanguageQuery();
  const { data: currency } = useGetCurrencyQuery();
  const [country, setCountry] = useState();
  const [selectCountry, setSeleDefCount] = useState();
  const [defLanguage, setdefLang] = useState();
  const [countryPut, setCountryPut] = useState();
  const dispatch = useDispatch();

  const logout = async () => {
    try {
      const res = await axios.get(`${baseUrl}auth/logout`, {
        withCredentials: true,
      });
    } catch (error) {}
    window.localStorage.setItem("isLogin", false);
    window.localStorage.setItem("user_id", "");
    window.localStorage.setItem("token", "");
    window.localStorage.setItem("userName", "");
    window.localStorage.setItem("profilePic", false);
    dispatch(setWishCalc(0));
    dispatch(setCartLengLogout());
    dispatch(setUpdatedProductsblack());
    navigate("/login");
  };

  const { data, isSuccess } = useGetUserDetailQuery(token);
  const baseUrl = base_url();
  const getCountryData = async () => {
    try {
      const [countryRes, settingsRes] = await Promise.all([
        axios.get(`${baseUrl}country`),
        axios.get(`${baseUrl}settings/v1/country`),
      ]);
      setCountry(countryRes.data);
      setSeleDefCount(settingsRes.data.id);
      window.localStorage.setItem("countryCode", settingsRes?.data?.code);
    } catch (error) {
      console.error("Error fetching country data:", error);
      // Handle error appropriately, e.g., show a user-friendly message
    }
  };

  const defaLang = async () => {
    try {
      const defLanRes = await axios.get(`${baseUrl}settings/v1/language`);
      window.localStorage.setItem("languageCode", defLanRes?.data?.code);
      setdefLang(defLanRes.data.id);
    } catch (error) {
      console.error("Error fetching default language:", error);
      // Handle error appropriately, e.g., show a user-friendly message
    }
  };

  useEffect(() => {
    getCountryData();
    defaLang();
    getData2();
  }, []);
  useEffect(() => {
    setUser(data);
    const va = window.localStorage.getItem("langs");
    setdefLang(va);
  }, [data]);

  const onchengeHandle = (e) => {
    if (e.target.id === "languId") {
      const obj = { userid: user_id, language: e.target.value };

      changeLang(obj);
    } else {
      const obj2 = { userid: user_id, currency: e.target.value };

      changeCurr(obj2);
    }
  };
  var settings = {
    dots: false,
    infinite: false,
    autoplay: true,
    arrows: false,
    speed: 100,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const putData = async (id) => {
    const res3 = await axios.put(
      `${baseUrl}settings/v1/change/country`,
      { id: id },
      { withCredentials: true }
    );
    window.localStorage.setItem("countryCode", res3?.data?.countryCode);

    setCountryPut(res3.data);
    window.location.reload();
  };
  const handleCountry = (e) => {
    putData(e.target.value);
  };
  const { t, i18n } = useTranslation();
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

  //   const handleLanguage = (e) => {
  //   e.preventDefault();
  //   let id = e.target.value;
  //   console.log("Selected language ID:", id);

  //   if (id == "65111f1f78085e4cc5cce8ff") {
  //     console.log("Changing language to English");
  //     i18n.changeLanguage("ten");
  //     window.localStorage.setItem("preferredLanguage", "ten");
  //     putLangData(id);
  //   } else if (id == "68bff9c994f96819954c2577") {
  //     console.log("Changing language to German");
  //     i18n.changeLanguage("de");
  //     window.localStorage.setItem("preferredLanguage", "de");
  //     putLangData(id);
  //   } else if (id == "68bffa7494f96819954c257a") {
  //     console.log("Changing language to Bangla");
  //     i18n.changeLanguage("bn");
  //     window.localStorage.setItem("preferredLanguage", "bn");
  //     putLangData(id);
  //   } else {
  //     console.log("Unknown language ID");
  //   }
  // };

  const [valcur, setvalcur] = useState(null);

  const getData2 = async () => {
    const res = await axios.get(`${baseUrl}language`);
    setvalcur(res.data);
  };
  return (
    <>
      <div className="topHeaderSec" id="topHead">
        <div className="container">
          <div className="topHeaderInfo">
            {!isMobile && (
              <div className="freeReturn ">
                {/* <p>{state?.front_top_message}</p> */}

                <div>
                  <p>{t("Productsdd")} </p>
                </div>
              </div>
            )}

            {curLoad ||
              (langLoad && (
                <div className="preloaderCount">
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ))}

            <div className="rightList">
              <div className="miscel">
                {window.localStorage.getItem("preferredLanguage") == "de" ? (
                  <Button
                    onClick={() => {
                      handleLanguage("65111f1f78085e4cc5cce8ff");
                    }}
                    variant="warning"
                  >
                    English
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      handleLanguage("65111f5278085e4cc5cce904");
                    }}
                    variant="warning"
                  >
                    عربي
                  </Button>
                )}
              </div>

              {/* {isMobile && (
                <div>
                  <p style={{ color: "#fff", fontSize: "10px" }}>
                    🚚 {t("MobileProductsdd")}{" "}
                  </p>
                </div>
              )} */}
              <div className="miscel">
                <div className="optionSelect">
                  <div className="lang">
                    <select
                      name="language"
                      id="languId"
                      value={defLanguage}
                      // onChange={(e) => {
                      //   handleLanguage(e);
                      // }}
                    >
                      {valcur &&
                        valcur.map((item) => {
                          return (
                            <option key={item._id} value={item._id}>
                              {item?.name}
                            </option>
                          );
                        })}
                    </select>
                    {/* <button type="button" onClick={() => {
                      // changeLange('en'),
                      handleLanguage('65111f1f78085e4cc5cce8ff')
                    }}>English</button>
                    <button type="button" onClick={changeLange('de')}>Hindi</button> */}
                  </div>
                  {/* <div className="rupees">
                    <select
                      defaultValue={"DEFAULT"}
                      name="currency"
                      id="currId"
                      className=""
                      onChange={onchengeHandle}
                    >
                      <option value="DEFAULT">
                        {" "}
                        {data?.getaUser?.currency?.name
                          ? data?.getaUser?.currency?.name
                          : "  QAR"}
                      </option>
                      {currency &&
                        currency.map((item) => {
                          if (item.name === data?.getaUser?.currency?.name) {
                            return;
                          } else {
                            return (
                              <option key={item._id} value={item._id}>
                                {item.name}
                                INR
                              </option>
                            );
                          }
                        })}
                    </select>
                  </div> */}
                  <select
                    className="countrySelect form-select"
                    aria-label="Default select example"
                    value={selectCountry}
                    onChange={handleCountry}
                    disabled
                  >
                    {country &&
                      country.map((item) => {
                        if (item?.name === data?.getaUser?.country?.name) {
                          return;
                        } else {
                          return (
                            <option key={item._id} value={item._id}>
                              {item.name}
                            </option>
                          );
                        }
                      })}
                  </select>
                </div>

                <div className="socialMedia">
                  <ul>
                    {isLogin === "true" && (
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
                    )}
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
                        {profileImg === "false" ? (
                          <AiOutlineUser
                            style={{ width: "20px", height: "20px" }}
                          />
                        ) : (
                          <img
                            style={{ width: "20px", height: "20px" }}
                            src={profileImg}
                          />
                        )}
                      </li>
                    )}

                    {isLogin === "true" && (
                      <li className="userNamePro">
                        <Link to="/" className="userNameText">
                          {userName} Profile
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
                            <Link to="/rma_history">{t("RMA History")}</Link>
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
                              {t("My Shipping Address")}
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
                            <Link to="/support_ticket">
                              {t("Support Ticket")}
                            </Link>
                          </li>
                          {isLogin === "true" && (
                            <li onClick={logout}>
                              <BiLogInCircle /> {t("welcome_to_react")}
                            </li>
                          )}
                          {isLogin === "false" && (
                            <li>
                              <BiLogInCircle />{" "}
                              <Link to="/login">{t("welcome_to_reactt")} </Link>
                            </li>
                          )}
                        </ul>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TopHeader;
