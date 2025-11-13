import React from "react";

import {
  GiChestnutLeaf,
  GiFruitBowl,
  GiTomato,
  GiFertilizerBag,
} from "react-icons/gi";
import { Link } from "react-router-dom";

import "./ServiceList.css";
function ServiceList() {
  return (
    <>
      <section className="serviceList sectionPD">
        <div className="container">
          <div className="serviceItemInfo">
            <div className="serviceItem">
              <div className="serviceItemIcon">
                <img src={""} className="img-fluid" alt="Service" />
              </div>
              <div className="serviceItemText">
                <h5>
                  <Link to="/products">
                    GEAR & TARVEL <i className="ri-arrow-right-up-fill"></i>
                  </Link>
                </h5>

              </div>
            </div>
            <div className="serviceItem">
              <div className="serviceItemIcon">
                <img src={""} className="img-fluid" alt="Service" />
              </div>
              <div className="serviceItemText">
                <h5>
                  <Link to="/products">
                    BOTTLE FEEDING <i className="ri-arrow-right-up-fill"></i>
                  </Link>
                </h5>
              </div>

            </div>
            <div className="serviceItem">
              <div className="serviceItemIcon">
                <img src={""} className="img-fluid" alt="Service" />
              </div>
              <div className="serviceItemText">
                <h5>
                  <Link to="/products">
                    BIBS & PACIFIERS
                    <i className="ri-arrow-right-up-fill"></i>
                  </Link>
                </h5>
              </div>
            </div>
            <div className="serviceItem">
              <div className="serviceItemIcon">
                <img src={""} className="img-fluid" alt="Service" />
              </div>
              <div className="serviceItemText">
                <h5>
                  <Link to="/products">
                    BATH TIMES
                    <i className="ri-arrow-right-up-fill"></i>
                  </Link>
                </h5>
              </div>
            </div>
            <div className="serviceItem">
              <div className="serviceItemIcon">
                <img src={""} className="img-fluid" alt="Service" />
              </div>
              <div className="serviceItemText">
                <h5>
                  <Link to="/products">
                    CLEAN - DISHES
                    <i className="ri-arrow-right-up-fill"></i>
                  </Link>
                </h5>
              </div>
            </div>
            <div className="serviceItem">
              <div className="serviceItemIcon">
                <img src={""} className="img-fluid" alt="Service" />
              </div>
              <div className="serviceItemText">
                <h5>
                  <Link to="/products">
                    DISHES & FOOD
                    <i className="ri-arrow-right-up-fill"></i>
                  </Link>
                </h5>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ServiceList;
