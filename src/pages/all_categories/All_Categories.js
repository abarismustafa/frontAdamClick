import axios from "axios";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { base_url } from "../../server";

function All_Categories() {
  const [data, setdata] = useState(null);
  const baseUrl = base_url();
  const getData = async () => {
    const res = await axios.get(`${baseUrl}category/public`, {
      withCredentials: true,
    });
    setdata(res.data);
  };

  useEffect(() => {
    getData();
  }, []);
  const { t, i18n } = useTranslation();
  return (
    <section className="sectionPD">
      <div className="container">
        <div className="fisherman-content">
          {/* <h3>All Categories & Sub Categories</h3> */}
          <h3>{t("All Categories")}</h3>
        </div>
        <div className="row">
          {data &&
            data.map((item, i) => {
              return (
                <div className="col-lg-3 col-md-4 col-6">
                  <div className="allCategoryCard">
                    <img src={item?.icon?.url} />
                    <Link to={`/product/category/${item?._id}/${item.slug}`}>
                      {" "}
                      {item?.name}
                    </Link>
                  </div>
                  <div>
                    {item?.Submenu &&
                      item?.Submenu?.map((item) => {
                        return (
                          <Link
                            to={`/product/category/${item?._id}/${item.slug}`}
                          >
                            {item?.name}
                          </Link>
                        );
                      })}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
}
export default All_Categories;
