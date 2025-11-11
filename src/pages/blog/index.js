import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import Blog from "../../components/blog/Blog";
import UseStatisticTracker from "../../common/useStatisticTracker/UseStatisticTracker";

function BlogPage({ setShow }) {
  UseStatisticTracker({});
  return (
    <>
      <Helmet>
        <title>Blog | adamclick</title>
        <meta name="keyword" content="adamclick" />
        <meta name="description" content="adamclick" />
      </Helmet>
      <Blog />
    </>
  );
}

export default BlogPage;
