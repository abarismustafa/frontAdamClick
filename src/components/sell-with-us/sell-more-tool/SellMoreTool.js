import React from "react";
import { FaShuttleVan } from "react-icons/fa";
import { AiFillShopping, AiFillGithub } from "react-icons/ai";
import { BsFillFileEarmarkSpreadsheetFill } from "react-icons/bs";

import ios from "../../../assets/img/ios_badge.svg";
import android from "../../../assets/img/android_badge.svg";
import { Link } from "react-router-dom";

function SellMoreTool() {
  return (
    <>
      <section className="moreToolSec p-30">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="heading">
                <h4 className="text-uppercase mb-2 mb-4">
                  More tools to grow faster
                </h4>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="card">
                <div className="card-body moreToolBody">
                  <FaShuttleVan />
                  <h6 className="mt-2">Fulfillment by ETG </h6>
                  <p>
                    Worried about storing, packing, shipping, and delivering
                    your products? Let ETG do it all for you with FBF, a
                    one stop solution for all your shipping needs.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="card">
                <div className="card-body moreToolBody">
                  <BsFillFileEarmarkSpreadsheetFill />
                  <h6 className="mt-2">ETG Ads</h6>
                  <p>
                    Curious how your products will stand out from your
                    competitors and gain maximum visibility? ETG Ads will
                    help you achieve your online selling business goals.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="card">
                <div className="card-body moreToolBody">
                  <AiFillShopping />
                  <h6 className="mt-2">Shopping Festivals</h6>
                  <p>
                    Get access to India’s biggest shopping festivals, The Big
                    Billion Day, Big Diwali Sale, and more. Participate in these
                    festivals to see your business grow by up to 5X.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="card">
                <div className="card-body moreToolBody">
                  <AiFillGithub />
                  <h6 className="mt-2">ETG Seller Hub App</h6>
                  <p>
                    Manage your online seller account 24x7 with ETG Seller
                    Hub App, compatible with all iOS & Android devices.
                  </p>
                  <Link to="/">
                    <img src={ios} alt="IOS" className="img-fluid" />
                  </Link>
                  <Link to="/">
                    <img src={android} alt="IOS" className="img-fluid" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="base-button text-center pt-4">
                <button className="btn btn-warning" type="button">
                  Start Selling
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default SellMoreTool;
