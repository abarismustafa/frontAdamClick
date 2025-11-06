import React from 'react'
import SellerAllProduct from './seller-all-product/SellerAllProduct'


function SellerAllProducts() {
  return (
    <>
        <section className="sellerHomeInfo p-30">
        <div className="row">
          <div className="col-lg-12">
            <div className="sellerTopHeader">
              <h2>All products</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Architecto, impedit quos ab reprehenderit corporis odit
                voluptatibus atque dignissimos facere voluptate in nobis
                maiores, dicta saepe ullam, cumque ipsam quod quae.
              </p>
            </div>
          </div>
          <SellerAllProduct />
        </div>
      </section>
    </>
  )
}

export default SellerAllProducts