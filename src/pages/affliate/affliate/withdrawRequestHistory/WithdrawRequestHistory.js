import { AiFillDollarCircle, AiOutlinePlus } from "react-icons/ai";
import AffliateWithdrowRequest from "../affliateSystem/affliateWithdrowRequest/AffliateWithdrowRequest";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { base_url } from "../../../../server";

function WithdrawRequestHistory() {
  const [modalShow2, setModalShow2] = useState(false);

  const [data, setData] = useState();
  const baseUrl = base_url();
  const getData = async () => {
    try {
      const res = await axios.get(`${baseUrl}affiliateWithdraw`);
      setData(res.data);
    } catch (error) {
      alert("Faild To load Ticket");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="container">
        <div className="aiz-user-panel">
          <div className="aiz-titlebar mt-2 mb-4">
            <div className="row align-items-center">
              <div className="col-md-6">
                <h1 className="h3-3">Affiliate</h1>
              </div>
            </div>
          </div>
          <div className="row gutters-10">
            <div className="col-md-4 mx-auto mb-3">
              <div className="bg-grad-1 text-white rounded-lg overflow-hidden">
                <span className="size-30px rounded-circle mx-auto bg-soft-primary d-flex align-items-center justify-content-center mt-3">
                  <AiFillDollarCircle className="dollor-icon" />
                </span>
                <div className="px-3 pt-3 pb-3">
                  <div className="h4 fw-700 text-center">ZK30.00</div>
                  <div className="opacity-50 text-center">
                    Affiliate Balance
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 mx-auto mb-3">
              <div
                className="p-3 rounded mb-3 c-pointer text-center bg-white shadow-sm hov-shadow-lg has-transition"
                onClick={() => setModalShow2(true)}
              >
                <span className="size-60px rounded-circle mx-auto bg-secondary d-flex align-items-center justify-content-center mb-3">
                  <AiOutlinePlus className="plus" />
                </span>
                <div className="fs-18 text-primary text-primary-2">
                  Affiliate Withdraw Request
                </div>
              </div>
              <AffliateWithdrowRequest
                show={modalShow2}
                onHide={() => setModalShow2(false)}
              />
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0 h6">Affiliate withdraw request history</h5>
            </div>
            <div className="card-body">
              <table
                className="table aiz-table mb-0 footable footable-1 breakpoint-xl"
                style={{}}
              >
                <thead>
                  <tr className="footable-header">
                    <th style={{ display: "table-cell" }}>#</th>
                    <th style={{ display: "table-cell" }}>Date</th>
                    <th style={{ display: "table-cell" }}>Amount</th>
                    <th data-breakpoints="lg" style={{ display: "table-cell" }}>
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data &&
                    data.map((item, i) => {
                      console.log(item);
                      return (
                        <tr key={i}>
                          <td>{1 + i}</td>
                          <td>{item?.createdAt}</td>
                          <td>{item?.amount}</td>
                          <td>{item?.status ? "Accept" : "Pending"}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
              <div className="aiz-pagination"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default WithdrawRequestHistory;
