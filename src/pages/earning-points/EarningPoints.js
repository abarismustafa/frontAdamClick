import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Table } from "react-bootstrap";
import { base_url } from "../../server";
import { useTranslation } from "react-i18next";

function EarningPoints() {
  const userid = window.localStorage.getItem("user_id");
  const [data, setData] = useState();
  const baseUrl = base_url();
  const getData = async () => {
    try {
      const res = await axios.get(`${baseUrl}clubPointsUser/public/${userid}`);
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
        <div className="fisherman-content">
          <h3>{t("My Points")}</h3>
        </div>
        <div className="row ">
          <div className="col-md-12 mb-3">
            <div className="bgGray rounded overflow-hidden">
              <div className="px-3 pt-3 pb-3">
                <div className="h3 fw-700">
                  {data?.Points} {t("Points")} = ₹1.00 {t("Wallet Money")}
                </div>
                <div>{t("Exchange Rate")}</div>
              </div>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="fisherman-content">
              <h3>{t("Point Earning history")}</h3>
            </div>
            <div className="table-responsive">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>{t("Order Code")}</th>
                    <th>{t("Points")}</th>
                    <th>{t("Product Qty")}</th>
                    <th>{t("Type")}</th>
                    <th>{t("Date")}</th>
                    {/* <th>Status</th> */}
                  </tr>
                </thead>
                <tbody>
                  {data &&
                    data?.map((item, i) => {
                      return (
                        <tr key={i}>
                          <td>{i + 1}</td>
                          <td>{item?.order_id?.order_referenceNo}</td>
                          <td>{item?.point}</td>
                          <td>{item?.product_qty}</td>
                          <td>@mdo</td>
                          <td>@mdo</td>
                          {/* <td>@mdo</td> */}
                        </tr>
                      );
                    })}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default EarningPoints;
