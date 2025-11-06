import React from "react";

function SellEvent() {
  return (
    <>
      <section className="p-30">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="event">
                <h4 className="text-uppercase mb-2 mb-4">
                  EVENTS AND PROGRAMS
                </h4>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="seller-event">
                <img
                  src="https://img1a.flixcart.com/fk-sp-static/images/seller_conclave.png"
                  alt="Sell Event"
                />
                <div className="p-3">
                  <h5>Seller Events</h5>
                  <div>
                    <span>ETG Admin</span> | <span>29th Aug, 2022</span> |
                    <span>5 min read</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="seller-event">
                <img
                  src="https://img1a.flixcart.com/fk-sp-static/images/Samarth4.png"
                  alt="Sell Event"
                />
                <div className="p-3">
                  <h5>Webinars</h5>
                  <div>
                    <span>ETG Admin</span> | <span>11th Mar, 2022</span> |
                    <span>5 min read</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="seller-event">
                <img
                  src="https://img1a.flixcart.com/fk-sp-static/images/seller_conclave.png"
                  alt="Sell Event"
                />
                <div className="p-3">
                  <h5>ETG Samarth</h5>
                  <div>
                    <span>ETG Admin</span> | <span> 14th Mar, 2022 </span> |{" "}
                    <span>5 min read</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default SellEvent;
