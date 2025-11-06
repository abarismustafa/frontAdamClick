import React from "react";
import {BsArrowRight} from "react-icons/bs";

function SellerBanner() {
  return (
    <section className="sellerBannerSec">
      <div className="container">
        <div className="sellerBannerContent">
          <h4>Launch your business in 10 minutes</h4>
          <form>
            <div className="mb-3">
              <input
                type="number"
                placeholder="Enter 10 digit phone number here"
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <button className="btn btn-primary sellerBtn">Start Selling <BsArrowRight /> </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default SellerBanner;
