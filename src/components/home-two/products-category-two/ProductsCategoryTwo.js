import React from "react";
import {
  useGetCategoriesQuery,
  useGetMenuListQuery,
} from "../../products/productSlice";

import "../../home/products-category/ProductsCategory.css";
import { productData } from "../../../pages/product-detail/mockData";
import { featuredDB } from "../../../rki-data/category";
import { categoryDB } from "../../../home-two-data/category";

function ProductsCategoryTwo() {
  const { data, isLoading, error } = useGetCategoriesQuery();

  const { data: categoryData } = useGetMenuListQuery();

  return (
    <>
      <section className="productsCategorySec d-none">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <div className="fisherman-content mb-3">
                <h3>Shop By Category 1</h3>
              </div>
            </div>

            {isLoading && (
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            )}
            {error && (
              <h4 style={{ textAlign: "center", color: "red" }}>
                Server Error
              </h4>
            )}

            {categoryData?.slice(0, 3).map((item, i) => {
              return (
                <div key={item._id} className="col-lg-4 col-md-6 col-sm-12">
                  <div className="productsCategoryItem">
                    <div className="categoryHeader">
                      <h5 className="title">{item?.title?.name}</h5>
                      <a href="/products">view all </a>
                    </div>
                    <div className="categoryBody">
                      <div className="singleProducts">
                        <a href="/products">
                          {/* <img src={productData.data[1].bigUrl} alt="Product" /> */}
                          <img
                            src={featuredDB[2].url}
                            alt={item?.title?.name}
                          />
                          <p> Ceramic Handicrafts</p>
                          <span className="sale">Sale</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="productCategoryBox sectionPD">
        <div className="container">
          <div className="row">
            {/* Section Title */}
            <div className="col-lg-12">
              <div className="sectionTitle">
                <h3>Shop By Category</h3>
                <p>Our process grape silver beet</p>
              </div>
            </div>

            {/* Error Handling */}
            {isLoading && (
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            )}
            {error && (
              <h4 style={{ textAlign: "center", color: "red" }}>
                Server Error
              </h4>
            )}
          

          {categoryDB?.slice(0, 3).map((item, i) => {
            return (
              <div key={item._id} className="col-lg-4 col-md-6 col-sm-12">
                <div className="productsCategoryCard">
                  <div className="categoryBody">
                    <div className="singleProductsItem">
                      <a href="/products">
                        {/* <img src={productData.data[1].bigUrl} alt="Product" /> */}
                        <img src={item?.url} alt={item?.name} />
                        
                      </a>
                    </div>
                  </div>
                  <div className="categoryName">
                    <h5 className="title">{item?.name}</h5>
                    <a href="/products">view all </a>
                  </div>
                </div>
              </div>
            );
          })}</div>
        </div>
      </section>
    </>
  );
}

export default ProductsCategoryTwo;
