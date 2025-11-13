import React from "react";

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
                    <img alt="Employees Worldwide" src={""} />
                    <h3>7000</h3>
                    <h5>{t('Employees Worldwide')}</h5>
                  </div>
                </div>
                <div className="col-6 col-lg-3 ">
                  <div className="numberCard">
                    <img alt="Total Warehouse" src={""} />
                    <h3>462</h3>
                    <h5>{t('Total Warehouse')}</h5>
                  </div>
                </div>
                <div className="col-6 col-lg-3 ">
                  <div className="numberCard">
                    <img alt="Countries Presence" src={""} />
                    <h3>48</h3>
                    <h5>{t('Countries Presence')}</h5>
                  </div>
                </div>
                <div className="col-6 col-lg-3 ">
                  <div className="numberCard">
                    <img alt="Processing Plants" src={""} />
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
