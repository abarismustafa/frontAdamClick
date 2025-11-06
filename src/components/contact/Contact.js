import React from "react";
import Breadcrumb from "../../shared/breadcrumb/Breadcrumb";
import ContactAddress from "./contact-address/ContactAddress";
import ContactForm from "./contact-form/ContactForm";
import ContactInfo from "./contact-info/ContactInfo";
import ContactMap from "./contact-map/ContactMap";

import contact from "../../assets/img/category/contactt.jpg"
import { useTranslation } from "react-i18next";

function Contact() {
  const { t, i18n } = useTranslation()
  return (
    <>
      <Breadcrumb title="Contact" t={t}/>
      <main className="main">
        {/* <ContactMap /> */}

        <div className="contactFormSec sectionPD">
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                <ContactInfo t={t}/>
                
                <ContactAddress t={t}/>
              </div>
              <div className="col-lg-4">
                <ContactForm t={t}/>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Contact;
