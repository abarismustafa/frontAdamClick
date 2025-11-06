import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import About from "../../components/about/About";

function AboutPage({ setShow }) {
  return (
    <>
      <Helmet>
        <title>About Us | Adamclick</title>
        <meta name="keyword" content="adamclick" />
        <meta name="description" content="adamclick" />
      </Helmet>
      <About />
    </>
  );
}

export default AboutPage;
