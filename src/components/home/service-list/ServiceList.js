import React from "react";
import service1 from "../../../assets/img/rki/network/engineering.png";
import service2 from "../../../assets/img/rki/network/feeding-bottle.png";
import service3 from "../../../assets/img/rki/network/bib.png";
import service4 from "../../../assets/img/rki/network/baby.png";
import service5 from "../../../assets/img/rki/network/clean-dishes.png";
import service6 from "../../../assets/img/rki/network/cutlery.png";
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
                <img src={service1} className="img-fluid" alt="Service" />
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
                <img src={service2} className="img-fluid" alt="Service" />
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
                <img src={service3} className="img-fluid" alt="Service" />
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
                <img src={service4} className="img-fluid" alt="Service" />
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
                <img src={service5} className="img-fluid" alt="Service" />
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
                <img src={service6} className="img-fluid" alt="Service" />
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
