import React from "react";
import {CgFileDocument} from "react-icons/cg" ;
import {BsArrowReturnLeft} from "react-icons/bs" ;
import {BiSupport} from "react-icons/bi" ;
import {MdOutlinePrivacyTip} from "react-icons/md" ;
import { Link } from "react-router-dom";
function PrivacyPolicy({t}) {
  return (
    <>
      <section className="privacyWrapper">
        <div className="container">
          <div className="row">
            <div className="col-lg-3"> 
                <div className="privacyItem">
                    <div className="privacyIcon"><CgFileDocument /></div>
                    <p><Link to="/terms-of-use">{t("Terms & Conditions")}</Link></p>
                </div>
            </div>
            <div className="col-lg-3">
                <div className="privacyItem">
                    <div className="privacyIcon"><BsArrowReturnLeft /></div>
                    <p><Link to="/terms-of-use">{t("Returns & Refund & Cancellation")}</Link></p>
                </div>
            </div>
            <div className="col-lg-3">
                <div className="privacyItem">
                    <div className="privacyIcon"><BiSupport /></div>
                    <p><Link to="/terms-of-use">{t("support policy")}</Link></p>
                </div>
            </div>
            <div className="col-lg-3">
                <div className="privacyItem">
                    <div className="privacyIcon"><MdOutlinePrivacyTip /></div>
                    <p><Link to="/terms-of-use">{t("Privacy Policy")}</Link></p>
                </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default PrivacyPolicy;
