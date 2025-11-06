import React from 'react'
import Banner from '../home/banner/Banner'
import BannerTwo from './banner-two/BannerTwo'
import ProductsCategoryTwo from './products-category-two/ProductsCategoryTwo'
import FeaturedProductsTwo from './featured-products-two/FeaturedProductsTwo'

const HomeTwo = () => {
  return (
    <>
        <BannerTwo />
        
      {/* <ServiceList /> */}
      <ProductsCategoryTwo />

      {/* <Products productData={productData} /> */}

      <FeaturedProductsTwo />
      {/* <TrendingProducts /> */}
      {/* <TodayDeals /> */}
      <section className="sellerCategorySec d-none">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              {/* <CategoriesItems /> */}
            </div>
          </div>
        </div>
      </section>
      {/* <Brands /> */}
      {/* <Network /> */}
      {/* <AddingShow /> */}

      {/* <HandicraftImage /> */}
      {/* <CostInfo /> */}
    </>
  )
}

export default HomeTwo