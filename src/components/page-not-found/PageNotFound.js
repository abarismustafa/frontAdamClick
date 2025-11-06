import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import notFound from "../../assets/img/404.png";

function PageNotFound({ setShow }) {
  useEffect(() => {
    setShow(false);
  });
  return (
    <>
      <section className="error-area">
        <div className="d-table">
          <div className="d-table-cell">
            <div className="container">
              <div className="error-content">
                <img src={notFound} alt="error" />
                <h3>Page Not Found</h3>
                <p>
                  The page you are looking for might have been removed had its
                  name changed or is temporarily unavailable.
                </p>
                <Link to="/" className="default-btn">
                  Go to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default PageNotFound;
