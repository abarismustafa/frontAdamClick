import React from "react";
import { useGetPrivacyPolicyQuery } from "../products/productSlice";
import { useTranslation } from "react-i18next";

function PrivacyPolicy() {
  const { data, isLoading } = useGetPrivacyPolicyQuery();
  
    const { t, i18n } = useTranslation();
  
  return (
    <>
      <section className="privacySec sectionPD">
        <div className="container">
          <div className="privacyInfo">
            <div className="privacyTitle mb-3">
              {isLoading && (
                <div className="preloaderCount">
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              )}
              <h1>{t("privacyTitle")}</h1>
              <p>
                {t("privacyIntro")}
              </p>
              <p>
                 {t("deviceInfoTitle")}
                </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default PrivacyPolicy;
