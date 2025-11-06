
import React, { useEffect, useState } from "react";
import login from "../../assets/img/login.png";
import { FaFacebookF } from "react-icons/fa";
import { BsTwitter } from "react-icons/bs";
import { AiOutlineGoogle } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useAddSellerMutation } from "../../components/products/productSlice";

function SignUpSeller() {
    const [state, setState] = useState({
        firstname: "",
        lastname: "",
        email: "",
        mobile: "",
        password: "",
        addressLine1: "",
        addressLine2: "",
        landmark: "",
        long: "",
        lat: "",
        province: ""

    })
    const [singhUp, { isLoading, error }] = useAddSellerMutation()


    const [location, setLocation] = useState({
        long: "",
        lat: ""
    })

    const changeLocation = (e) => {
        const clone = { ...location }
        clone[e.target.name] = e.target.value
        setLocation(clone)
    }



    const onchangeHandler = (e) => {
        const clone = { ...state }
        clone[e.target.name] = e.target.value
        setState(clone)
    }

    const navigate = useNavigate()
    const sendData = (event) => {
        event.preventDefault()
        const clone = { ...state, location: location }
        singhUp(clone)
        navigate('/allSeller')
    }


    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return <div className="registrationDetail">
        <div className="container">
            {isLoading && <div className="preloaderCount">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>}
            <div className="registrationInfo">
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
                    <h4 className="mb-4">Seller Sign-Up </h4>
                    <form className="registerFormField" onSubmit={sendData}>
                        <div className="mb-3">
                            <input
                                type="text"
                                value={state.firstname}
                                placeholder="firstname"
                                className="form-control"
                                autoComplete="off"
                                name="firstname"
                                onChange={onchangeHandler}
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="text"
                                placeholder="lastname"
                                value={state.lastname}
                                className="form-control"
                                autoComplete="off"
                                name="lastname"
                                onChange={onchangeHandler}
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="email"
                                placeholder="email"
                                value={state.email}
                                className="form-control"
                                autoComplete="off"
                                name="email"
                                onChange={onchangeHandler}
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="number"
                                placeholder="mobile"
                                value={state.number}
                                className="form-control"
                                autoComplete="off"
                                name="mobile"
                                onChange={onchangeHandler}
                            />
                        </div>

                        <div className="mb-3">
                            <input
                                type="text"
                                placeholder="longitude"
                                className="form-control"
                                required
                                name="long"
                                onChange={changeLocation}
                                autoComplete="off"
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="text"
                                placeholder="Latitude"
                                className="form-control"
                                required
                                name="lat"
                                onChange={changeLocation}
                                autoComplete="off"
                            />
                        </div>




                        <div className="mb-3">
                            <input
                                type="text"
                                placeholder="addressLine1"
                                value={state.addressLine1}
                                className="form-control"
                                autoComplete="off"
                                name="addressLine1"
                                onChange={onchangeHandler}
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="text"
                                placeholder="addressLine2"
                                value={state.addressLine2}
                                className="form-control"
                                autoComplete="off"
                                name="addressLine2"
                                onChange={onchangeHandler}
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="text"
                                placeholder="landmark"
                                value={state.landmark}
                                className="form-control"
                                autoComplete="off"
                                name="landmark"
                                onChange={onchangeHandler}
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="text"
                                placeholder="province"
                                value={state.province}
                                className="form-control"
                                autoComplete="off"
                                name="province"
                                onChange={onchangeHandler}
                            />
                        </div>



                        <div className="mb-3">
                            <input
                                type="password"
                                placeholder="password"
                                value={state.password}
                                className="form-control"
                                autoComplete="off"
                                name="password"
                                onChange={onchangeHandler}
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
                        <button className="btn btn-primary createAccount">
                            SignUp
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
                        <Link to="/seller/login">Login</Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
}
export default SignUpSeller