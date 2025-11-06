import { AiOutlinePlus } from "react-icons/ai"
import { FaDharmachakra } from "react-icons/fa"
import { Link } from "react-router-dom"
import AffiliatePayment from "./affliatePayment/AffliatePayment";
import { useEffect, useState } from "react";
// import OfflineRechargeWallet from "../../myWallet/offlineRechargeWallet/OfflineRechargeWallet";
import AffliateWithdrowRequest from "./affliateWithdrowRequest/AffliateWithdrowRequest";
import axios from "axios";

function AffliateSystem(props) {
    const [modalShow2, setModalShow2] = useState(false);

   

    return (
        <>
            <div className="container">
                <div className="aiz-user-panel">
                    <div className="aiz-titlebar mt-2 mb-4">
                        <div className="row align-items-center">
                            <div className="col-md-6">
                                <h1 className="h3">Affiliate</h1>
                            </div>
                        </div>
                    </div>
                    <div className="row gutters-10">
                        <div className="col-md-4 mx-auto mb-3">
                            <div className="bg-grad-1 text-white rounded-lg overflow-hidden">
                                <span className="size-30px rounded-circle mx-auto bg-soft-primary d-flex align-items-center justify-content-center mt-3">
                                    <i className="las la-dollar-sign la-2x text-white" />
                                </span>
                                <div className="px-3 pt-3 pb-3">
                                    <div className="h4 fw-700 text-center">ZK30.00</div>
                                    <div className="opacity-50 text-center">Affiliate Balance</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 mx-auto mb-3">
                            <Link to="/affiliate/payment" className="with-def">
                                <div className="p-3 rounded mb-3 c-pointer text-center bg-white shadow-sm hov-shadow-lg has-transition">
                                    <span className="size-60px size-60px-2 rounded-circle mx-auto bg-secondary d-flex align-items-center justify-content-center mb-3">
                                        <FaDharmachakra className="las la-plus la-3x text-white plus" />
                                    </span>
                                    <div className="fs-18 text-primary text-primary-2">Configure Payout</div>
                                </div>
                            </Link>
                        </div>
                        <div className="col-md-4 mx-auto mb-3">
                            <div className="p-3 rounded mb-3 c-pointer text-center bg-white shadow-sm hov-shadow-lg has-transition" onClick={() => setModalShow2(true)}>
                                <span className="size-60px rounded-circle mx-auto bg-secondary d-flex align-items-center justify-content-center mb-3">
                                    <AiOutlinePlus className="plus" />
                                </span>
                                <div className="fs-18 text-primary text-primary-2">Affiliate Withdraw Request</div>
                            </div>
                            <AffliateWithdrowRequest
                                show={modalShow2}
                                onHide={() => setModalShow2(false)}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="card">
                                <div className="form-box-content p-3">
                                    <div className="form-group">
                                        <textarea id="referral_code_url" className="form-control" readOnly type="text" />
                                    </div>
                                    <button type="button" id="ref-cpurl-btn" className="btn btn-primary float-right" data-attrcpy="Copied" onclick="copyToClipboard('url')" fdprocessedid="3obvf">Copy Url</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br />
                    <div className="card">
                        <form className id="sort_blogs" action method="GET">
                            <div className="card-header row">
                                <div className="col  text-md-left">
                                    <h5 className="mb-md-0 h6">Affiliate Status</h5>
                                </div>
                                <div className="col-md-5 col-xl-4">
                                    <div className="input-group mb-0">
                                        <select className="form-select" aria-label="Default select example">
                                            <option selected>Open this select menu</option>
                                            <option value="1">Choose</option>
                                            <option value="2">Today</option>
                                            <option value="3">Last 7 Days</option>
                                            <option value="3">Last 30 Days</option>
                                        </select>

                                        <button className="btn btn-primary input-group-append float-right-2" style={{ opacity: "1" }} type="submit" fdprocessedid="tuuixq">Filter</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                        <div className="card-body">
                            <div className="row gutters-10">
                                <div className="col-md-3 mx-auto mb-3">
                                    <a href="#" className="with-def">
                                        <div className="p-3 rounded mb-3 c-pointer text-center bg-white shadow-sm hov-shadow-lg has-transition">
                                            <span className="size-60px rounded-circle mx-auto bg-secondary d-flex align-items-center justify-content-center mb-3">
                                                <span className="la-3x text-white">
                                                    2
                                                </span>
                                            </span>
                                            <div className="fs-18 text-primary text-primary-2">No of click</div>
                                        </div>
                                    </a>
                                </div>
                                <div className="col-md-3 mx-auto mb-3">
                                    <a href="#" className="with-def">
                                        <div className="p-3 rounded mb-3 c-pointer text-center bg-white shadow-sm hov-shadow-lg has-transition">
                                            <span className="size-60px rounded-circle mx-auto bg-secondary d-flex align-items-center justify-content-center mb-3">
                                                <span className="la-3x text-white">
                                                    0
                                                </span>
                                            </span>
                                            <div className="fs-18 text-primary text-primary-2">No of item</div>
                                        </div>
                                    </a>
                                </div>
                                <div className="col-md-3 mx-auto mb-3">
                                    <a href="#" className="with-def">
                                        <div className="p-3 rounded mb-3 c-pointer text-center bg-white shadow-sm hov-shadow-lg has-transition">
                                            <span className="size-60px rounded-circle mx-auto bg-secondary d-flex align-items-center justify-content-center mb-3">
                                                <span className="la-3x text-white">
                                                    0
                                                </span>
                                            </span>
                                            <div className="fs-18 text-primary text-primary-2">No of deliverd</div>
                                        </div>
                                    </a>
                                </div>
                                <div className="col-md-3 mx-auto mb-3">
                                    <a href="#" className="with-def">
                                        <div className="p-3 rounded mb-3 c-pointer text-center bg-white shadow-sm hov-shadow-lg has-transition">
                                            <span className="size-60px rounded-circle mx-auto bg-secondary d-flex align-items-center justify-content-center mb-3">
                                                <span className="la-3x text-white">
                                                    0
                                                </span>
                                            </span>
                                            <div className="fs-18 text-primary text-primary-2">No of cancel</div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-header">
                            <h5 className="mb-0 h6">Affiliate Earning History</h5>
                        </div>
                        <div className="card-body">
                            <table className="table aiz-table mb-0 footable footable-1 breakpoint-xl" style={{}}>
                                <thead>
                                    <tr className="footable-header">
                                        <th style={{ display: 'table-cell' }}>#</th>
                                        <th style={{ display: 'table-cell' }}>Referral User</th>
                                        <th style={{ display: 'table-cell' }}>Amount</th>
                                        <th data-breakpoints="lg" style={{ display: 'table-cell' }}>Order Id</th>
                                        <th data-breakpoints="lg" style={{ display: 'table-cell' }}>Referral Type</th>
                                        <th data-breakpoints="lg" style={{ display: 'table-cell' }}>Product</th>
                                        <th data-breakpoints="lg" style={{ display: 'table-cell' }}>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* {data && data} */}
                                </tbody>
                            </table>
                            <div className="aiz-pagination">
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
export default AffliateSystem