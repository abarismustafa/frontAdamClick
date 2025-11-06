import React from "react";

function AboutChoose({t}) {
  return (
    <>
      <section className="featuresSection sectionPD">
        <div className="container">
          <div className="fisherman-content">
            <h3>{t('why choose us')}</h3>
          </div>
          <div className="row">
            <div className="col-lg-4">
              <div className="feature-box bgGray h-100">
                <i className="icon-shipped" />
                <div className="fisherman-content p-5">
                  <h5>{t('Best Quality')}</h5>
                  <p>
                    {t('inabout')}
                  </p>
                </div>
                {/* End .fisherman-content p-5 */}
              </div>
              {/* End .feature-box */}
            </div>
            {/* End .col-lg-4 */}
            <div className="col-lg-4">
              <div className="feature-box bgGray h-100">
                <i className="icon-us-dollar" />
                <div className="fisherman-content p-5">
                  <h5>{t('Customer Care')}</h5>
                  <p>
                    {t('about-2')}
                  </p>
                </div>
                {/* End .fisherman-content p-5 */}
              </div>
              {/* End .feature-box */}
            </div>
            {/* End .col-lg-4 */}
            <div className="col-lg-4">
              <div className="feature-box bgGray h-100">
                <i className="icon-online-support" />
                <div className="fisherman-content p-5">
                  <h5> {t('Support 24/7')}</h5>
                  <p>
                    {t('cont')}
                  </p>
                </div>
                {/* End .fisherman-content p-5 */}
              </div>
              {/* End .feature-box */}
            </div>
            {/* End .col-lg-4 */}
          </div>
          {/* End .row */}
        </div>
        {/* End .container */}
      </section>
    </>
  );
}

export default AboutChoose;
