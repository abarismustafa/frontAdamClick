import React, { useEffect } from "react";
import SellerAllProducts from "../seller-all-products/SellerAllProducts";

function AllProducts({setShow}) {

  return (
    <>
      <section className="sellerHomeSec p-30">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="sellerHomeInfo">
                <SellerAllProducts />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default AllProducts;
