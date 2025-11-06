import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { base_url } from "../../server";
import { useTranslation } from "react-i18next";

function RmaHistory() {
  const userid = window.localStorage.getItem("user_id");
  const [data, setData] = useState();
  const baseUrl = base_url();
  const getData = async () => {
    try {
      const res = await axios.get(`${baseUrl}rma/user`, {
        headers: {
          "content-type": "application/json; charset=UTF-8",
          authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      });
      setData(res.data);
    } catch (error) {
      alert("Server Error Failed To load Data");
    }
  };

  useEffect(() => {
    getData();
  }, []);
  
    const { t, i18n } = useTranslation();

  return (
    <section className="sectionPD">
      <div className="container">
        <div className="aiz-user-panel">
          <div className="fisherman-content">
            <h3>{t("Rma History")}</h3>
          </div>

          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">{t("Date")}</th>
                  <th scope="col">{t("Product Name")}</th>
                  {/* <th scope="col">Image</th> */}
                  <th scope="col">{t("Weight")}</th>
                  <th scope="col">{t("Reason")}</th>
                  <th scope="col">{t("Order Id")}</th>
                  <th scope="col">{t("Resulution Type")}</th>
                  <th scope="col">{t("Rma Status")}</th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.map((item, i) => {
                    return (
                      <tr key={item._id}>
                        <th scope="row">{1 + i}</th>
                        <td>{item?.createdAt}</td>
                        <td>{item?.product_id?.name}</td>
                        {/* <td>
                                    <img src={item?.product_id?.mainimage_url?.url} />
                                </td> */}
                        <td>{item?.variant_id?.weight}</td>
                        <td>{item?.reason[0].name}</td>
                        <td>{item?.orderId}</td>
                        <td>{item?.resulution_type}</td>
                        <td>{item?.status}</td>
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
export default RmaHistory;
