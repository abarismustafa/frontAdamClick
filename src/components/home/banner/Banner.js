import React, { useEffect, useState } from "react";
import Slider from "react-slick";

import suitBanner1 from "../../../assets/img/banner/cc0mbccgavf8aft8ct55.png";
import suitBanner2 from "../../../assets/img/banner/bofengg.png";

import "./Banner.css";
import { Link } from "react-router-dom";
import { useGetBannerQuery } from "./bannerSlice";
import axios from "axios";
import { bannerDB } from "../../../rki-data/banner";
import { isMobile } from "react-device-detect";
import { base_url } from "../../../server";
import { useTranslation } from "react-i18next";

const bannerData = bannerDB;
function Banner() {
  const { t } = useTranslation();
  const [data, setData] = useState();
  const baseUrl = base_url();

  var settings = {
    dots: false,
    infinite: true,
    arrows: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const getData = async () => {
    try {
      const res = await axios.get(`${baseUrl}banner/public`, {
        withCredentials: true,
      });
      setData(res.data);
    } catch (error) {
      console.log("Server Error BannerList");
    }
  };
  useEffect(() => {
    getData();
  }, []);

  // Custom Data
  const custom = [
    { id: 1, url: suitBanner1 },
    { id: 2, url: suitBanner2 },
  ];

  return (
    <>
      <section className="bannerSection">
        <div className="">
          <Slider {...settings}>
            {data?.length > 0
              ? data.map((item) => {
                  return (
                    item?.image?.url && (
                      <Link to={item?.url || ""} key={item._id}>
                        <div
                          className="bannerItemFigure"
                          style={{
                            backgroundImage: `url(${item?.image.url})`,
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat",
                          }}
                        >
                          <div className="container">
                            <div className="bannerContent">
                              <h2>{item?.SliderTopHeading}</h2>
                              <p>{t("bannerPara")}</p>
                              <Link
                                className="commonButton bg-white"
                                to={`/${item?.url}`}
                              >
                                {t("See All Collection")}
                              </Link>
                            </div>
                          </div>
                        </div>
                      </Link>
                    )
                  );
                })
              : custom.map((item) => {
                  return (
                    item?.url && (
                      <Link to={item?.url || ""} key={item.id}>
                        <div
                          className="bannerItemFigure"
                          style={{
                            backgroundImage: `url(${item?.url})`,
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat",
                          }}
                        >
                          <div className="container">
                            <div className="bannerContent">
                              <h2>
                                <span>High Cosmetics</span> Product For You{" "}
                              </h2>
                              <p>
                                Borem ipsum dolor sit amet, vim id assentior
                                moderatius nelig
                              </p>
                              <Link
                                className="commonButton bg-white"
                                to={"/products"}
                              >
                                See All Collection
                              </Link>
                            </div>
                          </div>
                        </div>
                      </Link>
                    )
                  );
                })}
          </Slider>
        </div>
      </section>
    </>
  );
}

export default Banner;
