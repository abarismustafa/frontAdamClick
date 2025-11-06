
import React, { useEffect } from "react";
import login from "../../assets/img/login.png";
import { FaFacebookF } from "react-icons/fa";
import { BsTwitter } from "react-icons/bs";
import { AiOutlineGoogle } from "react-icons/ai";
import { Link } from "react-router-dom";

function SellerLogin() {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    
    return <div className="registrationDetail">
        <div className="container">
            <div className="registrationInfo">
                {/* {isLoading && <div className="preloaderCount">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>} */}
                <div className="registerContent">
                    <div className="contentHeader">
                        <h3>Stay Updated on your professional world</h3>
                        <p>Sign in with your mobile number to get started</p>
                    </div>
                    <div className="contentFooter">
                        <img src={login} alt="Login" className="img-fluid" />
                    </div>
                </div>
                <div className="registerForm">
                    <h4 className="mb-4">Seller Login</h4>
                    <form className="registerFormField" >
                        <div className="mb-3">
                            <input
                                type="email"
                                placeholder="email"
                                className="form-control"
                                autoComplete="off"
                                name="email"
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="password"
                                placeholder="Password"
                                className="form-control"
                                autoComplete="off"
                                name="password"
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
                                    Remember Me
                                </label>
                            </div>
                            <div className="forgotText">
                                <Link to="#">Forgot password?</Link>
                            </div>
                        </div>
                        <button className="btn btn-primary createAccount" type="submit">
                            login
                        </button>
                    </form>
                    <div className="joinWith">
                        <span>or login with</span>
                    </div>
                    <div className="connectWith">
                        <ul>
                            <li>
                                <a href="https://mmslfashions.in/" className="facebook">
                                    <FaFacebookF />
                                </a>
                            </li>

                            <li>
                                <a href="https://mmslfashions.in/" className="twitter">
                                    <BsTwitter />
                                </a>
                            </li>

                            <li>
                                <a href="https://mmslfashions.in/" className="google">
                                    <AiOutlineGoogle />
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="alreadyAccount">
                        <p>Don't have an account?</p>
                        <Link to="/seller/sign-Up">Register Now</Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
}
export default SellerLogin