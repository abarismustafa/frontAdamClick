import React from 'react'

function AboutCounters({t}) {
  return (
    <>
      <div className="countersSection">
        <div className="container">
          <div className="countcontainer">
            <div className="countItem">
              <div className="count-wrapper">
                <h4
                  className="count-to"
                  data-from={0}
                  data-to={200}
                  data-speed={2000}
                  data-refresh-interval={50}
                >
                  200
                  <span>+</span>
                </h4>
              </div>
              {/* End .count-wrapper */}
              <p className="count-title">{t('MILLION CUSTOMERS')}</p>
            </div>

            <div className="countItem">
              <div className="count-wrapper">
                <h4
                  className="count-to"
                  data-from={0}
                  data-to={1800}
                  data-speed={2000}
                  data-refresh-interval={50}
                >
                  1800
                  <span>+</span>
                </h4>
              </div>
              {/* End .count-wrapper */}
              <p className="count-title">{t('TEAM MEMBERS')}</p>
            </div>

            <div className="countItem">
              <div className="count-wrapper line-height-1">
                <h4
                  className="count-to"
                  data-from={0}
                  data-to={24}
                  data-speed={2000}
                  data-refresh-interval={50}
                >
                  24
                  <span>HR</span>
                </h4>
              </div>
              {/* End .count-wrapper */}
              <p className="count-title">{t('SUPPORT AVAILABLE')}</p>
            </div>

            <div className="countItem">
              <div className="count-wrapper">
                <h4
                  className="count-to"
                  data-from={0}
                  data-to={265}
                  data-speed={2000}
                  data-refresh-interval={50}
                >
                  265
                  <span>+</span>
                </h4>
              </div>
              {/* End .count-wrapper */}
              <p className="count-title">{t('SUPPORT AVAILABLE')}</p>
            </div>

          </div>
          {/* End .row */}
        </div>
        {/* End .container */}
      </div>
    </>
  )
}

export default AboutCounters