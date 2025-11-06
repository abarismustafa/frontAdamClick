import React from "react";
import Breadcrumb from "../../shared/breadcrumb/Breadcrumb";
import PrivacyPolicy from "../../components/privacy-policy/PrivacyPolicy";
import { useTranslation } from "react-i18next";

function PrivacyPolicyPage() {
  
    const { t } = useTranslation();
  return (
    <>
      <Breadcrumb title="Privacy Policy" t={t} />
      <PrivacyPolicy />
    </>
  );
}

export default PrivacyPolicyPage;
