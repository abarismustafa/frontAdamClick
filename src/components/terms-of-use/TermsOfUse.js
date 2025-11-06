import React from "react";
import { Helmet } from "react-helmet";
import { useGetTermsConditionQuery } from "../products/productSlice";
import { useTranslation } from "react-i18next";

function TermsOfUse() {
  const { data, isLoading } = useGetTermsConditionQuery();
  const { t, i18n } = useTranslation();
  return (
    <>
      <Helmet>
        <title>Terms & Condition | adamclick</title>
        <meta name="keyword" content="adamclick" />
        <meta name="description" content="adamclick" />
      </Helmet>
      <section className="termsSec sectionPD">
        <div className="container">
          <div className="termsInfo">
            {isLoading && (
              <div className="preloaderCount">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            )}
            <h4>{t("termsTitle")}</h4>
            <p>{t("termsIntro")}</p>
            <div className="panel-body">
              <p>
                <span>{t("terms1Title")}</span>
              </p>
              <p>{t("terms1Content1")}</p>
              <p>{t("terms1Content2")}</p>

              <p>
                 <strong>{t("terms2Title")} </strong>
              </p>
              <p>{t("terms2Content")}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default TermsOfUse;
