import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import Blog from "../../components/blog/Blog";

function BlogPage({ setShow }) {
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
