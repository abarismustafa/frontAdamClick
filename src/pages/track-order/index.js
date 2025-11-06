import React, { useEffect } from "react";
import TrackOrder from "../../components/track-order/TrackOrder";
import Breadcrumb from "../../shared/breadcrumb/Breadcrumb";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";

function TrackOrderPage({ setShow }) {
  const { t } = useTranslation();
  return (
    <>
     <Helmet>
        <title>Track Order | adamclick</title>
        <meta name="keyword" content="adamclick" />
        <meta name="description" content="adamclick" />
      </Helmet>
      <Breadcrumb title="Track Order" t={t} />
      <TrackOrder />
    </>
  );
}

export default TrackOrderPage;
