import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import axios from "axios";
import { bannerTwoDB } from "../../../home-two-data/banner";
import { base_url } from "../../../server";
const bannerData = bannerTwoDB;

function BannerTwo() {
  const [data, setData] = useState();

  var settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };
  const baseUrl = base_url();
  const getData = async () => {
    try {
      const res = await axios.get(`${baseUrl}banner/public`);
      setData(res.data);
    } catch (error) {
      alert("Server Error BannerList");
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <section className="newBanner">
        <Slider {...settings} className="d-none">
          {bannerData &&
            bannerData.map((item) => {
              return (
                <Link to={item?.url} key={item._id}>
                  <div className="bannerItem">
                    <div
                      className="bannerDetail"
                      // style={{ backgroundImage: `url(${item?.image ? item?.image.url : fertilizingPlants})` }}
                      style={{ backgroundImage: `url(${item?.url})` }}
                    >
                      <div className="container d-none">
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="bannerContent">
                              <div className="title">
                                <h6>find the boundaries. push through!</h6>
                                <h3>{item?.SliderTopHeading}</h3>
                                <div className="percentOff">
                                  <h1 style={{ color: "transparent" }}>.</h1>
                                  <div className="priceSection">
                                    {/* <span className="text">starting at</span> */}
                                    <span className="number">
                                      {item?.bottomText}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <div className="shopNow">
                                <Link to="/products">shop now</Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
        </Slider>
      </section>
    </>
  );
}

export default BannerTwo;
