import React from "react";
import mainBanner from "../../../../assets/img/home-one/main-banner.png";
import shape from "../../../../assets/img/home-one/shape.png";

function BannerImage() {
  return (
    <>
      <div className="banner-image">
        <img src={mainBanner} alt="image" />

        <div className="shape-area">
          <div className="creative-shape">
            <img src={shape} alt="main-image" />
          </div>

          <div className="creative-shape-two">
            <img src={shape} alt="main-image" />
          </div>
        </div>
      </div>
    </>
  );
}

export default BannerImage;
