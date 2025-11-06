import { useListSellersQuery } from "../../components/products/productSlice";
import img from "../../assets/img/banner/etg.png";
import { Link } from "react-router-dom";
import Breadcrumb from "../../shared/breadcrumb/Breadcrumb";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { base_url } from "../../server";
import { useTranslation } from "react-i18next";
function AllSellerList() {
  const { isLoading } = useListSellersQuery();

  const [data, setData] = useState(null);
  const baseUrl = base_url();
  const getData = async () => {
    const res = await axios.get(`${baseUrl}sellerList/public`);
    setData(res.data);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { t } = useTranslation();

  return (
    <>
      <Breadcrumb title="All Sellers" t={t} />
      {isLoading && (
        <div className="preloaderCount">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      <section className="brandsSec sectionPD bg-white">
        <div className="container">
          <div className="brandsItem fullBrandsItem">
            <div className="brandsHeader">
              <div className="fisherman-content mb-4">
                <span>{t("our Sellers")}</span>
                <h3>{t("top Seller")}</h3>
              </div>
            </div>
            <ul>
              {data &&
                data.map((item) => {
                  return (
                    <li key={item._id}>
                      <Link to={`/seller/seller-home/${item._id}`}>
                        <img src={img} alt="Brand" className="img-fluid" />
                      </Link>
                      <div>{t("Name")} : {item?.firstname + " " + item?.lastname}</div>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
export default AllSellerList;
