import React from "react";
import RetunsRefundCancellation from "../../components/returns-refund-cancellation/RetunsRefundCancellation";
import { useTranslation } from "react-i18next";
import Breadcrumb from "../../shared/breadcrumb/Breadcrumb";

function ReturnsRefundCancellationPage({ setShow }) {
 const { t } = useTranslation();
   return (
     <>
       <Breadcrumb title="Retuns Refund & Cancellation" t={t} />
      <RetunsRefundCancellation />
    </>
  );
}

export default ReturnsRefundCancellationPage;
