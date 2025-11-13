import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useTranslation } from "react-i18next";
import axios from "axios";
import { base_url } from "../../../server";
const articles = [
  {
    title: "blogText",
    date: "March 24, 2025",
    comments: 0,
    category: "Cosmetics",
    img_url: "",
  },
  {
    title: "blogText",
    date: "March 24, 2025",
    comments: 2,
    category: "Body Lotion",
    img_url: "",
  },
  {
    title: "blogText",
    date: "March 24, 2025",
    comments: 0,
    category: "Cosmetics",
    img_url: "",
  },
  {
    title: "blogText",
    date: "April 01, 2025",
    comments: 0,
    category: "Cosmetics",
    img_url: "",
  },
  {
    title: "blogText",
    date: "June 12, 2025",
    comments: 2,
    category: "Body Lotion",
    img_url: "",
  },
  {
    title: "blogText",
    date: "December 15, 2025",
    comments: 0,
    category: "Cosmetics",
    img_url: "",
  },
];

const DiscoverKeras = () => {
  const { t } = useTranslation();
  const baseUrl = base_url();
  const [blogData, setBlogData] = useState(null);
  const getBlogData = async () => {
    try {
      const res = await axios.get(`${baseUrl}blogs`);
      // console.log(res?.data);
      setBlogData(res?.data);
    } catch (error) { }
  };

  useEffect(() => {
    getBlogData();
  }, []);
  return (
    <>
      <section className="discoverKerasSec">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="fisherman-content d-flex justify-content-between align-items-center">
                {/* <h6>{t("Post From Blogs")}</h6> */}
                <h3>{t("Our Latest News Update")}</h3>
                <Link to="/blog" className="btn btn-primary">
                  View All
                </Link>
              </div>
            </div>
            {/* {articles.map((item, i) => {
              return (
                <div className="col-lg-4 col-md-4 col-sm-4 col-4" key={i}>
                  <div className="discoverCard">
                    <div className="figure">
                      <img
                        src={item.img_url}
                        alt={item.title}
                        className="img-fluid"
                        title={item.title}
                      />
                    </div>
                    <div className="text">
                      <span>{t(`${item.category}`)}</span>
                      <h5>{t(`${item.title}`)}</h5>
                      <p>{t(`${item.date}`)}</p>
                    </div>
                  </div>
                </div>
              );
            })} */}

            {Array.isArray(blogData) &&
              blogData?.map((item) => {
                return (
                  <div
                    className="col-lg-4 col-md-4 col-sm-4 col-xs-4"
                    key={item?._id}
                  >
                    <div className="discoverCard">
                      <div className="figure gg">
                        <img
                          src={item?.banner?.url}
                          alt={item.title}
                          className="img-fluid"
                          title={item.title}
                        />
                      </div>
                      <div className="text">
                        <Link to={`/blog-detail/${item.uid}`}>
                          <span>{t(`${item.title}`)}</span>
                        </Link>

                        <h5
                          dangerouslySetInnerHTML={{ __html: item.description }}
                        ></h5>
                        <p>
                          {new Date(item.updatedAt).toLocaleString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </section>
    </>
  );
};

export default DiscoverKeras;
