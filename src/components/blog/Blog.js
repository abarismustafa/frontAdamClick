import React from "react";
import Breadcrumb from "../../shared/breadcrumb/Breadcrumb";
import BlogAside from "./blog-aside/BlogAside";
import BlogItem from "./blog-item/BlogItem";
import { useTranslation } from "react-i18next";

function Blog() {
  const { t, i18n } = useTranslation();
  return (
    <>
      <Breadcrumb title="Blog" t={t} />
      <section className="blogSec sectionPD bg-white">
        <div className="container">
          <div className="row">
            {/* <div className="col-md-4">
              <BlogAside t={t} />
            </div>
            <div className="col-md-8">
              <BlogItem t={t} />
            </div> */}


            <div className="col-lg-8 col-md-8">
              <BlogItem t={t} />
            </div>

            <div className="col-lg-4 col-md-4">
              <BlogAside t={t} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Blog;
