import React from "react";
import { FaAddressBook } from "react-icons/fa";
import { BsFillPhoneFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { Ri24HoursFill } from "react-icons/ri";

function ContactAddress({ t }) {
  return (
    <>
      <div className="connectSec">
        <div className="row">
          <div className="col-lg-6">
            <div className="feature-box">
              <div className="feature-box-content">
                <BsFillPhoneFill />
                <h4>{t("Phone Number")}</h4>
                <p>
                  <a href="tel:+919810341423">+919810341423</a>
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="feature-box">
              <div className="feature-box-content">
                <MdEmail />
                <h4>{t("E-mail Address")}</h4>

                <p>
                  <a href="mailto:rizwan@adamclick.com">rizwan@adamclick.com</a>
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="feature-box">
              <div className="feature-box-content">
                <FaAddressBook />
                <h4>{t("Address")}</h4>
                <p>
                Unit No. 461, Tower B1, Spaze i-Tech Park, Sector 49, Gurgaon-122018

                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactAddress;
