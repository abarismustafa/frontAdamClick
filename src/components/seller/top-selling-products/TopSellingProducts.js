import React from "react";
import TopSellingProduct from "./top-selling-product/TopSellingProduct";

function TopSellingProducts() {
  return (
    <>
      <section className="sellerHomeInfo">
        <div className="row">
          <div className="col-lg-12">
            <div className="sellerTopHeader">
              <h2>Top Selling</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Architecto, impedit quos ab reprehenderit corporis odit
                voluptatibus atque dignissimos facere voluptate in nobis
                maiores, dicta saepe ullam, cumque ipsam quod quae.
              </p>
            </div>
          </div>
          <TopSellingProduct />
        </div>
      </section>
    </>
  );
}

export default TopSellingProducts;
