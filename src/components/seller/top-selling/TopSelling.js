import React, { useEffect } from "react";
import TopSellingProducts from "../top-selling-products/TopSellingProducts";

function TopSelling({setShow}) {

  return (
    <>
      <section className="sellerHomeSec p-30">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="sellerHomeInfo">
                <TopSellingProducts />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default TopSelling;
