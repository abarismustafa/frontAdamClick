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
    // <>
    //   <Breadcrumb title="All Sellers" t={t} />
    //   {isLoading && (
    //     <div className="preloaderCount">
    //       <div className="spinner-border" role="status">
    //         <span className="visually-hidden">Loading...</span>
    //       </div>
    //     </div>
    //   )}

    //   <section className="brandsSec sectionPD bg-white allSellerSection">
    //     <div className="container">
    //       <div className="brandsItem fullBrandsItem">
    //         <div className="brandsHeader">
    //           <div className="fisherman-content mb-4">
    //             <span>{t("our Sellers")}</span>
    //             <h3>{t("top Seller")}</h3>
    //           </div>
    //         </div>
    //         <ul className="sellerListGrid">
    //           {data &&
    //             data.map((item) => {
    //               return (
    //                 <li key={item._id} className="sellerCard">
    //                   <Link to={`/seller/seller-home/${item._id}`}>
    //                     <img src="https://res.cloudinary.com/duncu6k7b/image/upload/v1759318099/nj7xpcor7944mvchpqwk.png" alt="Brand" className="img-fluid sellerImage" />
    //                   </Link>
    //                   <div className="sellerInfo">
    //                     <strong>{item?.firstname + " " + item?.lastname}</strong>
    //                   </div>
    //                 </li>
    //               );
    //             })}
    //         </ul>
    //       </div>
    //     </div>
    //   </section>
    // </>
    <>
      <>
        <Breadcrumb title="All Sellers" t={t} />

        {isLoading && (
          <div className="preloaderCount">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        <section className="brandsSec sectionPD bg-white allSellerSection">
          <div className="container">
            <div className="brandsHeader text-center mb-4">
              <div className="fisherman-content mb-3">
                <span className="text-uppercase small text-muted">
                  {t("our Sellers")}
                </span>
                <h3 className="fw-bold">{t("top Seller")}</h3>
              </div>
            </div>

            <ul className="sellerListGrid">
              {data &&
                data.map((item) => (
                  <li key={item._id} className="sellerCard">
                    <Link to={`/seller/seller-home/${item._id}`}>
                      <img
                        src={
                          item?.image ||
                          "https://res.cloudinary.com/duncu6k7b/image/upload/v1759318099/nj7xpcor7944mvchpqwk.png"
                        }
                        alt={item?.firstname}
                        className="img-fluid sellerImage"
                      />
                    </Link>
                    <div className="sellerInfo">
                      <strong>{item?.firstname + " " + item?.lastname}</strong>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </section>
      </>
    </>
  );
}
export default AllSellerList;
