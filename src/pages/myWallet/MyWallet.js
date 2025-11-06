import RecahgeWallet from "./myWallet/rechargeWallet/RechargeWallet";
import { Link } from "react-router-dom";
import { useState } from "react";
import OfflineRechargeWallet from "./myWallet/offlineRechargeWallet/OfflineRechargeWallet";
import { AiFillDollarCircle, AiOutlinePlus } from "react-icons/ai";
import { useTranslation } from "react-i18next";

function MyWallets(props) {
  const [modalShow, setModalShow] = useState(false);
  
    const { t, i18n } = useTranslation();
  return (
    <>

    <section className="sectionPD">
        <div className="container">
          <div className="aiz-user-panel">
            <div className="fisherman-content">
              <h3>{t("My Wallet")}</h3>
            </div>
            <div className="row gutters-10">
              <div className="col-md-4 mx-auto mb-3">
                <div className="bg-grad-1 text-white rounded-lg overflow-hidden">
                  <span className="size-30px rounded-circle mx-auto bg-soft-primary d-flex align-items-center justify-content-center mt-3">
                    <AiFillDollarCircle className="dollor-icon" />
                  </span>

                  <div className="px-3 pt-3 pb-3">
                    <div className="h4 fw-700 text-center">ZK1,000.00</div>
                    <div className="opacity-50 text-center">{t("Wallet Balance")}</div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mx-auto mb-3">
                <div
                  className="p-3 rounded mb-3 c-pointer text-center bg-white shadow-sm hov-shadow-lg has-transition"
                  onclick="show_wallet_modal()"
                >
                  <span
                    className="size-60px rounded-circle mx-auto bg-secondary d-flex align-items-center justify-content-center mb-3"
                    onClick={() => setModalShow(true)}
                  >
                    <AiOutlinePlus className="plus" />
                  </span>
                  <RecahgeWallet
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                  />
                  <div className="fs-18 text-primary text-primary-2">
                    {t("Recharge Wallet")}
                  </div>
                </div>
              </div>
              <div className="col-md-4 mx-auto mb-3">
                <div
                  className="p-3 rounded mb-3 c-pointer text-center bg-white shadow-sm hov-shadow-lg has-transition"
                  onClick={() => setModalShow(true)}
                >
                  <span className="size-60px rounded-circle mx-auto bg-secondary d-flex align-items-center justify-content-center mb-3">
                    <AiOutlinePlus className="plus" />
                  </span>

                  <div className="fs-18 text-primary text-primary-2">
                    {t("Offline Recharge Wallet")}
                  </div>
                </div>
                <OfflineRechargeWallet
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                />
              </div>
            </div>
            <div className="fisherman-content mt-3">
              <h3>{t("Wallet Recharge History")}</h3>
            </div>
            <div className="table-responsive">
              <table className="table aiz-table mb-0 footable footable-1 breakpoint-xl">
                <thead>
                  <tr className="footable-header">
                    <th
                      className="footable-first-visible"
                      style={{ display: "table-cell" }}
                    >
                      #
                    </th>
                    <th data-breakpoints="lg" style={{ display: "table-cell" }}>
                      {t("Date")}
                    </th>
                    <th style={{ display: "table-cell" }}>Amount</th>
                    <th data-breakpoints="lg" style={{ display: "table-cell" }}>
                      {t("Payment method")}
                    </th>
                    <th
                      className="text-right footable-last-visible"
                      style={{ display: "table-cell" }}
                    >
                      {t("Approval")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td
                      className="footable-first-visible"
                      style={{ display: "table-cell" }}
                    >
                      1
                    </td>
                    <td style={{ display: "table-cell" }}>27-01-2023</td>
                    <td style={{ display: "table-cell" }}>ZK0.00</td>
                    <td style={{ display: "table-cell" }}>
                      {t("Club Point Convert")}
                    </td>
                    <td
                      className="text-right footable-last-visible"
                      style={{ display: "table-cell" }}
                    >
                      N/A
                    </td>
                  </tr>
                  <tr>
                    <td
                      className="footable-first-visible"
                      style={{ display: "table-cell" }}
                    >
                      2
                    </td>
                    <td style={{ display: "table-cell" }}>20-12-2022</td>
                    <td style={{ display: "table-cell" }}>ZK1,000.00</td>
                    <td style={{ display: "table-cell" }}>Payfast</td>
                    <td
                      className="text-right footable-last-visible"
                      style={{ display: "table-cell" }}
                    >
                      N/A
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="aiz-pagination"></div>
            </div>
          </div>
        </div>
      </section>

      {/* <section className="wallet-section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <h1 className="text-center">My Wallet</h1>
                        </div>
                        <div className="col-lg-4">
                            <div className="wallet">
                                <div className="bg-grad-3 text-white rounded-lg mb-4 overflow-hidden bg-grad-3-4">
                                    <div className="px-3 pt-3">
                                        <div className=" text-center">
                                            <span className="fs-12 d-block fs-12-2 pt-4"  >
                                                ZK1,000,00
                                            </span>
                                        </div>
                                        <div className="h3 fw-700 mb-3 text-center">
                                            Wallet Blance
                                        </div>
                                    </div>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                                        <path fill="rgba(255,255,255,0.3)" fill-opacity="1" d="M0,128L34.3,112C68.6,96,137,64,206,96C274.3,128,343,224,411,250.7C480,277,549,235,617,213.3C685.7,192,754,192,823,181.3C891.4,171,960,149,1029,117.3C1097.1,85,1166,43,1234,58.7C1302.9,75,1371,149,1406,186.7L1440,224L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z">
                                        </path>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="wallet">
                                <div className="bg-grad-3 text-white rounded-lg mb-4 overflow-hidden bg-grad-3-4">
                                    <div className="px-3 pt-3">
                                        <div className=" text-center">
                                            <div className="icon">
                                                <Link to="#" className="icon-icon" onClick={() => setModalShow(true)}>
                                                    <TbRecharging className="icon-recharge" />
                                                </Link>
                                                <RecahgeWallet
                                                show={modalShow}
                                                onHide={() => setModalShow(false)}
                                                />
                                            </div>
                                        </div>
                                        <div className="h3 fw-700 mb-3 text-center">
                                            Recharge Wallet
                                        </div>
                                    </div>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                                        <path fill="rgba(255,255,255,0.3)" fill-opacity="1" d="M0,128L34.3,112C68.6,96,137,64,206,96C274.3,128,343,224,411,250.7C480,277,549,235,617,213.3C685.7,192,754,192,823,181.3C891.4,171,960,149,1029,117.3C1097.1,85,1166,43,1234,58.7C1302.9,75,1371,149,1406,186.7L1440,224L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z">
                                        </path>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="wallet">
                                <div className="bg-grad-3 text-white rounded-lg mb-4 overflow-hidden bg-grad-3-4">
                                    <div className="px-3 pt-3">
                                        <div className=" text-center">
                                            <div className="icon">
                                            <Link to="#" className="icon-icon" onClick={() => setModalShow(true)}>
                                                    <TbRecharging className="icon-recharge" />
                                                </Link>
                                                <OfflineRechargeWallet
                                                show={modalShow}
                                                onHide={() => setModalShow(false)}
                                                />
                                            </div>
                                        </div>
                                        <div className="h3 fw-700 mb-3 text-center">
                                            Offline  Recharge Wallet
                                        </div>
                                    </div>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                                        <path fill="rgba(255,255,255,0.3)" fill-opacity="1" d="M0,128L34.3,112C68.6,96,137,64,206,96C274.3,128,343,224,411,250.7C480,277,549,235,617,213.3C685.7,192,754,192,823,181.3C891.4,171,960,149,1029,117.3C1097.1,85,1166,43,1234,58.7C1302.9,75,1371,149,1406,186.7L1440,224L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z">
                                        </path>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div classname="history">
                        <h2 className="text-center">Wallet Recharge History</h2>
                        <table className="table table-success-2">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Amount</th>
                                    <th scope="col">Payment Methord</th>
                                    <th scope="col">Approval</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                    <td>@mdo</td>
                                </tr>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                    <td>@mdo</td>
                                </tr>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                    <td>@mdo</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>

            </section> */}
      
    </>
  );
}
export default MyWallets;
