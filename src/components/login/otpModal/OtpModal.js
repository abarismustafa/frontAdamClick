import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const OtpModal = ({ show, handleClose, handleLoginVerify, resendLoginOTP }) => {
  const [otp, setOtp] = useState(Array(4).fill(""));

  // Handle input change
  const handleChange = (element, index) => {
    if (/^[0-9]$/.test(element.value) || element.value === "") {
      const newOtp = [...otp];
      newOtp[index] = element.value;
      setOtp(newOtp);

      // Move to next input if value entered
      if (element.value && element.nextSibling) {
        element.nextSibling.focus();
      }
    }
  };

  // Handle key press for backspace navigation
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = e.target.previousSibling;
      if (prevInput) prevInput.focus();
    }
  };

  // Submit OTP
  const handleSubmit = () => {
    const finalOtp = otp.join("");
    handleLoginVerify(finalOtp);
  };

  

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title style={{ fontWeight: "600" }} className="OTPVerification">
          OTP Login Verification
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        <p>Please Enter 4-digit Code Sent To Your Registered Mobile Number !</p>
        <div className="d-flex justify-content-center gap-2 mb-3">
          {otp.map((data, index) => (
            <Form.Control
              key={index}
              type="text"
              maxLength="1"
              value={data}
              onChange={(e) => handleChange(e.target, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="text-center"
              style={{ width: "67px", height: "40px", fontSize: "20px" }}
            />
          ))}
        </div>
        <Button variant="primary" className="w-100" onClick={handleSubmit}>
          Submit
        </Button>
        <div className="resendOTP">
            <span onClick={()=> resendLoginOTP()}>Resend OTP</span>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default OtpModal;
