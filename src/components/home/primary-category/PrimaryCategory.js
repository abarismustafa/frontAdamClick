import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// import video1 from "../../../assets/img/video/video1.mp4";
// import video2 from "../../../assets/img/video/video2.mp4";
// import video3 from "../../../assets/img/video/video3.mp4";




import { t } from "i18next";
import { useTranslation } from "react-i18next";
import Slider from "react-slick";
import axios from "axios";
import { base_url } from "../../../server";

const data = {
  categoryProducts: [
    {
      id: 1,
      url: "",
      main_url: "product/115/jimitree-face-serum",
      title: "Drop Stitch Wakeboard",
      price: "499",
    },
    {
      id: 2,
      url: "",
      main_url: "product/114/In-Your-Heart-PDRN-Spicule-Ampoule",
      title: "Moisturizer Summer Skin",
      price: "599",
    },
    {
      id: 3,
      url: "",
      main_url: "product/113/In-Your-Heart-calming-care-cream",
      title: "Dry Skin Moisturizer Lotion",
      price: "299",
    },
    {
      id: 4,
      url: "",
      main_url: "product/112/In-Your-Heart-lifting-Ampoule",
      title: "100% Body Care",
      price: "199",
    },
    {
      id: 5,
      url: "",
      main_url: "product/111/In-Your-Heart-milk-cleanser",
      title: "Women Beauty Glow",
      price: "110",
    },
    {
      id: 6,
      url: "",
      main_url: "product/109/divme-whitening-Ampoule-Pads",
      title: "ISUP Drop Stitch Wakeboard",
      price: "779",
    },
    {
      id: 7,
      url: "",
      main_url: "",
      title: "True Match Nude Hyaluronic",
      price: "433",
    },
    {
      id: 8,
      url: "",
      main_url: "",
      title: "Body Serum For Women",
      price: "229.00",
    },
  ],
  clientTestimonials: [
    {
      id: 1,
      name: "Kristin Watson",
      designation: "Senior Artist",
      message: "instaFeed",
      // img_url: video1,
    },
    {
      id: 2,
      name: "Leslie Alexander",
      designation: "Software Developer",
      message: "instaFeed",
      // img_url: video2,
    },
    {
      id: 3,
      name: "Darrell Steward",
      designation: "Software Developer",
      message: "instaFeed",
      // img_url: video3,
    },
  ],
};
const settings = {
  speed: 500,
  slidesToShow: 3, // Number of items to show on desktop
  slidesToScroll: 1,
  arrows: false,
  autoplay: true,
  autoplaySpeed: 4000,
  responsive: [
    {
      breakpoint: 1120, // Screen size for tablets
      settings: {
        slidesToShow: 3, // Number of items to show on tablets
        slidesToScroll: 1,
        arrows: false,
      },
    },
    {
      breakpoint: 1024, // Screen size for tablets
      settings: {
        slidesToShow: 2, // Number of items to show on tablets
        slidesToScroll: 1,
        arrows: false,
      },
    },
    {
      breakpoint: 768, // Screen size for mobile devices

      settings: {
        slidesToShow: 2, // Number of items to show on mobile
        slidesToScroll: 1,
        arrows: false,
      },
    },
    {
      breakpoint: 500, // Screen size for mobile devices
      settings: {
        slidesToShow: 1, // Number of items to show on mobile
        slidesToScroll: 1,
        arrows: false,
      },
    },
  ],
};
const primarySettings = {
  speed: 500,
  slidesToShow: 2, // Number of items to show on desktop
  slidesToScroll: 1,
  dots: false,
  arrows: false,
  autoplay: true,
  autoplaySpeed: 4000,
  responsive: [
    {
      breakpoint: 1120, // Screen size for tablets
      settings: {
        slidesToShow: 2, // Number of items to show on tablets
        slidesToScroll: 1,
        arrows: false,
      },
    },
    {
      breakpoint: 1024, // Screen size for tablets
      settings: {
        slidesToShow: 2, // Number of items to show on tablets
        slidesToScroll: 1,
        arrows: false,
      },
    },
    {
      breakpoint: 768, // Screen size for mobile devices

      settings: {
        slidesToShow: 1, // Number of items to show on mobile
        slidesToScroll: 1,
        arrows: true,
      },
    },
    {
      breakpoint: 500, // Screen size for mobile devices
      settings: {
        slidesToShow: 1, // Number of items to show on mobile
        slidesToScroll: 1,
        arrows: true,
      },
    },
  ],
};

