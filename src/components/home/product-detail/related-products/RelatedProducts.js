import React from 'react'
import { Link } from 'react-router-dom';
import RelatedProduct from './related-product/RelatedProduct';

function RelatedProducts({productData}) {
  return (
    <>
        <section className="relatedProductSec sectionPD">
        <div className="container">
          <div className="row classSet">
            <div className="col-lg-12">
              <div className="fishermanHeader">
                <div className="fisherman-content">
                  <h3>Related Products</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod temp.</p>
                </div>
                <div className="fisherman-btn d-none">
                  <Link to="/products" className="optional-btn">
                    View More
                  </Link>
                </div>
              </div>
            </div>
            <RelatedProduct productData={productData} />
          </div>
        </div>
      </section>
    </>
  )
}

export default RelatedProducts