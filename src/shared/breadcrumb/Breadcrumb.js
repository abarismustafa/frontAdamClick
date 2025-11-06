import React from "react";
import { Link } from "react-router-dom";
import "./Breadcrumb.css";

function Breadcrumb({ title, t, show }) {
  return (
    <>
      {/* Start Page Title Area */}
      <nav aria-label="breadcrumb" className="breadcrumbSec">
        <div className="container">
          <ol className="breadcrumb ">
            <li className="breadcrumb-item">
              <Link to="/"> {t('Home')}</Link>
            </li>
            {show ? <li className="breadcrumb-item active" aria-current="page">
              {title}
            </li> : <li className="breadcrumb-item active" aria-current="page">
              {t(title)}
            </li>}
          </ol>
        </div>
      </nav>
      {/* End Page Title Area */}
    </>
  );
}

export default Breadcrumb;
