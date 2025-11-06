import React, { useRef, useState } from "react";
import login from "../../assets/img/login.png";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import axios from "axios";
import { base_url } from "../../server";

function Reset() {
  const resetRef = useRef();
  const navigate = useNavigate();
  const [reset, setReset] = useState(false);
  const baseUrl = base_url();
  const resetData = async () => {
    const res = await axios.post(`${baseUrl}user/forgot-password-token`, {
      email: resetRef.current.value,
    });
    window.localStorage.setItem("resetToken", res.data);
    if (res.status === 200) {
      setReset(true);
      resetRef.current.value = "";
    }
  };

  const conFermPass = async () => {
    const token = window.localStorage.getItem("resetToken");
    const res = await axios.put(`${baseUrl}user/reset-password/${token}`, {
      password: resetRef.current.value,
    });
    if (res.status === 200) {
      navigate("/login");
    }
  };
  return (
    <>
      <Helmet>
        <title>Reset Password | adamclick</title>
        <meta name="keyword" content="adamclick" />
        <meta name="description" content="adamclick" />
      </Helmet>
      <div className="registrationDetail">
        <div className="container">
          <div className="registrationInfo">
            <div className="registerContent">
              <div className="contentHeader">
                {reset ? (
                  <h3>Inter New Password</h3>
                ) : (
                  <h3>Reset Your Password</h3>
                )}
                <p>
                  Lost your password? Please enter your mobile number. You will
                  receive a link to create a new password via code
                </p>
              </div>
              <div className="contentFooter">
                <img src={login} alt="Login" className="img-fluid" />
              </div>
            </div>
            <div className="registerForm">
              {reset ? (
                <h4 className="mb-4">Inter New Password</h4>
              ) : (
                <h4 className="mb-4">Forgot password?</h4>
              )}
              {reset ? (
                <p>Enter your New password.</p>
              ) : (
                <p>Enter your email address to recover your password.</p>
              )}

              <form className="registerFormField">
                <div className="mb-3">
                  <input
                    type="text"
                    ref={resetRef}
                    placeholder={
                      reset
                        ? "Enter your New password"
                        : "Email or Mobile Number"
                    }
                    className="form-control"
                  />
                </div>
                {reset ? (
                  <button
                    className="btn btn-primary createAccount"
                    type="button"
                    onClick={conFermPass}
                  >
                    Submit Password
                  </button>
                ) : (
                  <button
                    className="btn btn-primary createAccount"
                    type="button"
                    onClick={resetData}
                  >
                    Reset Password
                  </button>
                )}
              </form>

              <div className="alreadyAccount reset">
                <p>Back to </p>
                <Link to="/registration">Login</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Reset;
