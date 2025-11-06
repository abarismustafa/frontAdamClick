import React from "react";

import a1 from "../../../assets/img/h3-hero-banner-min.png";
import { TiTick } from "react-icons/ti";
function AboutStory({ data, t }) {
  return (
    <>
      <section className="sectionPD">
        <div className="container">
          <div className="row">
            <div className="col-lg-7 col-md-12">
              <div className="videoDetail">
                <h2>{t("aboutHeading")}</h2>
                <p>
                  {t("aboutPara")}
                  
                </p>
                <div className="whyUse">
                  <h3>{t("Why Adamclick")}</h3>
                  <ul>
                    <li>{t("Change your hair in 3 minutes")}</li>
                    <li>{t("Add natural volume to your hair")}</li>
                    <li>{t("Create natural looking style")}</li>
                    <li>{t("Feel confident and exoitic")}</li>
                    <li>{t("Choose your style options")}</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-5 col-md-12">
              <div className="videoInfo">
                <img src={a1} alt={"adamclick"} className="img-fluid" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default AboutStory;
