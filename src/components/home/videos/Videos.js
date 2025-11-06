import React from "react";
import imgBrief from "../../../assets/img/h3-hero-banner-min.png";

const Videos = () => {
  return (
    <>
      <section className="videoSec">
        <div className="container ">
          <div className="row">
            <div className="col-lg-7 col-md-12">
              <div className="videoDetail">
                <h2>Premium Cosmetics Tailored for You</h2>
                <p>
                  Getting ready for an occation or a special event. Wearing hair
                  everyday or only on special days. We have all the answers you
                  need.
                </p>
                <div className="whyUse">
                  <h3>Why Adamclick</h3>
                  <ul>
                    <li>Change your hair in 3 minutes</li>
                    <li>Add natural volume to your hair</li>
                    <li>Create natural looking style</li>
                    <li>Feel confident and exoitic</li>
                    <li>Choose your style options</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-5 col-md-12">
              <div className="videoInfo">
                <img src={imgBrief} alt={"adamclick"} className="img-fluid" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Videos;
