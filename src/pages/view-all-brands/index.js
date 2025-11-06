import React, { useEffect } from "react";
import ViewAllBrand from "../../components/view-all-brand/ViewAllBrand";
import Breadcrumb from "../../shared/breadcrumb/Breadcrumb";
import { useTranslation } from "react-i18next";

function ViewAllBrandPage({ setShow }) {
  const { t } = useTranslation();
  return (
    <>
      <Breadcrumb title={"View All Brands"} t={t} />
      <ViewAllBrand />
    </>
  );
}

export default ViewAllBrandPage;
