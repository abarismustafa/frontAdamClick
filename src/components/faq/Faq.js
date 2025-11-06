import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../../shared/breadcrumb/Breadcrumb";
import { GiFertilizerBag } from "react-icons/gi";
import { Helmet } from "react-helmet";
import { useGetFaqsListQuery } from "../products/productSlice";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { base_url } from "../../server";

function Faq() {
  const [data, setData] = useState(null);
  const baseUrl = base_url();
  const fechData = async () => {
    const res = await axios.get(`${baseUrl}faqs`, { withCredentials: true });
    setData(res.data);
  };
  useEffect(() => {
    fechData();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  const { t, i18n } = useTranslation();
  return (
    <>
      <Helmet>
        <title>FAQ | Adamclick </title>
        <meta name="keyword" content="Adamclick" />
        <meta name="description" content="Adamclick" />
      </Helmet>
      <Breadcrumb title="Frequently Asked Question" t={t} />
      <section className="faqSec sectionPD">
        <div className="container">
          <div className="row">
            {/* {isLoading && <div className="preloaderCount">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>} */}

            <div className="col-lg-12 mb-3">
              <div className="faqInfo">
                <div className="fisherman-content">
                  <h3>{t("Frequently Asked Question")}</h3>
                  {/* <p>{t("Faqs")}</p> */}
                </div>
              </div>
            </div>

            <div className="accordion" id="accordionExample">
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >
                    {t("faqHeading1")}
                  </button>
                </h2>
                <div
                  id="collapseOne"
                  className="accordion-collapse collapse show"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <p>
                     {t("faqDesc1")} 
                    </p>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseTwo"
                    aria-expanded="false"
                    aria-controls="collapseTwo"
                  >
                    {t("faqHeading2")}
                  </button>
                </h2>
                <div
                  id="collapseTwo"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <p>
                      {t("faqDesc2")}
                      
                    </p>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseThree"
                    aria-expanded="false"
                    aria-controls="collapseThree"
                  >
                    {t("faqHeading3")}
                  </button>
                </h2>
                <div
                  id="collapseThree"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <p>
                      {t("faqDesc3")}
                      
                    </p>
                  </div>
                </div>
              </div>

              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseFour"
                    aria-expanded="false"
                    aria-controls="collapseFour"
                  >
                    {t("faqHeading4")}
                  </button>
                </h2>
                <div
                  id="collapseFour"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <p>
                      {t("faqDesc4")}
                      
                    </p>
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

export default Faq;
