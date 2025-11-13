import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { MdOutlineAdminPanelSettings, MdPhoneInTalk } from "react-icons/md";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { useGetBlogsQuery } from "../../products/productSlice";


import axios from "axios";
import { base_url } from "../../../server";

const cosmeticBlogCategories = [
  {
    id: 1,
    name: "Makeup",
    description: "blogDesc1",
  },
  {
    id: 2,
    name: "Skincare",
    description: "blogDesc2",
  },
  {
    id: 3,
    name: "Beauty Tips & Hacks",
    description: "blogDesc3",
  },
  {
    id: 4,
    name: "Product Reviews",
    description: "blogDesc4",
  },
  {
    id: 5,
    name: "Hair Care",
    description: "blogDesc5",
  },
  {
    id: 6,
    name: "Natural & Organic Beauty",
    description: "blogDesc6",
  },
  {
    id: 7,
    name: "Trends & News",
    description: "blogDesc7",
  },
  {
    id: 8,
    name: "DIY Beauty",
    description: "blogDesc8",
  },
  {
    id: 9,
    name: "Travel Beauty",
    description: "blogDesc9",
  },
  {
    id: 10,
    name: "Ingredients & Science",
    description: "blogDesc10",
  },
];

function BlogItem({ t }) {
  const { data, isLoading } = useGetBlogsQuery();
  // console.log(data);
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
      <section className="blogItemSec">
        <div className="row">
          {isLoading && (
            <div className="preloaderCount">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
          {/* {cosmeticBlogCategories.map((item) => {
            return (
              <div key={item.id} className="col-lg-6">
                <div
                  className="blogItemInfo bgPink brochuresItems"

                >
                  <div className="eventFigure">
                   
                    <div className="postDate">
                      <span className="date">25</span>
                      <span className="month">feb</span>
                    </div>
                  </div>
                  <div className="eventContent">


                    <h4>

                      <Link to={`/blog-detail/${item.id}`}>
                        {t(`${item.name}`)}</Link>
                    </h4>
                    <p>
                      {t(`${item.description}`)}</p>
                    <div className="blogItemContent d-none">
                      <div className="author">
                        <ul>
                          <li>

                            <Link to={`/blog-detail/${item.id}`}>
                              <MdOutlineAdminPanelSettings />
                              By Ismail
                            </Link>
                          </li>
                          <li>

                            <Link to={`/blog-detail/${item.id}`}>
                              {" "}
                              <MdPhoneInTalk /> Consulting
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })} */}
          {blogData &&
            blogData.map((item) => {
              return (
                <div
                  key={item._id}
                  className="col-lg-6 col-md-6 col-sm-6 col-xs-6"
                >
                  <div className="blogItemInfo">
                    <div className="blogItemFigure">
                      <Link to={`/blog-detail/${item.uid}/${item?._id}`}>
                        <img
                          src={item.banner.url}
                          alt={item.title}
                          title={item.title}
                        />
                      </Link>
                      <div className="postDate">
                        {/* <span className="date">25</span>
                        <span className="month">feb</span> */}
                        {(() => {
                          const dateObj = new Date(item?.updatedAt);
                          const day = dateObj.getDate();
                          const month = dateObj
                            .toLocaleString("en-US", { month: "short" })
                            .toLowerCase(); // feb, mar, etc.
                          return (
                            <>
                              <span className="date">{day}</span>
                              <span className="month">{month}</span>
                            </>
                          );
                        })()}
                      </div>
                    </div>
                    <div className="blogItemContent">
                      <div className="author">
                        <ul>
                          <li>
                            <Link to={`/blog-detail/${item.uid}/${item?._id}`}>
                              <MdOutlineAdminPanelSettings />
                              By Ismail
                            </Link>
                          </li>
                          <li>
                            <Link to={`/blog-detail/${item.uid}/${item?._id}`}>
                              {" "}
                              <MdPhoneInTalk /> Consulting
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div className="title">
                        <h4>
                          <Link to={`/blog-detail/${item.uid}/${item?._id}`}>
                            {item.title}
                          </Link>
                        </h4>
                        <p>{item.short_description}</p>
                      </div>
                      <div className="readMore">
                        <Link to={`/blog-detail/${item.uid}/${item?._id}`}>
                          Read More <HiOutlineArrowNarrowRight />{" "}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </section>
    </>
  );
}

export default BlogItem;
