import React from "react";
import FeaturedProduct from "./featured-product/FeaturedProduct";

function FeaturedProducts() {
  return (
    <>
      <section className="sellerHomeInfo p-30">
        <div className="row">
          <div className="col-lg-12">
            <div className="sellerTopHeader">
              <h2>Seller Products</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Architecto, impedit quos ab reprehenderit corporis odit
                voluptatibus atque dignissimos facere voluptate in nobis
                maiores, dicta saepe ullam, cumque ipsam quod quae.
              </p>
            </div>
          </div>
          <FeaturedProduct />
        </div>
      </section>
    </>
  );
}

export default FeaturedProducts;
