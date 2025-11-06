import React from "react";

function ContactInfo({t}) {
  return (
    <>
      <div className="fisherman-content">
        <h3>{t('Contact Info')}</h3>
        <p>
          {t('conuse')}
        </p>
      </div>
    </>
  );
}

export default ContactInfo;