const PrimaryCategory = ({ pageTitle }) => {
  const baseUrl = base_url();
  const [catData, setCatData] = useState(null);
  console.log(catData);

  const productCatget = async () => {
    try {
      const res = await axios.get(`${baseUrl}category/filter/categ`, {
        withCredentials: true,
      });
      setCatData(res?.data || []);
    } catch (error) { }
  };

  useEffect(() => {
    productCatget();
  }, []);

  const data = {
    instagramPosts: [
      {
        id: 1,
        url: "https://www.instagram.com/reel/DOurozVDS6y/",
      },
      {
        id: 2,
        url: "https://www.instagram.com/p/DJB88cQyMp2/",
      },
      {
        id: 3,
        url: "https://www.instagram.com/p/DI0sfp1y_yZ/",
      },
    ],
  };

  useEffect(() => {
    // पहले अगर script पहले से है तो remove करो ताकि reload पर conflict न हो
    const existingScript = document.querySelector(
      "script[src='https://www.instagram.com/embed.js']"
    );
    if (existingScript) {
      existingScript.remove();
    }

    // फिर नया script add करो
    const script = document.createElement("script");
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;
    document.body.appendChild(script);

    // जब भी post बदलो या reload हो, reprocess embed
    return () => {
      if (window.instgrm) {
        window.instgrm.Embeds.process();
      }
    };
  }, [data]);
  const { t } = useTranslation();

  return (
    <>
      <section>
        <div className="sectionPD">
          <div className="container">
            <div className="row">
              {catData?.map((category) => (
                <React.Fragment key={category._id}>
                  <div className="col-lg-12" key={category._id}>
                    <div className="fisherman-content special text-start">
                      {/* <h6>{t("Primary Category")}</h6> */}
                      <h3>{t(`${category.categoryName}`)}</h3>
                    </div>
                  </div>

                  <div className="col-lg-4 col-md-5 col-sm-6 col-6">
                    <div className="categoryVideo">
                      {category.banner?.url && (
                        <div className="mb-3 h-100">
                          <img
                            src={category.banner.url}
                            alt={category.categoryName}
                            className="img-fluid rounded"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="col-lg-8 col-md-7 col-sm-6 col-6">
                    <div className="wiseProducts">
                      <div className="categoryWrapper ">
                        <div className="desktop row">
                          {category.list?.map((product) =>
                            product.variations?.map((variation) => {
                              const image =
                                variation.mainImage_url?.url ||
                                variation.images?.[0]?.url ||
                                product.mainImage_url?.url;
                              const price =
                                variation.prices?.sale_rate ||
                                variation.prices?.mrp ||
                                product.prices?.sale_rate ||
                                0;
                              return (
                                // <React.Fragment key={item._id}>
                                <div
                                  className="col-lg-4 col-md-4 col-sm-6 col-6"
                                  key={variation._id}
                                >
                                  <div className="featuredInfo bg-white border">
                                    <div className="featuredImg">
                                      <Link
                                        to={`/product/${product?.uid}/${product.slug}/${variation?.variant_slug}`}
                                      >
                                        <img
                                          src={image}
                                          alt={variation.name || product.name}
                                          className="img-fluid"
                                        />
                                      </Link>
                                    </div>
                                    <div className="featuredContent text-center primary">
                                      {/* <Rating /> */}
                                      <h5 className="mb-2">
                                        {t(`${variation.name || product.name}`)}
                                      </h5>
                                      <span>
                                        MRP :{" "}
                                        <span className="text-decoration-line-through">
                                          {" "}
                                          ₹{variation?.prices[0]?.mrp}
                                        </span>
                                      </span>
                                      <p className="mb-0">
                                        Sale Price : ₹
                                        {variation?.prices[0]?.sale_rate}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                // </React.Fragment>
                              );
                            })
                          )}
                        </div>
                        <div className="mobile row">
                          <Slider {...primarySettings}>
                            {category.list?.map((product) =>
                              product.variations?.map((variation) => {
                                const image =
                                  variation.mainImage_url?.url ||
                                  variation.images?.[0]?.url ||
                                  product.mainImage_url?.url;
                                const price =
                                  variation.prices?.sale_rate ||
                                  variation.prices?.mrp ||
                                  product.prices?.sale_rate ||
                                  0;
                                return (
                                  <div className="">
                                    <div className="featuredInfo bg-white border">
                                      <div className="featuredImg">
                                        <Link
                                          to={`/product/${product?.uid}/${product.slug}/${variation?.variant_slug}`}
                                        >
                                          <img
                                            src={image}
                                            alt={variation.name || product.name}
                                            className="img-fluid"
                                          />
                                        </Link>
                                      </div>
                                      <div className="featuredContent text-center primary">
                                        {/* <Rating /> */}
                                        <h5 className="mb-2">
                                          {t(
                                            `${variation.name || product.name}`
                                          )}{" "}
                                        </h5>
                                        <span>
                                          MRP :{" "}
                                          <span className="text-decoration-line-through">
                                            {" "}
                                            ₹{variation?.prices[0]?.mrp}
                                          </span>
                                        </span>
                                        <p className="mb-0">
                                          Sale Price : ₹
                                          {variation?.prices[0]?.sale_rate}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })
                            )}
                          </Slider>
                        </div>
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {catData?.map((category) => {
          return (
            <div
              className="socialCategory bgGray sectionPD"
              key={category?._id}
            >
              <div className="container">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="fisherman-content">
                      {/* <h6>{t("Social Media feedback")}</h6> */}
                      <h3>
                        {category?.categoryName} {t("on instagram")}
                      </h3>
                    </div>
                  </div>
                </div>

                <div className="clientPost">
                  {/* <div className="instagram-embed">
                <blockquote
                  className="instagram-media"
                  data-instgrm-permalink="https://www.instagram.com/p/DJQVK0fo_aQ/?utm_source=ig_embed&amp;utm_campaign=loading"
                  data-instgrm-version="14"
                  style={{
                    background: "#FFF",
                    border: 0,
                    borderRadius: "3px",
                    boxShadow:
                      "0 0 1px 0 rgba(0,0,0,0.5), 0 1px 10px 0 rgba(0,0,0,0.15)",
                    margin: "1px auto",
                    maxWidth: "540px",
                    minWidth: "326px",
                    width: "100%",
                  }}
                ></blockquote>
              </div> */}
                  <Slider {...settings}>
                    {category.insta_links?.map((item) => {
                      return (
                        <div className="tapId" key={item._id}>
                          <div
                            className="customerCard"
                            style={{
                              background: "#fff",
                              borderRadius: "12px",
                              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                              overflow: "hidden",
                              padding: "10px",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              height: "100%",
                              width: "95%",
                            }}
                          >
                            <Link
                              to="#"
                              style={{
                                textDecoration: "none",
                                color: "inherit",
                                width: "100%",
                              }}
                            >
                              <div
                                className="figure"
                                style={{
                                  position: "relative",
                                  width: "100%",
                                  aspectRatio: "1 / 1", // 👈 keeps perfect square ratio
                                  // maxHeight: "500px",
                                  overflow: "hidden",
                                  borderRadius: "10px",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  background: "#fafafa",
                                }}
                              >
                                <blockquote
                                  className="instagram-media"
                                  data-instgrm-permalink={item?.embedded_url}
                                  data-instgrm-version="14"
                                  style={{
                                    background: "#FFF",
                                    border: "0",
                                    borderRadius: "8px",
                                    boxShadow:
                                      "0 0 1px 0 rgba(0,0,0,0.4), 0 1px 10px 0 rgba(0,0,0,0.1)",
                                    margin: "auto",
                                    width: "100%",
                                    maxWidth: "400px",
                                    minWidth: "250px",
                                    height: "100%",
                                  }}
                                ></blockquote>
                              </div>

                              {/* Optional name/title */}
                              {/* <h5 style={{ textAlign: "center", marginTop: "12px", fontSize: "1rem" }}>
        {t(`${item.name}`)}
      </h5> */}
                            </Link>
                          </div>
                        </div>
                        // <div className="tapId" key={item.id}>
                        //   <div className="customerCard" style={{
                        //     background: "#fff",
                        //     borderRadius: "12px",
                        //     boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                        //     overflow: "hidden",
                        //     padding: "15px",
                        //     display: "flex",
                        //     justifyContent: "center",
                        //     alignItems: "center",
                        //     height: "100%",
                        //     width: '95%'
                        //   }}>
                        //     <Link to="#" style={{ textDecoration: "none", color: "inherit", width: "100%" }}>
                        //       <div className="figure" style={{
                        //         position: "relative",
                        //         width: "100%",
                        //         height: "700px",
                        //         overflow: "hidden",
                        //         borderRadius: "10px",
                        //         display: "flex",
                        //         justifyContent: "center",
                        //         alignItems: "center",
                        //         background: "#f9f9f9",
                        //       }}>
                        //         <video width={402} height={180} loop muted autoPlay>
                        //           <source src={item.img_url} type="video/mp4" />
                        //         </video>

                        //         <blockquote
                        //           className="instagram-media"
                        //           data-instgrm-permalink={item.url}
                        //           data-instgrm-version="14"
                        //           style={{
                        //             background: "#FFF",
                        //             border: "0",
                        //             borderRadius: "8px",
                        //             boxShadow:
                        //               "0 0 1px 0 rgba(0,0,0,0.4), 0 1px 10px 0 rgba(0,0,0,0.1)",
                        //             margin: "auto",
                        //             width: "100%",
                        //             maxWidth: "400px",
                        //             minWidth: "280px",
                        //             height: "100%",
                        //           }}
                        //         ></blockquote>

                        //       </div>

                        //     </Link>
                        //   </div>
                        // </div>
                      );
                    })}
                  </Slider>
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
};

export default PrimaryCategory;
