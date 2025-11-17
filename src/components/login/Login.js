import axios from "axios";
import React, { useEffect, useState } from "react";
import login from "../../assets/img/aiduac90jufnch4twj7q.jpg";
import { FaFacebookF } from "react-icons/fa";
import { BsTwitter } from "react-icons/bs";
import { AiOutlineGoogle } from "react-icons/ai";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useSetLoginMutation } from "../products/productSlice";
import { Spinner } from "react-bootstrap";
import { LoginSocialFacebook, LoginSocialGoogle } from "reactjs-social-login";
// import GoogleLogin from "react-google-login";
// import { LoginSocialFacebook } from "reactjs-social-login";
import { FcGoogle } from "react-icons/fc";
import { useTranslation } from "react-i18next";
import { base_url } from "../../server";
import OtpModal from "./otpModal/OtpModal";
import { toastSuccessMessage, toastSuccessMessageError } from "../../common/messageShow/MessageShow";
import { ToastContainer } from "react-toastify";

function Login() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [loginForm, setLoginForm] = useState({
    mobileNumber: "",
    countryCode: "+91",
    browser: "",
    long: "",
    lat: "",
    address: "",
    platform: "",
  });

  // const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };

  const handleChangeLogin = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    const cloneData = { ...loginForm };
    cloneData[name] = value;
    setLoginForm(cloneData);
  };

  const [loginFormStatus, { data, isError, isSuccess, isLoading }] =
    useSetLoginMutation();
  console.log(isError);

  const params = useParams();
  useEffect(() => {
    if (data?.token) {
      if (params?.login) {
        window.localStorage.setItem("token", data?.token);
        window.localStorage.setItem("user_id", data?._id);
        window.localStorage.setItem("isLogin", true);
        window.localStorage.setItem("email", data?.email);
        window.localStorage.setItem("mobile", data?.mobile);
        window.localStorage.setItem("profilePic", data?.image.url);
        // window.localStorage.setItem(
        //   "userName",
        //   `${data?.firstname} ${data?.lastname}`
        // );
        navigate("/cart");
        // window.location.reload();
        return;
      }
      setTimeout(() => {
        window.localStorage.setItem("token", data?.token);
        window.localStorage.setItem("user_id", data?._id);
        window.localStorage.setItem("isLogin", true);
        window.localStorage.setItem("email", data?.email);
        window.localStorage.setItem("mobile", data?.mobile);
        window.localStorage.setItem("profilePic", data?.image.url);
        window.localStorage.setItem(
          "userName",
          `${data?.firstname || ""} ${data?.lastname || ""}`
        );
        navigate("/");
        // window.location.reload();
      }, 1000);
    }
  }, [isLoading, isSuccess]);

  const loginOTP = async (data) => {
    try {
      const res = await axios.post(`${baseUrl}user/login-otp`, data);
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

  const resendLoginOTP = async () => {
    try {
      const res = await axios.post(`${baseUrl}user/login-otp-resend`, {
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
  const [mobileNumber, setMobileNumber] = useState("");
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    loginOTP({ mobile: loginForm.countryCode + loginForm.mobileNumber });
    setMobileNumber({ mobile: loginForm.countryCode + loginForm.mobileNumber })
    
    // loginFormStatus({ mobile: loginForm.countryCode + loginForm.mobileNumber });
  };
  
  const getDeviceInfo = () => {
    const browser = navigator.userAgent;
    const platform = navigator.platform;
    return { browser, platform };
  };

  // Helper function: Get location & address
  const getLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const lat = pos.coords.latitude;
          const long = pos.coords.longitude;

          try {
            // Reverse geocoding using OpenStreetMap API
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${long}`
            );
            const data = await res.json();
            const address = data.display_name || "Address not found";

            setLoginForm((prev) => ({
              ...prev,
              lat,
              long,
              address,
            }));
          } catch (error) {
            console.error("Address fetch error:", error);
          }
        },
        (err) => {
          console.warn("Location permission denied:", err);
        }
      );
    } else {
      console.warn("Geolocation not supported");
    }
  };

  // On mount, get browser/platform/location info
  useEffect(() => {
    const { browser, platform } = getDeviceInfo();
    setLoginForm((prev) => ({
      ...prev,
      browser,
      platform,
    }));
    getLocation();
  }, []);
  const handleLoginVerify = async (otp) => {
    // const clone = { ...loginForm, mobile: loginForm.countryCode + loginForm.mobileNumber, otp: otp, }
    // loginFormStatus(clone);
    try {
      const clone = {
        ...loginForm,
        mobile: loginForm.countryCode + loginForm.mobileNumber,
        otp: otp,
      };

      // mutation call
      const res = await loginFormStatus(clone).unwrap();
      // console.log("API Response:", res);
      if (res?.token) {
        toastSuccessMessage('Login successfully')
      } else {
        toastSuccessMessageError(res?.message)
      }

    } catch (err) {
      console.log("API Error:", err);
    }
  };

  const [gmailData, setGailData] = useState();

  const [isGoogleLogin, seIGoogle] = useState(false);
  const baseUrl = base_url();
  const sendValueGoogle = async (val) => {
    seIGoogle(true);
    try {
      const res = await axios.post(`${baseUrl}socialMedia/google`, {
        access_token: val?.data?.access_token,
      });

      window.localStorage.setItem("token", res.data.token);
      window.localStorage.setItem("user_id", res.data._id);
      window.localStorage.setItem("isLogin", true);
      window.localStorage.setItem("email", res.data.email);
      // window.localStorage.setItem("profilePic", data?.image?.url);
      window.localStorage.setItem(
        "userName",
        `${res?.data.firstname} ${res?.data.lastname}`
      );
      navigate("/");
    } catch (error) { }
    seIGoogle(false);
  };

  useEffect(() => {
    if (gmailData) {
      sendValueGoogle(gmailData);
    }
  }, [gmailData]);

  const responseFacebook = (response) => {
    console.log(response);
  };

  const { t } = useTranslation();
  return (
    <>
      <Helmet>
        <title>Login | adamclick</title>
        <meta name="keyword" content="adamclick" />
        <meta name="description" content="adamclick" />
      </Helmet>
      {/* <CustomToaste
        color={showTaoster.color}
        show={showTaoster.show}
        setShow={handleToaster}
        message={showTaoster.message}
        position="bottom-end"
        delay={10000}
      /> */}
      <div className="loginWrapper">
        <div className="registrationDetail sectionPD">
          <div className="container">
            <div className="registrationInfo">
              <div className="registerContent d-none">
                {isGoogleLogin && (
                  <div className="preloaderCount">
                    <div className="spinner-border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                )}
                <div className="contentHeader">
                  <h3>{t("Stay Updated on your professional world")}</h3>
                  <p>{t("Sign in with your mobile number to get started")}</p>
                </div>
                <div className="contentFooter">
                  <img src={login} alt="Login" className="img-fluid" />
                </div>
              </div>
              <div className="registerForm loginGlass">
                <h4 className="mb-4 loginTitle1">{t("Login to your account")}.</h4>
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
                      type="tel"
                      placeholder={t("Mobile Number")}
                      className="form-control w-100"
                      autoComplete="off"
                      name="mobileNumber"
                      maxLength="10"
                      onChange={handleChangeLogin}
                    />
                  </div>

                  <div className="mb-3 d-none">
                    <input
                      type="email"
                      placeholder={t("email")}
                      className="form-control"
                      autoComplete="off"
                    // name="email"
                    // onChange={handleChangeLogin}
                    />
                  </div>
                  <div className="mb-3 d-none">
                    <input
                      type="password"
                      placeholder={t("Password")}
                      className="form-control"
                      autoComplete="off"
                    // name="password"
                    // onChange={handleChangeLogin}
                    />
                  </div>
                  <div className="form-check mb-3 forgotInfo">
                    <div className="rememberText">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        defaultValue
                        id="flexCheckDefault"
                      />
                      <label
                        className="form-check-label agreeCheck"
                        htmlFor="flexCheckDefault"
                      >
                        {t("Remember Me")}
                      </label>
                    </div>
                    <div className="forgotText d-none">
                      <Link to="/reset">{t("Forgot password")}?</Link>
                    </div>
                  </div>
                  {isError && <h4 style={{ color: "red" }}>login Fail ! </h4>}
                  {/* {isSuccess && <h4>login Successfully !</h4>} */}
                  <button
                    className="commonButton justify-content-center w-100 loginBtn"
                    type="submit"
                  >
                    {t("OTP to login")}
                    {isLoading && (
                      <Spinner style={{ marginLeft: "7px" }} animation="border" />
                    )}
                  </button>
                  
                </form>
                <div className="joinWith d-none">
                  <span>{t("or login with")}</span>
                </div>
                <div className="connectWith d-none">
                  <ul>
                    <li>
                      {/* <a href="#"
                      appId="1007501343742455"
                      autoLoad={false}
                      // fields="name,email,picture"
                      callback={responseFacebook}
                      className="facebook">
                      <FaFacebookF />
                    </a> */}

                      <LoginSocialFacebook
                        client_id="1007501343742455"
                        discoveryDocs="claims_supported"
                        access_type="offline"
                        onResolve={(provider, data) => {
                          // setGailData(provider)
                          console.log(provider);
                        }}
                        onReject={(err) => {
                          console.log(err);
                        }}
                      >
                        <a href="#" className="facebook">
                          <FaFacebookF />
                        </a>
                      </LoginSocialFacebook>

                      {/* <FacebookLogin
                      appId="1007501343742455"
                      autoLoad={false}
                      // fields="name,email,picture"
                      callback={responseFacebook}
                      className="facebook"
                    /> */}

                      {/* <LoginSocialFacebook appId="1007501343742455"
                      onResolve={(res) => {
                        console.log(res);
                      }}
                      onReject={(rej) => {
                        console.log(rej);
                      }}
                    >
                    </LoginSocialFacebook> */}
                    </li>

                    <li>
                      <a href="#" className="twitter">
                        <BsTwitter />
                      </a>
                    </li>

                    <li>
                      <LoginSocialGoogle
                        client_id="459720570554-fa48vkc62ju5obdmj986bfmoh0g5gshs.apps.googleusercontent.com"
                        scope="email"
                        discoveryDocs="claims_supported"
                        access_type="offline"
                        onResolve={(provider, data) => {
                          setGailData(provider);
                        }}
                        onReject={(err) => {
                          console.log(err);
                        }}
                      >
                        <a href="#" className="google">
                          <FcGoogle />
                        </a>
                      </LoginSocialGoogle>
                    </li>
                  </ul>
                </div>
                <div className="alreadyAccount d-none">
                  <p>{t("Dont have an account")}?</p>
                  <Link to="/registration">{t("Register Now")}</Link>
                </div>
              </div>
            </div>
          </div>
          <OtpModal
            show={show}
            handleLoginVerify={handleLoginVerify}
            resendLoginOTP={resendLoginOTP}
            mobileNumber={mobileNumber}
            handleClose={() => setShow(false)}
          />
        </div>
        <ToastContainer />
      </div>
    </>
  );
}

export default Login;
