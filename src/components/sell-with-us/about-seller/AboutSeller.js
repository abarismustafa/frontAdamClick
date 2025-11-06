import React from "react";

function AboutSeller() {
  return (
    <>
      <section className="aboutSellerSec p-30">
        <div className="container">
          <div className="aboutSellerBody">
            <ul className="nav nav-tabs aboutSell" id="myTab" role="tablist">
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link active"
                  id="whySellOnline"
                  data-bs-toggle="tab"
                  data-bs-target="#whySellOnline"
                  type="button"
                  role="tab"
                  aria-controls="whySellOnline"
                  aria-selected="true"
                >
                  WHY SELL ONLINE
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="whyETG"
                  data-bs-toggle="tab"
                  data-bs-target="#whyETG"
                  type="button"
                  role="tab"
                  aria-controls="whyETG"
                  aria-selected="false"
                >
                  WHY ETG
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="whyShopsy"
                  data-bs-toggle="tab"
                  data-bs-target="#whyShopsy"
                  type="button"
                  role="tab"
                  aria-controls="whyShopsy"
                  aria-selected="false"
                >
                  WHY SHOPSY
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="beASeller"
                  data-bs-toggle="tab"
                  data-bs-target="#beASeller"
                  type="button"
                  role="tab"
                  aria-controls="beASeller"
                  aria-selected="false"
                >
                  HOW TO BE A SELLER
                </button>
              </li>
            </ul>

            <div className="tab-content" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="whySellOnline"
                role="tabpanel"
                aria-labelledby="whySellOnline"
              >
                <div className="row">
                  <div className="col-lg-3 col-sm-12">
                    <div className="sellerTabInfo">
                      <span className="num">1</span>
                      <h5>Growth in the online retail market</h5>
                      <p>
                        Witnessing tremendous growth for the past 5 years,
                        retailers are moving towards online selling.
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-3 col-sm-12">
                    <div className="sellerTabInfo">
                      <span className="num">2</span>
                      <h5>Get orders across India</h5>
                      <p>
                        Receive orders from every part of the country and follow
                        the simple steps to fulfill the orders.
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-3 col-sm-12">
                    <div className="sellerTabInfo">
                      <span className="num">3</span>
                      <h5>Ship with ease</h5>
                      <p>
                        Enjoy easy pick-up and delivery across India with Ekart,
                        our logistics partner.
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-3 col-sm-12">
                    <div className="sellerTabInfo">
                      <span className="num">4</span>
                      <h5>Earn big</h5>
                      <p>
                        Our payments process is the fastest in the industry -
                        get your payments in as little as 7 days of sales.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="whyETG"
                role="tabpanel"
                aria-labelledby="whyETG"
              >
                2
              </div>
              <div
                className="tab-pane fade"
                id="whyShopsy"
                role="tabpanel"
                aria-labelledby="whyShopsy"
              >
                3
              </div>
              <div
                className="tab-pane fade"
                id="beASeller"
                role="tabpanel"
                aria-labelledby="beASeller"
              >
                4
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default AboutSeller;
