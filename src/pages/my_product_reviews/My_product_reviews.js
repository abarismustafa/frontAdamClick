import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { FcApproval, FcCancel } from "react-icons/fc";
import { base_url } from "../../server";
import { useTranslation } from "react-i18next";

function My_product_reviews() {
  const userid = window.localStorage.getItem("user_id");
  const [data, setdata] = useState(null);
  const baseUrl = base_url();
  const getData = async () => {
    const res = await axios.get(`${baseUrl}rating/user/${userid}`);
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
          <h3>{t("My Product Reviews")}</h3>
        </div>
        <div className="aiz-user-panel">
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">{t("Image")}</th>
                  <th scope="col">{t("Product Name")}</th>
                  <th scope="col">{t("Variant")}</th>
                  <th scope="col">{t("Rating")}</th>
                  <th scope="col">{t("Comment")}</th>
                  <th scope="col">{t("Title")}</th>
                  <th scope="col">{t("Published")}</th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.map((item, i) => {
                    return (
                      <tr key={i}>
                        <th scope="row">{i + 1}</th>
                        <td>
                          <img
                            style={{ width: "100px", height: "100px" }}
                            src={item?.product_id?.mainimage_url?.url}
                          />
                        </td>
                        <td>{item?.product_id?.name}</td>
                        <td>{item?.variant?.weight}</td>
                        <td>{item?.rating}</td>
                        <td>{item?.comments}</td>
                        <td>{item?.title}</td>
                        <td style={{ fontSize: "22px" }}>
                          {item?.approved ? <FcApproval /> : <FcCancel />}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
export default My_product_reviews;
