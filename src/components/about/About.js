import React, { useEffect, useState } from "react";
import AboutBanner from "./about-banner/AboutBanner";
import Breadcrumb from "../../shared/breadcrumb/Breadcrumb";
import AboutStory from "./about-story/AboutStory";
import AboutChoose from "./about-choose/AboutChoose";
import AboutCounters from "./about-counters/AboutCounters";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { base_url } from "../../server";
function createMarkup(data) {
  return { __html: data };
}
function About() {
  const [data, setData] = useState();
  const baseUrl = base_url();
  const aboutData = async () => {
    try {
      const res = await axios.get(`${baseUrl}adminWeb_footer/get`);
      setData(res.data);
    } catch (error) {
      console.log("server-error");
    }
  };
  useEffect(() => {
    aboutData();
  }, []);
  const { t, i18n } = useTranslation();
  return (
    <>
      <Breadcrumb title="About Us" t={t} />
      <main className="main about d-none">
        {/* <AboutBanner /> */}
        <AboutStory data={data} t={t} />
        <AboutChoose t={t} />
        <AboutCounters t={t} />
      </main>

      <div className="tab products-details-tab">
        <div className="row">
          <div className="col-lg-3 col-md-12">
            <ul className="tabs" id="myTab" role="tablist">
              <li className="nav-item" role="presentation">
                <a
                  className="nav-link active"
                  id="description-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#description"
                  type="button"
                  role="tab"
                  aria-controls="description"
                  aria-selected="true"
                >
                  <div className="dot"></div>
                  {t("Description")}
                </a>
              </li>
              <li className="nav-item" role="presentation">
                <a
                  className="nav-link"
                  id="benefits-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#benefits"
                  type="button"
                  role="tab"
                  aria-controls="benefits"
                  aria-selected="false"
                >
                  <div className="dot"></div>
                  {t("benefits")}
                </a>
              </li>

              <li className="nav-item" role="presentation">
                <a
                  className="nav-link"
                  id="useWay-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#useWay"
                  type="button"
                  role="tab"
                  aria-controls="useWay"
                  aria-selected="false"
                >
                  <div className="dot"></div>
                  {t("howToUse")}
                </a>
              </li>

              <li className="nav-item" role="presentation">
                <a
                  className="nav-link"
                  id="ingredients-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#ingredients"
                  type="button"
                  role="tab"
                  aria-controls="ingredients"
                  aria-selected="false"
                >
                  <div className="dot"></div>
                  {t("ingredients")}
                </a>
              </li>

              <li className="nav-item" role="presentation">
                <a
                  className="nav-link"
                  id="science-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#science"
                  type="button"
                  role="tab"
                  aria-controls="science"
                  aria-selected="false"
                >
                  <div className="dot"></div>
                  {t("science")}
                </a>
              </li>
              <li className="nav-item" role="presentation">
                <a
                  className="nav-link"
                  id="fragrance-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#fragrance"
                  type="button"
                  role="tab"
                  aria-controls="fragrance"
                  aria-selected="false"
                >
                  <div className="dot"></div>
                  {t("fragrance")}
                </a>
              </li>
            </ul>
          </div>
          <div className="col-lg-9 col-md-12">
            <div className="tab-content" id="myTabContent">
              <div
                className="tab_content tab-pane fade show active"
                id="description"
                role="tabpanel"
                aria-labelledby="description-tab"
              >
                <div className="tabs_item">
                  <div className="productTabDetail row">
                    <div className="col-md-12">
                      <div className="tabContent">
                        <h2>Product Description</h2>
                        <div
                          className="products-details-tab-content"
                          dangerouslySetInnerHTML={createMarkup(
                            data?.productDescription
                          )}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="tab_content tab-pane fade"
                id="benefits"
                role="tabpanel"
                aria-labelledby="benefits-tab"
              >
                <div className="tabs_item">
                  <div className="products-details-tab-content">
                    <div className="productTabDetail row ">
                      <div className="col-md-12">
                        <div className="tabContent">
                          <h2>Product Benefits</h2>
                          <ul className=" d-none">
                            <li>✔ Restores hair’s softness</li>
                            <li>✔ Protects from pillow friction</li>
                            <li>
                              ✔ Delivers radiance and shine without a greasy
                              finish
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="tab_content tab-pane fade"
                id="useWay"
                role="tabpanel"
                aria-labelledby="useWay-tab"
              >
                <div className="tabs_item">
                  <div className="products-details-tab-content">
                    <div className="productTabDetail row">
                      <div className="col-md-12">
                        <div className="tabContent">
                          <h2>How to Use </h2>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="tab_content tab-pane fade"
                id="ingredients"
                role="tabpanel"
                aria-labelledby="ingredients-tab"
              >
                <div className="tabs_item">
                  <div className="products-details-tab-content">
                    <div className="productTabDetail row">
                      <div className="col-md-12">
                        <div className="tabContent">
                          <h2>Key Ingredients </h2>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="tab_content tab-pane fade"
                id="science"
                role="tabpanel"
                aria-labelledby="science-tab"
              >
                <div className="tabs_item ">
                  <div className="products-details-tab-content">
                    <div className="productTabDetail row  ">
                      <div className="tabContent">
                        <h2>Science</h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="tab_content tab-pane fade"
                id="fragrance"
                role="tabpanel"
                aria-labelledby="fragrance-tab"
              >
                <div className="tabs_item">
                  <div className="products-details-tab-content">
                    <div className="productTabDetail row ">
                      <div className="tabContent">
                        <h2>Fragrance</h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
