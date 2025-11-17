import { useState } from "react";
import React, { createContext, useContext, useEffect } from "react";
import { Provider } from "react-redux";
import { productItemHome } from "../../pages/home";
import { productData } from "../../pages/products/mockData";
import { store } from "../store";
import Banner from "./banner/Banner";
import BestSeller from "./best-seller/BestSeller";
import Brands from "./brands/Brands";
import CategoriesItems from "./categories-items/CategoriesItems";
import CostInfo from "./cost-info/CostInfo";
import FeaturedProducts from "./featured-products/FeaturedProducts";
import Network from "./network/Network";
import ProductsCategory from "./products-category/ProductsCategory";
import ProductItem from "./products/product/ProductItem";
import Products from "./products/Products";
import ServiceList from "./service-list/ServiceList";
import TodayDeals from "./today-deals/TodayDeals";
import TrendingProducts from "./trending-products/TrendingProducts";
import AddingShow from "./network/AddingShow";
import HandicraftImage from "./handicraft-image/HandicraftImage";
import CatagProduct from "./CatagPro/CatagProduct";
import axios from "axios";
import { base_url } from "../../server";
import PopularProduct from "./popular";
import Videos from "./videos/Videos";
import DiscoverKeras from "./discover-keras/DiscoverKeras";
import PrimaryCategory from "./primary-category/PrimaryCategory";
import { t } from "i18next";
import SimilarCategory from "./similar-category/SimilarCategory";

function Home() {
  const productData = useContext(productItemHome);
  const baseUrl = base_url();
  const [data, setData] = useState(null);
  console.log(data);

  const getata = async () => {
    try {
      const res = await axios.get(`${baseUrl}category/filter/categ`, {
        withCredentials: true,
      });
      setData(res.data);
    } catch (error) {}
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getata();
  }, []);

 

  return (
    <>
      <Banner />
      <ProductsCategory />
      <SimilarCategory />
      <FeaturedProducts />
      {data &&
        data?.slice(0, 3).map((item, i) => {
          return <CatagProduct key={i} item={item} />;
        })}

      {/* <Videos /> */}
      <PrimaryCategory pageTitle={"Skin Care"} />
      {/* <PrimaryCategory pageTitle={"Body Lotion"} /> */}
      <PopularProduct />

      <TrendingProducts />
      <DiscoverKeras />
      <Brands />
      {/* <ServiceList /> */}
      {/* <Products productData={productData} /> */}

      {/* <TodayDeals /> */}
      <section className="sellerCategorySec d-none">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <CategoriesItems />
            </div>
          </div>
        </div>
      </section>

      {/* <BestSeller /> */}
      {/* <Network /> */}
      {/* <AddingShow /> */}

      {/* <HandicraftImage /> */}
      {/* <CostInfo /> */}
    </>
  );
}

export default Home;
