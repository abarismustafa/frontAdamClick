import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import Contact from "../../components/contact/Contact";

function ContactPage({ setShow }) {
  return (
    <>
      <Helmet>
        <title>Contact Us | adamclick</title>
        <meta name="keyword" content="adamclick" />
        <meta name="description" content="adamclick" />
      </Helmet>
      <Contact />
    </>
  );
}

export default ContactPage;
