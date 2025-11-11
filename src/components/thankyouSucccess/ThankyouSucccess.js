import React, { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useLocation, useNavigate } from "react-router-dom";

const ThankyouSuccess = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const placedData = location.state?.placedData;

    const allOrder = () => {
        navigate("/myAccount");
    };

    const [particles, setParticles] = useState([]);

    // useEffect(() => {
    //     // Create 12 animated particles
    //     const arr = Array.from({ length: 12 });
    //     setParticles(arr);
    // }, []);

    useEffect(() => {
        // Generate random particle properties
        const arr = Array.from({ length: 25 }).map((_, i) => ({
            id: i,
            size: Math.random() * 10 + 4,
            distance: Math.random() * 80 + 40,
            angle: Math.random() * 360,
            delay: Math.random() * 0.5,
            color: `hsl(${Math.random() * 50 + 30}, 90%, 55%)`,
        }));
        setParticles(arr);
    }, []);

    return (
        <div
            className="d-flex flex-column align-items-center justify-content-center "
            style={{ backgroundColor: "#f8f9fa", padding: "20px" }}
        >
            {/* Animated Success Icon */}
            <div className="position-relative mb-4" style={{ width: "120px", height: "120px" }}>
                {/* Particles */}
                {/* {particles.map((_, i) => (
                    <span
                        key={i}
                        className="particle"
                        style={{
                            "--i": i,
                            backgroundColor: "rgb(66 169 16)",
                        }}
                    ></span>
                ))} */}

                {particles.map((p) => (
                    <span
                        key={p.id}
                        className="particle"
                        style={{
                            "--size": `${p.size}px`,
                            "--distance": `${p.distance}px`,
                            "--angle": `${p.angle}deg`,
                            "--delay": `${p.delay}s`,
                            backgroundColor: p.color,
                        }}
                    ></span>
                ))}

                {/* Main Check Icon */}
                <div
                    className="d-flex align-items-center justify-content-center position-absolute top-50 start-50 translate-middle"
                    style={{
                        // background: "linear-gradient(145deg, #ffb300, #ff8c00)",
                        background: "linear-gradient(145deg, rgb(32 255 0), rgb(47 135 15))",
                        width: "90px",
                        height: "90px",
                        borderRadius: "50%",
                        color: "#fff",
                        boxShadow: "0 4px 15px rgba(255, 165, 0, 0.5)",
                    }}
                >
                    <FaCheckCircle size={45} />
                </div>
            </div>

            {/* Title */}
            <h2 className="fw-bold text-dark text-center mb-2">
                Thank you for your purchase
            </h2>

            {/* Order Summary */}
            <div
                className="card border-0 p-3 p-md-4 mb-4 mt-4"
                style={{
                    maxWidth: "480px",
                    width: "100%",
                    borderRadius: "14px",
                    backgroundColor: "#ffffff",
                }}
            >
                <h5 className="fw-bold mb-3 text-start">Order Summary</h5>
                {placedData?.orderList?.map((item) => (
                    <div
                        key={item?._id}
                        className="d-flex align-items-center justify-content-between py-2 border-bottom"
                    >
                        <div className="d-flex align-items-center">
                            <h6 className="fw-bold mb-0 me-2 text-dark">Order No:</h6>
                            <p className="mb-0 fw-semibold text-dark">
                                {item?.order_referenceNo}
                            </p>
                        </div>
                        <Link
                            to={`/order-detail/${item._id}`}
                            className="text-decoration-none fw-semibold"
                            style={{ color: "#f4b400" }}
                        >
                            Order Details
                        </Link>
                    </div>
                ))}
            </div>

            {/* Buttons */}
            <div className="d-flex flex-wrap justify-content-center gap-3">
                <button
                    className="btn btn-dark px-4 py-2 rounded-pill shadow-sm"
                    onClick={() => (window.location.href = "/")}
                >
                    Back to Home
                </button>
                <button
                    className="btn btn-warning px-4 py-2 rounded-pill shadow-sm fw-semibold"
                    onClick={allOrder}
                >
                    All Orders
                </button>
            </div>

            {/* Animation CSS */}
            {/* <style>
                {`
        .particle {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          transform-origin: center;
          animation: explode 1.2s ease-out infinite;
          opacity: 0;
          animation-delay: calc(var(--i) * 0.1s);
        }

        @keyframes explode {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
          }
          70% {
            transform: translate(
              calc(-50% + (60px * cos(var(--i) * 30deg))),
              calc(-50% + (60px * sin(var(--i) * 30deg)))
            );
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0;
          }
        }
        `}
            </style> */}

            <style>
                {`
        .particle {
          position: absolute;
          top: 50%;
          left: 50%;
          width: var(--size);
          height: var(--size);
          border-radius: 50%;
          opacity: 0;
          transform: translate(-50%, -50%);
          animation: burst 1.4s ease-out infinite;
          animation-delay: var(--delay);
        }

        @keyframes burst {
          0% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
          60% {
            opacity: 1;
            transform: translate(
              calc(-50% + var(--distance) * cos(var(--angle))),
              calc(-50% + var(--distance) * sin(var(--angle)))
            ) scale(0.9);
          }
          100% {
            opacity: 0;
            transform: translate(
              calc(-50% + var(--distance) * cos(var(--angle))),
              calc(-50% + var(--distance) * sin(var(--angle)))
            ) scale(0);
          }
        }
        `}
            </style>
        </div>
    );
};

export default ThankyouSuccess;
