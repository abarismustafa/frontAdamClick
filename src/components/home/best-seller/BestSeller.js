import React from "react";
import { Link, useNavigate } from "react-router-dom";
import babyBoy from "../../../assets/img/rki/star-img/baby-boy.png";
import babyGirl from "../../../assets/img/rki/star-img/baby-girl.png";
import circle from "../../../assets/img/rki/star-img/circle.png";
import { useTranslation } from "react-i18next";

function BestSeller() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const changeRoute = (route) => {
    if (route == "1") {
      navigate("/product/category/31/Baby-bottles");
    }
    if (route == "2") {
      navigate("/product/category/39/Dishes-and-Foods");
    }
    if (route == "3") {
      navigate("/product/category/32/Bibs-and-Pacifiers");
    }
    if (route == "4") {
      navigate("/product/50/1pc%20Baby%20Bottle%20Drying%20Rack%20With%20Tray,%20High%20Capacity%20Bottle%20Dryer%20Holder%20For%20Baby%20Bottle");
    }
  };
  return (
    <>
      <section className="bestSeller sectionPD">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="fisherman-content">
                <h3>{t("OUR TOP BEST SELLER")}</h3>
                <p></p>
              </div>
            </div>
            <div className="col-lg-6" onClick={() => changeRoute("4")}>
              <div className="sellerProduct">
                <div className="sellerProductCard" height={440}>
                  <img
                    //  height={100}
                    style={{ height: "500px", width: "100%" }}
                    src="/product.jpeg"
                    alt="Product"
                    className="mainimgbuy"
                  />
                  <div className="sellerProductText d-none">
                    <h2>our top best seller</h2>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6" onClick={() => changeRoute("1")}>
              <div className="asideSeller row">
                <div className="col-lg-6">
                  <div className="asideSellerCard">
                    <div className="sellerProductCard">
                      <img src={babyBoy} alt="Product" className="img-fluid" />
                      <div className="sellerProductContent ">
                        <h2>Feedings</h2>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6" onClick={() => changeRoute("2")}>
                  <div className="asideSellerCard">
                    <div className="sellerProductCard">
                      <img src={babyGirl} alt="Product" className="img-fluid" />
                      <div className="sellerProductContent ">
                        <h2 className="text-white">Fun Time</h2>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12" onClick={() => changeRoute("3")}>
                  <div className="asideSellerCard">
                    <div className="sellerProductCard ">
                      <img src={circle} alt="Product" className="img-fluid" />
                      <div className="sellerProductContent full ">
                        <h2>
                          Bibs <span> & Pacifiers</span>
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default BestSeller;
