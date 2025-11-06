import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link, Outlet } from 'react-router-dom';

function AffiliateSystemPage() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
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
                        <Link to="affiliate/payment/settings">
                            <div className="p-3 rounded mb-3 c-pointer text-center bg-white shadow-sm hov-shadow-lg has-transition">
                                <span className="size-60px rounded-circle mx-auto bg-secondary d-flex align-items-center justify-content-center mb-3">
                                    <i className="las la-dharmachakra la-3x text-white" />
                                </span>
                                <div className="fs-18 text-primary">Configure Payout</div>
                            </div>
                        </Link>
                    </div>
                    <div className="col-md-4 mx-auto mb-3">

                        <div className="p-3 rounded mb-3 c-pointer text-center bg-white shadow-sm hov-shadow-lg has-transition" onClick={handleShow}>
                            <span className="size-60px rounded-circle mx-auto bg-secondary d-flex align-items-center justify-content-center mb-3">
                                <i className="las la-plus la-3x text-white" />
                            </span>
                            <div className="fs-18 text-primary">Affiliate Withdraw Request</div>
                        </div>
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Affiliate Withdraw Request</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <form className action="https://mmslfashions.in/affiliate/withdraw_request/store" method="post">
                                    <input type="hidden" name="_token" defaultValue="wiqiDFPOhgG0mQsAS47uuUFN30QxZOgXdmt5p2CX" />                    <div className="modal-body gry-bg px-3 pt-3">
                                        <div className="row">
                                            <div className="col-md-3">
                                                <label>Amount <span className="text-danger">*</span></label>
                                            </div>
                                            <div className="col-md-9">
                                                <input type="number" className="form-control mb-3" name="amount" min={1} max={30} placeholder="Amount" required />
                                            </div>
                                        </div>
                                        <div className="form-group text-right">
                                            <button type="submit" className="btn btn-sm btn-primary transition-3d-hover mr-1">Confirm</button>
                                        </div>
                                    </div>
                                </form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>
                                {/* <Button variant="primary" onClick={handleClose}>
                                    Save Changes
                                </Button> */}
                            </Modal.Footer>
                        </Modal>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="card">
                            <div className="form-box-content p-3">
                                <div className="form-group">
                                    <textarea id="referral_code_url" className="form-control" readOnly type="text" defaultValue={"https://mmslfashions.in/users/registration?referral_code=8zJTyXTlTT"} />
                                </div>
                                <button type="button" id="ref-cpurl-btn" className="btn btn-primary float-right" data-attrcpy="Copied" onclick="copyToClipboard('url')" fdprocessedid="mihxeu">Copy Url</button>
                            </div>
                        </div>
                    </div>
                </div>
                <br />
                <div className="card">
                    <form className id="sort_blogs" action method="GET">
                        <div className="card-header row">
                            <div className="col text-center text-md-left">
                                <h5 className="mb-md-0 h6">Affiliate Stats</h5>
                            </div>
                            <div className="col-md-5 col-xl-4">
                                <div className="input-group mb-0">
                                    <div className="dropdown bootstrap-select form-control aiz- dropup"><select className="form-control aiz-selectpicker" name="type" data-live-search="true" tabIndex={-98}>
                                        <option value>Choose</option>
                                        <option value="Today">Today</option>
                                        <option value={7}>Last 7 Days</option>
                                        <option value={30}>Last 30 Days</option>
                                    </select><button type="button" className="btn dropdown-toggle btn-light" data-toggle="dropdown" role="combobox" aria-owns="bs-select-1" aria-haspopup="listbox" aria-expanded="false" title="Choose" fdprocessedid="e0pdb"><div className="filter-option"><div className="filter-option-inner"><div className="filter-option-inner-inner">Choose</div></div> </div></button><div className="dropdown-menu " style={{ overflow: 'hidden' }}><div className="bs-searchbox"><input type="search" className="form-control" autoComplete="off" role="combobox" aria-label="Search" aria-controls="bs-select-1" aria-autocomplete="list" aria-activedescendant="bs-select-1-0" /></div><div className="inner show" role="listbox" id="bs-select-1" tabIndex={-1} style={{ overflowY: 'auto' }}><ul className="dropdown-menu inner show" role="presentation" style={{ marginTop: 0, marginBottom: 0 }}><li className="selected active"><a role="option" className="dropdown-item active selected" id="bs-select-1-0" tabIndex={0} aria-setsize={4} aria-posinset={1} aria-selected="true"><span className="text">Choose</span></a></li><li><a role="option" className="dropdown-item" id="bs-select-1-1" tabIndex={0}><span className="text">Today</span></a></li><li><a role="option" className="dropdown-item" id="bs-select-1-2" tabIndex={0}><span className="text">Last 7 Days</span></a></li><li><a role="option" className="dropdown-item" id="bs-select-1-3" tabIndex={0}><span className="text">Last 30 Days</span></a></li></ul></div></div></div>
                                    <button className="btn btn-primary input-group-append" type="submit" fdprocessedid="hqtw6k">Filter</button>
                                </div>
                            </div>
                        </div>
                    </form>
                    <div className="card-body">
                        <div className="row gutters-10">
                            <div className="col-md-3 mx-auto mb-3">
                                <a href="#">
                                    <div className="p-3 rounded mb-3 c-pointer text-center bg-white shadow-sm hov-shadow-lg has-transition">
                                        <span className="size-60px rounded-circle mx-auto bg-secondary d-flex align-items-center justify-content-center mb-3">
                                            <span className="la-3x text-white">
                                                1
                                            </span>
                                        </span>
                                        <div className="fs-18 text-primary">No of click</div>
                                    </div>
                                </a>
                            </div>
                            <div className="col-md-3 mx-auto mb-3">
                                <a href="#">
                                    <div className="p-3 rounded mb-3 c-pointer text-center bg-white shadow-sm hov-shadow-lg has-transition">
                                        <span className="size-60px rounded-circle mx-auto bg-secondary d-flex align-items-center justify-content-center mb-3">
                                            <span className="la-3x text-white">
                                                0
                                            </span>
                                        </span>
                                        <div className="fs-18 text-primary">No of item</div>
                                    </div>
                                </a>
                            </div>
                            <div className="col-md-3 mx-auto mb-3">
                                <a href="#">
                                    <div className="p-3 rounded mb-3 c-pointer text-center bg-white shadow-sm hov-shadow-lg has-transition">
                                        <span className="size-60px rounded-circle mx-auto bg-secondary d-flex align-items-center justify-content-center mb-3">
                                            <span className="la-3x text-white">
                                                0
                                            </span>
                                        </span>
                                        <div className="fs-18 text-primary">No of deliverd</div>
                                    </div>
                                </a>
                            </div>
                            <div className="col-md-3 mx-auto mb-3">
                                <a href="#">
                                    <div className="p-3 rounded mb-3 c-pointer text-center bg-white shadow-sm hov-shadow-lg has-transition">
                                        <span className="size-60px rounded-circle mx-auto bg-secondary d-flex align-items-center justify-content-center mb-3">
                                            <span className="la-3x text-white">
                                                0
                                            </span>
                                        </span>
                                        <div className="fs-18 text-primary">No of cancel</div>
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
                                    <th style={{ display: 'table-cell' }}>#</th><th style={{ display: 'table-cell' }}>Referral User</th><th style={{ display: 'table-cell' }}>Amount</th><th data-breakpoints="lg" style={{ display: 'table-cell' }}>Order Id</th><th data-breakpoints="lg" style={{ display: 'table-cell' }}>Referral Type</th><th data-breakpoints="lg" style={{ display: 'table-cell' }}>Product</th><th data-breakpoints="lg" style={{ display: 'table-cell' }}>Date</th></tr></thead>
                            <tbody>
                                <tr className="footable-empty"><td colSpan={7}>Nothing found</td></tr></tbody>
                        </table>
                        <div className="aiz-pagination">
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default AffiliateSystemPage;