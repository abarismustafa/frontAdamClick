import React, { useState } from "react";
import { Link } from "react-router-dom";
import ProductItem from "./product/ProductItem";
import "./Products.css";

function Products({productData}) {
  return (
    <>
      <section className="productsSection sectionPD">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="fishermanHeader d-flex justify-content-between align-items-end mb-4">
                <div className="fisherman-content">
                  <span>our products</span>
                  <h3>Featured Products</h3>
                </div>
                <div className="fisherman-btn">
                  <Link to="/products" className="optional-btn">
                    View More
                  </Link>
                </div>
              </div>
            </div>
            <ProductItem productData={productData} />
          </div>
        </div>
      </section>
    </>
  );
}

export default Products;
