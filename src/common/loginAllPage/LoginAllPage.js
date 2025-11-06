
import React, { useEffect, useState } from "react";
import { Modal, Input, Button, Form, message } from "antd";
import './loginAllPage.css'
import { useNavigate, useParams } from "react-router-dom";
import { useSetLoginMutation } from "../../components/products/productSlice";
import axios from "axios";
import { base_url } from "../../server";

const LoginAllPage = ({ isOpen, onClose, BuyNowItem }) => {
    const [isOtpStep, setIsOtpStep] = useState(false);
    const [otp, setOtp] = useState("");
    const [loginForm, setLoginForm] = useState({ mobileNumber: "", countryCode: "+91" });
    const [gmailData, setGmailData] = useState();
    const [isGoogleLogin, setIsGoogleLogin] = useState(false);
    const [form] = Form.useForm();

    const navigate = useNavigate();
    const params = useParams();
    const baseUrl = base_url();

    const [loginFormStatus, { data, isSuccess, isLoading }] = useSetLoginMutation();

    console.log(data);


    // Handle input changes
    const handleChangeLogin = (e) => {
        const { name, value } = e.target;
        setLoginForm(prev => ({ ...prev, [name]: value }));
    };

    // Effect: handle login response
    useEffect(() => {
        if (data?.token) {
            const saveUserData = () => {
                window.localStorage.setItem("token", data?.token);
                window.localStorage.setItem("user_id", data?._id);
                window.localStorage.setItem("isLogin", true);
                window.localStorage.setItem("email", data?.email);
                window.localStorage.setItem("mobile", data?.mobile);
                window.localStorage.setItem("profilePic", data?.image?.url || "");
                window.localStorage.setItem(
                    "userName",
                    `${data?.firstname || ""} ${data?.lastname || ""}`
                );
            };

            saveUserData();
            // navigate(params?.login ? "/cart" : "/");
            // window.location.reload();
            // navigate("/checkout");
            onClose(false);
            // BuyNowItem()
        }
    }, [data, isSuccess, params, navigate]);

    // Send OTP API
    const loginOTP = async () => {
        try {
            const res = await axios.post(`${baseUrl}user/login-otp`, {
                mobile: loginForm.countryCode + loginForm.mobileNumber
            });
            console.log(res);

            if (!res.data.error) {
                message.success("OTP sent successfully!");
                setIsOtpStep(true);
            } else {
                message.error(res.data.message, "kjkjk");
                // setIsOtpStep(true);
            }
        } catch (error) {
            message.error(error?.response?.data?.message, "lkjkl" || "Something went wrong");
        }
    };

    // Resend OTP
    const resendLoginOTP = async () => {
        try {
            const res = await axios.post(`${baseUrl}user/login-otp-resend`, {
                mobile: loginForm.countryCode + loginForm.mobileNumber
            });
            if (!res.data.error) {
                message.success("OTP resent successfully!");
            } else {
                message.error(res.data.message);
            }
        } catch (error) {
            message.error(error?.response?.data?.message || "Something went wrong");
        }
    };

    // Verify OTP
    const handleLoginVerify = async () => {
        if (!otp) {
            message.warning("Enter OTP first");
            return;
        }
        loginFormStatus({
            mobile: loginForm.countryCode + loginForm.mobileNumber,
            otp
        });
    };

    // Google login handler
    useEffect(() => {
        if (gmailData) sendValueGoogle(gmailData);
    }, [gmailData]);

    const sendValueGoogle = async (val) => {
        setIsGoogleLogin(true);
        try {
            const res = await axios.post(`${baseUrl}socialMedia/google`, {
                access_token: val?.data?.access_token
            });
            window.localStorage.setItem("token", res.data.token);
            window.localStorage.setItem("user_id", res.data._id);
            window.localStorage.setItem("isLogin", true);
            window.localStorage.setItem("email", res.data.email);
            window.localStorage.setItem(
                "userName",
                `${res?.data.firstname} ${res?.data.lastname}`
            );
            navigate("/");
        } catch (error) {
            message.error("Google login failed");
        }
        setIsGoogleLogin(false);
    };

    return (
        <Modal
            title={isOtpStep ? "Enter OTP" : "Login to your account"}
            centered
            open={isOpen}
            footer={null}
            onCancel={() => {
                onClose();
                setIsOtpStep(false);
                setOtp("");
                form.resetFields();
            }}
            className="otp-modal abc"
        >
            {isOtpStep ? (
                <Form layout="vertical">
                    <Form.Item label="Enter OTP">
                        <div className="otp-input-container">
                            {[0, 1, 2, 3].map((index) => (
                                <input
                                    key={index}
                                    type="text"
                                    maxLength={1}
                                    className="otp-box"
                                    value={otp[index] || ""}
                                    onChange={(e) => {
                                        const value = e.target.value.replace(/[^0-9]/g, ""); // Only numbers
                                        if (!value && otp[index]) {
                                            // Handle backspace
                                            const newOtp = otp.split("");
                                            newOtp[index] = "";
                                            setOtp(newOtp.join(""));
                                        } else if (value) {
                                            const newOtp = otp.split("");
                                            newOtp[index] = value;
                                            setOtp(newOtp.join(""));
                                            const nextInput = document.getElementById(`otp-${index + 1}`);
                                            if (nextInput) nextInput.focus();
                                        }
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.key === "Backspace" && !otp[index] && index > 0) {
                                            const prevInput = document.getElementById(`otp-${index - 1}`);
                                            if (prevInput) prevInput.focus();
                                        }
                                    }}
                                    id={`otp-${index}`}
                                />
                            ))}
                        </div>
                    </Form.Item>

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginBottom: 10,
                        }}
                    >
                        <Button type="link" onClick={resendLoginOTP}>
                            Resend OTP
                        </Button>
                    </div>

                    <Button
                        type="primary"
                        block
                        onClick={handleLoginVerify}
                        className="pink-btn"
                        disabled={otp.length !== 4}
                    >
                        Verify & Login
                    </Button>
                </Form>
            ) : (
                <Form layout="vertical" onFinish={loginOTP} form={form}>
                    <Form.Item
                        label="Mobile Number"
                        name="mobileNumber"
                        rules={[{ required: true, message: "Please enter mobile number!" }]}
                    >
                        <Input
                            addonBefore={loginForm.countryCode}
                            placeholder="Enter mobile number"
                            maxLength={10}
                            name="mobileNumber"
                            value={loginForm.mobileNumber}
                            onChange={handleChangeLogin}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            block
                            htmlType="submit"
                            className="pink-btn"
                            disabled={loginForm.mobileNumber.length !== 10}
                        >
                            Send OTP
                        </Button>
                    </Form.Item>
                </Form>
            )}
        </Modal>
    );
}

export default LoginAllPage