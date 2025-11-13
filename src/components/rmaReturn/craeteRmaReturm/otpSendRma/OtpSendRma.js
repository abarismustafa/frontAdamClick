import React, { useState, useRef } from "react";
import { Button, Modal, Form } from "react-bootstrap";

const OtpSendRma = (props) => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputsRef = useRef([]);

  // Handle input change
  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return; // only digits allowed
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input automatically
    if (value && index < 3) {
      inputsRef.current[index + 1].focus();
    }

    // Pass OTP to parent
    props.onOtpChange && props.onOtpChange(newOtp.join(""));
  };

  // Handle backspace navigation
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  // Check if OTP is complete
  const isOtpComplete = otp.join("").length === 4;

  return (
    <Modal
      {...props}
      size="sm"
      centered
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Header closeButton>
        <Modal.Title
          id="contained-modal-title-vcenter"
          className="fs-5 fw-semibold"
        >
          Enter OTP
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="text-center">
        <p className="text-muted mb-3">
          Please enter the 4-digit OTP sent to your login number
        </p>
        <div className="d-flex justify-content-center gap-2">
          {otp.map((digit, index) => (
            <Form.Control
              key={index}
              type="text"
              maxLength={1}
              value={digit}
              ref={(el) => (inputsRef.current[index] = el)}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="text-center fw-bold fs-4"
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "10px",
                border: "1px solid #ced4da",
              }}
            />
          ))}
        </div>
      </Modal.Body>

      <Modal.Footer className="justify-content-center">
        <Button
          variant={isOtpComplete ? "dark" : "secondary"}
          disabled={!isOtpComplete}
          className="px-4 py-2 rounded-pill shadow-sm"
          onClick={() => props.submitData?.(otp.join(""))}
        >
          Verify OTP
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default OtpSendRma;
