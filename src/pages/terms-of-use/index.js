import React, { useEffect } from "react";
import TermsOfUse from "../../components/terms-of-use/TermsOfUse";
import Breadcrumb from "../../shared/breadcrumb/Breadcrumb";
import { useTranslation } from "react-i18next";

function TermsOfUsePage({ setShow }) {
  const { t } = useTranslation();
  return (
    <>
      <Breadcrumb title="Terms & Condition" t={t} />
      <TermsOfUse />
    </>
  );
}

export default TermsOfUsePage;
