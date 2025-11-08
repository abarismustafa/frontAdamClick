import React from "react";
import { Spinner } from "react-bootstrap";

const Loader = () => {
    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                background: "rgba(255, 255, 255, 0.6)", // halki transparency
                backdropFilter: "blur(2px)", // halka blur effect
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 9999,
            }}
        >
            <Spinner animation="border" variant="primary" role="status" style={{ width: 60, height: 60 }} />
        </div>
    );
};

export default Loader;