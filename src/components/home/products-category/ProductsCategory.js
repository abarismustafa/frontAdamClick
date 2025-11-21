import React, { useEffect, useState } from "react";
import {
  useGetCategoriesQuery,
  useGetMenuListQuery,
} from "../../products/productSlice";

import "./ProductsCategory.css";
import axios from "axios";
import Slider from "react-slick";



import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { base_url } from "../../../server";

// const categoriesItems = [
//   { id: "1", imgUrls: service1, title: "GEAR & TARVEL" },
//   { id: "2", imgUrls: service2, title: "BOTTLE FEEDING" },
//   { id: "3", imgUrls: service3, title: " BIBS & PACIFIERS" },
//   { id: "4", imgUrls: service4, title: "BATH TIMES" },
//   { id: "5", imgUrls: service5, title: "CLEAN - DISHES" },
//   { id: "6", imgUrls: service6, title: "DISHES & FOOD" },
// ];
function ProductsCategory() {
  // const { isLoading, error } = useGetCategoriesQuery();

  const [categoriesDatas, setCateData] = useState(null);
  const baseUrl = base_url();
  const getcateData = async () => {
    try {
      const res = await axios.get(`${baseUrl}category/public`, {
        withCredentials: true,
      });
      setCateData(res.data);
    } catch (error) { }
  };
  useEffect(() => {
    getcateData();
  }, []);

  const settings = {
    speed: 500,
    slidesToShow: 7, // Number of items to show on desktop
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1120, // Screen size for tablets
        settings: {
          slidesToShow: 5, // Number of items to show on tablets
          slidesToScroll: 1,
          arrows: false,
        },
      },
      {
        breakpoint: 1024, // Screen size for tablets
        settings: {
          slidesToShow: 4, // Number of items to show on tablets
          slidesToScroll: 1,
          arrows: false,
        },
      },
      {
        breakpoint: 768, // Screen size for mobile devices

        settings: {
          slidesToShow: 4, // Number of items to show on mobile
          slidesToScroll: 1,
          arrows: true,
        },
      },
      {
        breakpoint: 500, // Screen size for mobile devices
        settings: {
          slidesToShow: 4, // Number of items to show on mobile
          slidesToScroll: 1,
          arrows: true,
        },
      },
    ],
  };
  // Custom category Data
  const custom = [
    {
      id: 1,
      url: "",
      name: "Beauty Glow",
    },
    {
      id: 2,
      url: "",
      name: "Body Lotion",
    },
    {
      id: 3,
      url: "",
      name: "Cosmetics",
    },
    {
      id: 4,
      url: "",
      name: "Face Wash",
    },
    {
      id: 5,
      url: "",
      name: "Hair Style",
    },
    {
      id: 6,
      url: "",
      name: "Makeup",
    },
    {
      id: 7,
      url: "",
      name: "Skin Care",
    },
    {
      id: 8,
      url: "",
      name: "Mascara",
    },
  ];
  const { t, i18n } = useTranslation();
  return (
    <>
      <section className="serviceList sectionPD pt-1">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <div className="fisherman-content">
                {/* <h6>{t("Top Search Categories")}</h6> */}
                <h3 className="mobileTitle">{t("Shop by Categories")} </h3>
              </div>
            </div>

            <div className="row">
              {/* {isLoading && (
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              )}
              {error && (
                <h4 style={{ textAlign: "center", color: "red" }}>
                  Server Error
                </h4>
              )} */}
            </div>

            <div className="categoryWrapper d-none">
              <div className="categoryWrapper">
                <Slider {...settings}>
                  {custom?.map((item) => {
                    return (
                      <div className="mediaQueryClass" key={item.id}>
                        <Link
                          to={`/product/category/${item.uid}/${item?.slug}`}
                        >
                          <div className="serviceItemIcon">
                            <img
                              src={item?.url}
                              alt="Product"
                              className="img-fluid"
                            />
                          </div>
                          <div className="serviceItemText">
                            <h5>
                              <Link to={`/product/category/${item.uid}/${item?.slug}`}>
                                {item?.name}
                                <i className="ri-arrow-right-up-fill"></i>
                              </Link>
                            </h5>
                          </div>
                        </Link>
                      </div>
                    );
                  })}
                </Slider>
              </div>
            </div>

            <div className="categoryWrapper">
              <Slider {...settings}>
                {categoriesDatas
                  ?.filter((item) => item.parent_id !== null)
                  .reverse()
                  .map((item, i) => (
                    <div className="mediaQueryClass" key={i}>
                      <Link to={`/product/category/${item.uid}/${item?.slug}`}>
                        <div className="serviceItemIcon">
                          <img
                            src={item?.icon?.url}
                            alt="Product"
                            className="img-fluid"
                          />
                        </div>
                        <div className="serviceItemText">
                          <h5>
                            <Link to={`/product/category/${item.uid}/${item?.slug}`}>
                              {item?.name}
                            </Link>
                          </h5>
                        </div>
                      </Link>
                    </div>
                  ))}
              </Slider>
              {/* <Slider {...settings}>
                {categoriesDatas?.reverse().map((item, i) => {
                  return (
                    <div className="mediaQueryClass" key={i}>
                      <Link to={`/product/category/${item.uid}/${item?.slug}`}>
                        <div className="serviceItemIcon">
                          <img
                            src={item?.icon?.url}
                            alt="Product"
                            // style={{ height: "135px" }}
                            className="img-fluid"
                          />
                        </div>
                        <div className="serviceItemText">
                          <h5>
                            <Link to={`/product/category/${item.uid}/${item?.slug}`}>
                              {item?.name}
                            </Link>
                          </h5>
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </Slider> */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ProductsCategory;
