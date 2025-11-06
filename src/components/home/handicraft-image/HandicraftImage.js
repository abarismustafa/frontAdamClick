import React, { useState } from "react";
import { handicraftDB } from "../../../rki-data/handicraft";

const HandicraftImage = () => {
  const [data, setData] = useState(handicraftDB);
  return (
    <>
      <section className="handicraftSec sectionPD grayBg">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="fisherman-content mb-4">
                <h3>Handicraft Products Online Store</h3>
                <span>
                  Buy Handicraft Products Online From Our Extensive Collection
                  Of Herbal Products At Affordable Prices.
                </span>
              </div>
            </div>
            {data &&
              data.map((item) => {
                return (
                  <div className="col-lg-6" key={item._id}>
                    <div className="handicraftInfo">
                      <img
                        src={item.url}
                        alt="HandicraftImage"
                        className="img-fluid"
                      />
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </section>
    </>
  );
};

export default HandicraftImage;
