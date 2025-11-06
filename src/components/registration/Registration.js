import React, { useState } from "react";
import login from "../../assets/img/h3-hero-banner-min.png";
import { FaFacebookF } from "react-icons/fa";
import { BsTwitter } from "react-icons/bs";
import { AiOutlineGoogle } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import {
  useGetCurrencyQuery,
  useGetLanguageQuery,
  useSetRegisterMutation,
} from "../products/productSlice";
import { Spinner } from "react-bootstrap";
import { useEffect } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { base_url } from "../../server";
import OtpModal from "../login/otpModal/OtpModal";

function Registration() {
  // const [setRegister, { data, isLoading, isError, isSuccess }] = useSetRegisterMutation();
  // const { data: language } = useGetLanguageQuery()
  // const { data: currency } = useGetCurrencyQuery()

  const [loginForm, setLoginForm] = useState({
    mobileNumber: "",
    countryCode: "+91",
  });

  const handleChangeLogin = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    const cloneData = { ...loginForm };
    cloneData[name] = value;
    setLoginForm(cloneData);
  };

  const loginOTP = async (data) => {
    try {
      const res = await axios.post(`${baseUrl}user/signup-otp`, data);
      console.log("res.data", res?.data);

      if (!res?.data?.error) {
        setShow(true);
      } else {
        alert(res?.data?.message);
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const verifyOTP = async (data) => {
    try {
      const res = await axios.post(`${baseUrl}user/signup-otp-verify`, data);
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const resendLoginOTP = async () => {
    try {
      const res = await axios.post(`${baseUrl}user/signup-otp-resend`, {
        mobile: loginForm.countryCode + loginForm.mobileNumber,
      });

      if (!res?.data?.error) {
        setShow(true);
      } else {
        alert(res?.data?.message);
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    loginOTP({ mobile: loginForm.countryCode + loginForm.mobileNumber });
    // loginFormStatus({ mobile: loginForm.countryCode + loginForm.mobileNumber });
  };
  const handleLoginVerify = async (otp) => {
    verifyOTP({
      mobile: loginForm.countryCode + loginForm.mobileNumber,
      otp: otp,
      currency: "643aedb211b57e222dffe64e",
      language: "63fb926bba4c51937001628a",
    });
  };

  const [show, setShow] = useState(false);

  const [isLoading, setisLoading] = useState(false);
  const [isError, setisError] = useState(false);
  const [isSuccess, setisSuccess] = useState(false);
  const { t } = useTranslation();
  const baseUrl = base_url();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    mobile: "",
    email: "",
    password: "",
    confirm_password: "",
    currency: "643aedb211b57e222dffe64e",
    language: "63fb926bba4c51937001628a",
    refer_code: "",
    long: "",
    lat: "",
  });
  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    const cloneData = { ...formData };
    cloneData[name] = value;
    setFormData(cloneData);
  };

  const [file, setFile] = useState(null);
  const onchagePhoto = (e) => {
    setFile(e.target.files[0]);
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setisLoading(true);
  //   setisError(false);
  //   const formDatas = new FormData();

  //   formDatas.append("firstname", formData.firstname);
  //   formDatas.append("lastname", formData.lastname);
  //   formDatas.append("email", formData.email);
  //   formDatas.append("mobile", formData.mobile);
  //   formDatas.append("password", formData.password);
  //   formDatas.append("confirm_password", formData.confirm_password);
  //   formDatas.append("refer_code", formData.refer_code);
  //   formDatas.append("currency", formData.currency);
  //   formDatas.append("language", formData.language);
  //   formDatas.append("long", formData.long);
  //   formDatas.append("lat", formData.lat);

  //   formDatas.append("image", file);

  //   try {
  //     const res = await axios.post(`${baseUrl}user/register`, formDatas);
  //     setisLoading(false);
  //     setisSuccess(false);
  //     setTimeout(() => {
  //       navigate("/login");
  //     }, 1000);
  //   } catch (error) {
  //     setisLoading(false);
  //     setisError(true);
  //     setisSuccess(false);
  //   }
  // };

  return (
    <>
      <Helmet>
        <title>Registration | adamclick</title>
        <meta name="keyword" content="adamclick" />
        <meta name="description" content="adamclick" />
      </Helmet>
      <div className="registrationDetail sectionPD">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="registerContent">
                <div className="contentHeader">
                  {isLoading && (
                    <div className="preloaderCount">
                      <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  )}
                  <h3>{t("Looks like youre new here")}!</h3>
                  <p>{t("Sign up with your mobile number to get started")}</p>
                </div>
                <div className="contentFooter">
                  <img src={login} alt="Login" className="img-fluid" />
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="registerForm w-100">
                <h4 className="mb-4">{t("Create an account")}.</h4>
                <p>
                  Create an account to access personalized features and enjoy a
                  seamless experience.
                </p>
                <form onSubmit={handleLoginSubmit}>
                  <div className="mb-3 d-flex gap-1">
                    <select
                      className="form-select w-25"
                      name="countryCode"
                      onChange={handleChangeLogin}
                    >
                      <option value="+91">+91</option>
                      <option value="+11">+11</option>
                    </select>
                    <input
                      type="number"
                      placeholder={t("Mobile Number")}
                      className="form-control w-100"
                      autoComplete="off"
                      name="mobileNumber"
                      onChange={handleChangeLogin}
                    />
                  </div>

                  {isError && <h4 style={{ color: "red" }}>login Fail ! </h4>}
                  {isSuccess && <h4>login Successfully !</h4>}
                  <button
                    className="commonButton justify-content-center w-100"
                    type="submit"
                  >
                    {t("Create Account")}
                    {isLoading && (
                      <Spinner
                        style={{ marginLeft: "7px" }}
                        animation="border"
                      />
                    )}
                  </button>
                </form>

                {/* <form className="row d-none" onSubmit={handleSubmit}>
                  <div className="col-lg-12">
                    <div className="mb-3">
                      <input
                        type="file"
                        className="form-control"
                        name="file"
                        onChange={onchagePhoto}
                        autoComplete="off"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="mb-3">
                      <input
                        type="text"
                        placeholder={t("First Name")}
                        className="form-control"
                        name="firstname"
                        onChange={handleChange}
                        autoComplete="off"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="mb-3">
                      <input
                        type="text"
                        placeholder={t("Last Name")}
                        className="form-control"
                        name="lastname"
                        onChange={handleChange}
                        autoComplete="off"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="mb-3">
                      <input
                        type="number"
                        placeholder={t("Mobile")}
                        className="form-control"
                        required
                        name="mobile"
                        onChange={handleChange}
                        autoComplete="off"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="mb-3">
                      <input
                        type="email"
                        placeholder="example@123"
                        className="form-control"
                        required
                        name={t("email")}
                        onChange={handleChange}
                        autoComplete="off"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="mb-3">
                      <input
                        type="text"
                        placeholder={t("Refer Code")}
                        className="form-control"
                        name="refer_code"
                        onChange={handleChange}
                        autoComplete="off"
                      />
                    </div>
                  </div> */}

                {/* <div style={{ margin: "10px 0" }}>
                <select className="form-select" name="language" onChange={handleChange} aria-label="Default select example">
                  <option selected>Select Language</option>
                  {language && language.map((item) => {
                    return <option value={item._id}>{item.name}</option>
                  })}
                </select>
              </div>

              <div style={{ margin: "10px 0" }}>
                <select className="form-select" name="currency" onChange={handleChange} aria-label="Default select example">
                  <option selected>Select Language</option>
                  {currency && currency.map((item) => {
                    return <option value={item._id}>{item.name}</option>
                  })}
                </select>
              </div> */}

                {/* <div className="col-lg-6">
                    <div className="mb-3">
                      <input
                        type="password"
                        placeholder={t("Password")}
                        className="form-control"
                        required
                        name="password"
                        onChange={handleChange}
                        autoComplete="off"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="mb-3">
                      <input
                        type="password"
                        placeholder={t("Confirm Password")}
                        className="form-control"
                        required
                        name="confirm_password"
                        onChange={handleChange}
                        autoComplete="off"
                      />
                    </div>
                  </div> */}

                {/* <div className="mb-3">
                <input
                  type="text"
                  placeholder={t("longitude")}
                  className="form-control"
                  name="long"
                  onChange={handleChange}
                  autoComplete="off"
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  placeholder={t("Latitude")}
                  className="form-control"
                  name="lat"
                  onChange={handleChange}
                  autoComplete="off"
                />
              </div> */}
                {/* <div className="col-lg-6">
                    <div className="form-check mb-3">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        defaultValue
                        id="flexCheckDefault"
                        checked={show}
                        onClick={() => {
                          setShow(!show);
                        }}
                      />
                      <label
                        className="form-check-label agreeCheck"
                        htmlFor="flexCheckDefault"
                      >
                        {t(
                          "By signing up you agree to our terms and conditions"
                        )}
                        .
                      </label>
                    </div>
                  </div> */}
                {/* {isError && (
                    <h4 style={{ color: "red" }}>Registration Fail ! </h4>
                  )}
                  {isSuccess && <h4>Registration Successfully !</h4>}
                  <div className="col-lg-12">
                    <button
                      disabled={!show}
                      className="commonButton justify-content-center w-100"
                      type="submit"
                    >
                      {t("Create Account")}
                      {isLoading && (
                        <Spinner
                          style={{ marginLeft: "7px" }}
                          animation="border"
                        />
                      )}
                    </button>
                  </div>
                </form> */}

                <div className="joinWith">
                  <span>{t("or join with")}</span>
                </div>
                <div className="connectWith">
                  <ul>
                    <li>
                      <Link to="https://mmslfashions.in/" className="facebook">
                        <FaFacebookF />
                      </Link>
                    </li>

                    <li>
                      <Link to="https://mmslfashions.in/" className="twitter">
                        <BsTwitter />
                      </Link>
                    </li>

                    <li>
                      <Link to="https://mmslfashions.in/" className="google">
                        <AiOutlineGoogle />
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="alreadyAccount">
                  <p>{t("Already have an account")}?</p>
                  <Link to="/login">{t("welcome_to_reactt")}</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <OtpModal
        show={show}
        handleLoginVerify={handleLoginVerify}
        resendLoginOTP={resendLoginOTP}
        handleClose={() => setShow(false)}
      />
    </>
  );
}

export default Registration;
