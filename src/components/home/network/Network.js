import React from "react";
import { useTranslation } from "react-i18next";
function Network() {
  const { t, i18n } = useTranslation()
  return (
    <>
      <section className="networkSec">
        <div className="container">
          <div className="networkItem">
            <div className="fisherman-content mb-4">
              <span>{t('Our Network')}</span>
              <h3>{t('PICKUP POINT NETWORK')} </h3>
            </div>
            <ul className="namedd">
              <li>
                <div className="networkNumber">
                  <h2>1 Million +</h2>
                  <p>{t('Customers')}</p>
                </div>
              </li>
              <li>
              <div className="networkNumber">
                  <h2>50 Thousands +</h2>
                  <p>{t('Products')}</p>
                </div>
              </li>
              <li>
              <div className="networkNumber">
                  <h2>1 Thousand +</h2>
                  <p>
                  {t('Delivery Depot')}
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}

export default Network;
