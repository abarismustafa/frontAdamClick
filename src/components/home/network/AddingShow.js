import React from "react";
import img1 from "../../../assets/img/rki/network/people.png";
import img2 from "../../../assets/img/rki/network/handshake.png";
import img3 from "../../../assets/img/rki/network/human.png";
import img4 from "../../../assets/img/rki/network/factory.png";
import { useTranslation } from "react-i18next";
function AddingShow() {
  const { t, i18n } = useTranslation()
  return (
    <>
      <section className="networkSec p-30">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="row clasMarg">
                <div className="col-6 col-lg-3 ">
                  <div className="numberCard">
                    <img alt="Employees Worldwide" src={img1} />
                    <h3>7000</h3>
                    <h5>{t('Employees Worldwide')}</h5>
                  </div>
                </div>
                <div className="col-6 col-lg-3 ">
                  <div className="numberCard">
                    <img alt="Total Warehouse" src={img2} />
                    <h3>462</h3>
                    <h5>{t('Total Warehouse')}</h5>
                  </div>
                </div>
                <div className="col-6 col-lg-3 ">
                  <div className="numberCard">
                    <img alt="Countries Presence" src={img3} />
                    <h3>48</h3>
                    <h5>{t('Countries Presence')}</h5>
                  </div>
                </div>
                <div className="col-6 col-lg-3 ">
                  <div className="numberCard">
                    <img alt="Processing Plants" src={img4} />
                    <h3>120+</h3>
                    <h5>{t('Processing Plants')}</h5>
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

export default AddingShow;
