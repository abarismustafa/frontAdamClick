import React from "react";

function RecentViewed({ recent, closeRecent }) {
  return (
    <>
      <div className={`recentViewedSec ${recent ? "active" : ""}`}>
        <div className="recentViewHeader">
          <h4>Recent Viewed</h4>
          <button type="button" onClick={closeRecent}>x</button>
        </div>
        <div className="recentViewBody">
          <div className="recentViewItem">
            <div className="figure">
              <a href="#">
                <img
                  src="https://cdn.shopify.com/s/files/1/0722/2059/products/Artboard1_fa0863e7-77ef-4f47-843d-490f3ff1913c.webp?v=1675081252"
                  alt="Product"
                  className="img-fluid"
                />
              </a>
            </div>
            <div className="text">
              <h5>Natural Organic Fertilizer</h5>
              <p>Kay bee</p>
              <div className="priceBottom">
                <p className="price">
                  <strong>Price - </strong> 1,500
                </p>
                <button type="button">Add to cart</button>
              </div>
            </div>
          </div>
          <div className="recentViewItem">
            <div className="figure">
              <a href="#">
                <img
                  src="https://cdn.shopify.com/s/files/1/0722/2059/products/Artboard1_fa0863e7-77ef-4f47-843d-490f3ff1913c.webp?v=1675081252"
                  alt="Product"
                  className="img-fluid"
                />
              </a>
            </div>
            <div className="text">
              <h5>Natural Organic Fertilizer</h5>
              <p>Kay bee</p>
              <div className="priceBottom">
                <p className="price">
                  <strong>Price - </strong> 1,500
                </p>
                <button type="button">Add to cart</button>
              </div>
            </div>
          </div>
          <div className="recentViewItem">
            <div className="figure">
              <a href="#">
                <img
                  src="https://cdn.shopify.com/s/files/1/0722/2059/products/Artboard1_fa0863e7-77ef-4f47-843d-490f3ff1913c.webp?v=1675081252"
                  alt="Product"
                  className="img-fluid"
                />
              </a>
            </div>
            <div className="text">
              <h5>Natural Organic Fertilizer</h5>
              <p>Kay bee</p>
              <div className="priceBottom">
                <p className="price">
                  <strong>Price - </strong> 1,500
                </p>
                <button type="button">Add to cart</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RecentViewed;
