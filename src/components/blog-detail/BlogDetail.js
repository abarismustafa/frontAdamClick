import React, { useEffect, useState } from "react";
import Breadcrumb from "../../shared/breadcrumb/Breadcrumb";
import BlogAside from "../blog/blog-aside/BlogAside";
import BlogCommentForm from "./blog-comment-form/BlogCommentForm";
import BlogUsersComment from "./blog-users-comment/BlogUsersComment";
import { Helmet } from "react-helmet";
import { useGetBlogDetailsQuery } from "../products/productSlice";
import { useParams } from "react-router-dom";
import axios from "axios";
import { base_url } from "../../server";
import { useTranslation } from "react-i18next";

// import blog1 from "../../assets/img/serviceList/cagliata.jpg";
// import blog2 from "../../assets/img/serviceList/Indian-Cereals.jpg";
// import blog3 from "../../assets/img/serviceList/Indian-Pulses.jpg";
// import blog4 from "../../assets/img/serviceList/gr5ikknbtygma4krpfai.png";
// import blog5 from "../../assets/img/serviceList/f454dq2nqgkt45dcladv.png";
// import blog6 from "../../assets/img/serviceList/jo1im9jkpkbst0of9sti.png";



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

function BlogDetail() {
  const params = useParams();

  const [data, setData] = useState(null);
  const [isLoading, setisLoading] = useState(false);

  // console.log(data?.banner);


  const token = window.localStorage.getItem("token");
  const baseUrl = base_url();
  const getData = async () => {
    setisLoading(true);
    try {
      const res = await axios.get(`${baseUrl}blogs/${params.id}`, {
        withCredentials: true,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${token}`,
        },
      });
      setisLoading(false);
      setData(res.data[0]);
    } catch (error) {
      setisLoading(false);
      // console.log("Fail to Load Blog Detail !");
    }
  };


  const { t } = useTranslation();
  const [blogData, setBlogData] = useState(cosmeticBlogCategories);
  const filterData = blogData.find((item) => {
    // console.log(item.id === params.id);

    return item.id == params.id;
  });

  const [reviewData, setReviewData] = useState(null)
  const resviewCommet = async () => {
    try {
      const res = await axios.get(`${baseUrl}reviews/blogs/${params._id}`, {
        withCredentials: true,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${token}`,
        },
      });
      if (res?.status == 200) {
        setReviewData(res?.data)
      }
      // console.log(res);

    } catch (error) {

    }
  }

  useEffect(() => {
    getData();
    resviewCommet()
  }, [params.id]);



  return (
    <>
      <Helmet>
        <title>Blog Detail | adamclick</title>
        <meta
          name="keyword"
          content="adamclick"
        />
        <meta
          name="description"
          content="adamclick"
        />
      </Helmet>
      <Breadcrumb title="Blog Detail" t={t} />
      <section className="blogDetailSec sectionPD">
        <div className="container">
          {isLoading && (
            <div className="preloaderCount">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
          <div className="row">
            <div className="col-md-8">
              <div className="blogDetailInfo">
                <div className="blogDetailContent">
                  <figure className="currentBlogImg">
                    <img
                      src={data?.banner?.url}
                      alt="Blog"
                      className="img-fluid"
                    />
                  </figure>
                  <h4>{t(`${data?.title}`)}</h4>
                  <p>{t(`${filterData?.description}`)}</p>
                </div>
                <BlogUsersComment reviewData={reviewData} resviewCommet={resviewCommet} />
                <BlogCommentForm data={data} resviewCommet={resviewCommet} />
              </div>
            </div>
            <div className="col-md-4">
              <BlogAside t={t} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default BlogDetail;
