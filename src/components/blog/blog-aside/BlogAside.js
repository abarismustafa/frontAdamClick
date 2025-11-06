import React, { useEffect, useState } from "react";
import blog1 from "../../../assets/img/product-detail/fertilizer-application1.jpg";
import blog2 from "../../../assets/img/product-detail/fertilizer-application-bg1.jpg";
import { FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useGetBlogCatQuery } from "../../products/productSlice";
import { base_url } from "../../../server";
import axios from "axios";

function BlogAside({ t }) {
  const { data, isLoading } = useGetBlogCatQuery();
  console.log(data);


  const baseUrl = base_url();
  const [blogCatData, setBlogCatData] = useState(null)
  const token = window.localStorage.getItem("token");
  const getBlogData = async () => {
    try {
      const res = await axios.get(`${baseUrl}blogsCat/public`, {
        withCredentials: true,
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      })
      console.log(res?.data);
      setBlogCatData(res?.data)

    } catch (error) {

    }
  }

  useEffect(() => {
    getBlogData()
  }, [])


  const [blogData, setBlogData] = useState(null)
  const getBlogDataAside = async () => {
    try {
      const res = await axios.get(`${baseUrl}blogs`)
      // console.log(res?.data);
      setBlogData(res?.data)
    } catch (error) {

    }
  }

  useEffect(() => {
    getBlogDataAside()
  }, [])


  const cosmeticBlogCategories = [
    {
      id: 1,
      name: "Makeup",
      description: "blogDesc1"
    },
    {
      id: 2,
      name: "Skincare",
      description: "blogDesc2"
    },
    {
      id: 3,
      name: "Beauty Tips & Hacks",
      description: "blogDesc3"
    },
    {
      id: 4,
      name: "Product Reviews",
      description: "blogDesc4"
    },
    {
      id: 5,
      name: "Hair Care",
      description: "blogDesc5"
    },
    {
      id: 6,
      name: "Natural & Organic Beauty",
      description: "blogDesc6"
    },
    {
      id: 7,
      name: "Trends & News",
      description: "blogDesc7"
    },
    {
      id: 8,
      name: "DIY Beauty",
      description: "blogDesc8"
    },
    {
      id: 9,
      name: "Travel Beauty",
      description: "blogDesc9"
    },
    {
      id: 10,
      name: "Ingredients & Science",
      description: "blogDesc10"
    }
  ];

  return (
    <>
      <div className="blogAsideSec">
        <div className="blogCategory">
          <h4 className="asideTitle">{t("Our Blog Category")}</h4>
          <hr />
          <ul>
            {isLoading && (
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            )}

            {blogCatData &&
              blogCatData.map((item) => {
                return (
                  <li key={item._id}>
                    <Link to={`/blog-detail/${item.uid}`}>
                      <FiChevronRight />
                      {item.name}
                    </Link>
                  </li>
                );
              })}

            {/* {cosmeticBlogCategories.map((item) => {
              return (
                <li key={item.id}>
                  <Link to="/">
                    <FiChevronRight />
                    {t(`${item.name}`)}
                  </Link>
                </li>
              );
            })} */}
          </ul>
        </div>
        <div className="recentPosts  ">
          <h4 className="asideTitle">recent posts</h4>
          <hr />
          {blogData && blogData.slice(0, 10).map((item) => {
            return (
              <div className="recentItemInfo" key={item?._id}>
                <div className="recentImg">
                  <img src={item?.banner?.url} alt="Latest Blog" />
                </div>
                <div className="recentContent">
                  <h6>
                    <Link to={`/blog-detail/${item.uid}`}>{item?.title}</Link>
                  </h6>
                  <p className='date'>
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
            );
          })}

          {/* <div className="recentItemInfo  ">
            <div className="recentImg">
              <img src={blog2} alt="Latest Blog" />
            </div>
            <div className="recentContent">
              <h6><Link to="/blog-detail">Fashion Trends</Link></h6>
              <p className='date'>July 09, 2015</p>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
}

export default BlogAside;
