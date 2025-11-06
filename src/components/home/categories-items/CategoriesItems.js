import React from "react";
import { Link } from "react-router-dom";


function CategoriesItems() {
  return (
    <>
      <div className="categoriesSec">
        <div className="brandsHeader">
          <div className="fisherman-content mb-4">
            <span>our Categories</span>
            <h3>Top 10 Categories</h3>
          </div>
          <div className="viewMoreBrands">
            <Link to="/" className="btn btn-primary">
              View All Categories
            </Link>
          </div>
        </div>
        <div className="categoriesBody">
          <Link to="/products" className="categoryItem card">
            <div className="categoryImg">
              <img
                src="https://mmslfashions.in/public/uploads/all/0fszFBvsXqbAUVAsKTXrOAVHBnuvUvHsVeWjuqji.png"
                alt="Product"
              />
            </div>
            <div className="categoryText card-body">
              <h6>Fertilizer</h6>
            </div>
          </Link>
          <Link to="/products" className="categoryItem card">
            <div className="categoryImg">
              <img
                src="https://mmslfashions.in/public/uploads/all/VRg3fxSHDaSL6GfE9o05ropnhBao78kMgl0mvIqR.png"
                alt="Product"
              />
            </div>
            <div className="categoryText card-body">
              <h6>Specialty Fertilizer</h6>
            </div>
          </Link>
          <Link to="/products" className="categoryItem card">
            <div className="categoryImg">
              <img
                src="https://mmslfashions.in/public/uploads/all/zNg9tlDvU7nCORhtIwFGhFzBpbPAoNwUL3FWpkpx.png"
                alt="Product"
              />
            </div>
            <div className="categoryText card-body">
              <h6>Agro Chemicals</h6>
            </div>
          </Link>
          <Link to="/products" className="categoryItem card">
            <div className="categoryImg">
              <img
                src="https://mmslfashions.in/public/uploads/all/X8h9TcK3S4MFhEH7HiV62ewEnG1S3Jgq1UlzvRtu.png"
                alt="Product"
              />
            </div>
            <div className="categoryText card-body">
              <h6>Tools & Equipments</h6>
            </div>
          </Link>
          <Link to="/products" className="categoryItem card">
            <div className="categoryImg">
              <img
                src="https://mmslfashions.in/public/uploads/all/VRg3fxSHDaSL6GfE9o05ropnhBao78kMgl0mvIqR.png"
                alt="Product"
              />
            </div>
            <div className="categoryText card-body">
              <h6>Seeds</h6>
            </div>
          </Link>
          <Link to="/products" className="categoryItem card">
            <div className="categoryImg">
              <img
                src="https://mmslfashions.in/public/uploads/all/0mM656EXmjvm5VJWhFFvXDaU6W8FZHYfzWCaQOSs.jpg"
                alt="Product"
              />
            </div>
            <div className="categoryText card-body">
              <h6>Polymer Polyolefin</h6>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}

export default CategoriesItems;
