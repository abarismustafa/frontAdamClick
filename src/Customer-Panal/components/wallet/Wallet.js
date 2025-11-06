import { useState } from "react";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

function Wallet() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  const [show3, setShow3] = useState(false);
  const handleClose3 = () => setShow3(false);
  const handleShow3 = () => setShow3(true);

  return (
    <>
      <div className="aiz-user-panel">
        <div className="aiz-titlebar mt-2 mb-4">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h1 className="h3">My Wallet</h1>
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
                <div className="h4 fw-700 text-center">ZK1,000.00</div>
                <div className="opacity-50 text-center">Wallet Balance</div>
              </div>
            </div>
          </div>
          <div className="col-md-4 mx-auto mb-3">
            <div
              className="p-3 rounded mb-3 c-pointer text-center bg-white shadow-sm hov-shadow-lg has-transition"
              onClick={handleShow}
            >
              <span className="size-60px rounded-circle mx-auto bg-secondary d-flex align-items-center justify-content-center mb-3">
                <i className="las la-plus la-3x text-white" />
              </span>
              <div className="fs-18 text-primary">Recharge Wallet</div>
            </div>
            <Modal className="modle-modle" show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Recharge Wallet</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form
                  className
                  action="https://mmslfashions.in/recharge"
                  method="post"
                >
                  <input
                    type="hidden"
                    name="_token"
                    defaultValue="MoHAlb8S7euhayHMHwtxz1HtQ7lbaDq86q1ffWtT"
                  />{" "}
                  <div className="modal-body gry-bg px-3 pt-3">
                    <div className="row">
                      <div className="col-md-4">
                        <label>
                          Amount <span className="text-danger">*</span>
                        </label>
                      </div>
                      <div className="col-md-8">
                        <input
                          type="number"
                          lang="en"
                          className="form-control mb-3"
                          name="amount"
                          placeholder="Amount"
                          required
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-4">
                        <label>
                          Payment method <span className="text-danger">*</span>
                        </label>
                      </div>
                      <div className="col-md-8">
                        <div className="mb-3">
                          <div className="dropdown ">
                            <select
                              className="form-select"
                              aria-label="Default select example"
                            >
                              <option selected>Open this select menu</option>
                              <option value="1">Lyzico</option>
                              <option value="2">Flutterwave</option>
                              <option value="3">payfast</option>
                            </select>
                            {/* <select
                              className="form-control selectpicker"
                              name="payment_option"
                              
                            >
                              <option value="iyzico">Iyzico</option>
                              <option value="flutterwave">flutterwave</option>
                              <option value="payfast">payfast</option>
                            </select>
                            <button
                              type="button"
                              className="btn dropdown-toggle btn-light"
                              data-toggle="dropdown"
                              role="combobox"
                              aria-owns="bs-select-1"
                              aria-haspopup="listbox"
                              aria-expanded="false"
                              title="Iyzico"
                            >
                              <div className="filter-option">
                                <div className="filter-option-inner">
                                  <div className="filter-option-inner-inner">
                                    Iyzico
                                  </div>
                                </div>{" "}
                              </div>
                            </button> */}
                            {/* <div className="dropdown-menu ">
                              <div className="bs-searchbox">
                                <input
                                  type="search"
                                  className="form-control"
                                  autoComplete="off"
                                  role="combobox"
                                  aria-label="Search"
                                  aria-controls="bs-select-1"
                                  aria-autocomplete="list"
                                />
                              </div>
                              <div
                                className="inner show"
                                role="listbox"
                                id="bs-select-1"
                                tabIndex={-1}
                              >
                                <ul
                                  className="dropdown-menu inner show"
                                  role="presentation"
                                />
                              </div>
                            </div> */}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="form-group text-right">
                      <button
                        type="submit"
                        className="btn btn-sm btn-primary transition-3d-hover mr-1"
                      >
                        Confirm
                      </button>
                    </div>
                  </div>
                </form>
              </Modal.Body>
              <Modal.Footer>
                {/* <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button> */}
              </Modal.Footer>
            </Modal>
          </div>
          <div className="col-md-4 mx-auto mb-3">
            <div
              className="p-3 rounded mb-3 c-pointer text-center bg-white shadow-sm hov-shadow-lg has-transition"
              onClick={handleShow2}
            >
              <span className="size-60px rounded-circle mx-auto bg-secondary d-flex align-items-center justify-content-center mb-3">
                <i className="las la-plus la-3x text-white" />
              </span>
              <div className="fs-18 text-primary">Offline Recharge Wallet</div>
            </div>
          </div>
          <Modal show={show2} onHide={handleClose2}>
            <Modal.Header closeButton>
              <Modal.Title>Offline Recharge Wallet</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {/* <div className="modal-dialog modal-dialog-centered modal-lg" role="document"> */}
              {/* <div className="modal-content"> */}
              {/* <div className="modal-header">
      <h5 className="modal-title" id="exampleModalLabel">Offline Recharge Wallet</h5>
      <button type="button" className="close" data-dismiss="modal" aria-label="Close" fdprocessedid="hpicla" />
    </div> */}
              {/* <div id="offline_wallet_recharge_modal_body"> */}
              <form>
                {/* <input
                  type="hidden"
                  name="_token"
                  defaultValue="lr1GWultzNJ3iyyBICloOOzs6vkzK9V4J4r7oNWw"
                />{" "} */}
                <div className="modal-body gry-bg px-3 pt-3 mx-auto modal-body-2">
                  <div className="align-items-center gutters-5 row">
                    <div className="col-6 col-md-4">
                      <label className="aiz-megabox d-block mb-3">
                        <input
                          defaultValue="ICICI Bank"
                          type="radio"
                          name="payment_option"
                          onchange="toggleManualPaymentData(1)"
                          data-id={1}
                          defaultChecked
                        />
                        <span className="d-block p-3 aiz-megabox-elem">
                          <img
                            src="https://mmslfashions.in/public/uploads/all/qWtVvdVrkexRR41VVaNV6W7yzjMGUVrD3HqfnYNA.png"
                            className="img-fluid mb-2"
                          />
                          <span className="d-block text-center">
                            <span className="d-block fw-600 fs-15">
                              ICICI Bank
                            </span>
                          </span>
                        </span>
                      </label>
                    </div>
                    <div className="col-6 col-md-4">
                      <label className="aiz-megabox d-block mb-3">
                        <input
                          defaultValue="Cheque Payment"
                          type="radio"
                          name="payment_option"
                          onchange="toggleManualPaymentData(2)"
                          data-id={2}
                          defaultChecked
                        />
                        <span className="d-block p-3 aiz-megabox-elem">
                          <img
                            src="https://mmslfashions.in/public/uploads/all/Wnhuad4Xbhfy69Jd8MN8PHGvoGO8hnFcYDs9EnX2.png"
                            className="img-fluid mb-2"
                          />
                          <span className="d-block text-center">
                            <span className="d-block fw-600 fs-15">
                              Cheque Payment
                            </span>
                          </span>
                        </span>
                      </label>
                    </div>
                  </div>
                  <div id="manual_payment_data">
                    <div className="card mb-3 p-3">
                      <div id="manual_payment_description">
                        <div>
                          <p>
                            Cheque Payment&nbsp;
                            <br />
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="card mb-3 p-3">
                      <div className="row mt-3">
                        <div className="col-md-3">
                          <label>
                            Amount <span className="text-danger">*</span>
                          </label>
                        </div>
                        <div className="col-md-9">
                          <input
                            type="number"
                            lang="en"
                            className="form-control mb-3"
                            min={0}
                            step="0.01"
                            name="amount"
                            placeholder="Amount"
                            required
                            fdprocessedid="eb9j0k"
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-3">
                          <label>
                            Transaction ID{" "}
                            <span className="text-danger">*</span>
                          </label>
                        </div>
                        <div className="col-md-9">
                          <input
                            type="text"
                            className="form-control mb-3"
                            name="trx_id"
                            placeholder="Transaction ID"
                            required
                            fdprocessedid="39bxoe"
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-md-3 col-form-label">Photo</label>
                        <div className="col-md-9">
                          <div
                            className="input-group"
                            data-toggle="aizuploader"
                            data-type="image"
                            onClick={handleShow3}
                          >
                            <div className="input-group-prepend">
                              <div className="input-group-text bg-soft-secondary font-weight-medium">
                                Browse
                              </div>
                            </div>
                            <div className="form-control file-amount">
                              Choose image
                            </div>
                            <input
                              type="hidden"
                              name="photo"
                              className="selected-files"
                            />
                          </div>
                          <div className="file-preview box sm"></div>
                        </div>
                      </div>
                    </div>
                    <div className="form-group text-right">
                      <button
                        type="submit"
                        className="btn btn-sm btn-primary transition-3d-hover mr-1"
                        fdprocessedid="vrpybg"
                      >
                        Confirm
                      </button>
                    </div>
                  </div>
                </div>
              </form>
              {/* <div id="manual_payment_info_1" className="d-none">
        <div><p>ICICI Bank Ltd Bank Details<br /></p></div>
        <ul>
          <li>Bank Name - ICICI Bank Ltd, Account Name - 11223344, Account Number - 101010, Routing Number - 123456</li>
        </ul>
      </div> */}
              {/* <div id="manual_payment_info_2" className="d-none">
        <div><p>Cheque Payment&nbsp;<br /></p></div>
      </div> */}
              {/* </div> */}
              {/* </div> */}
              {/* </div> */}
            </Modal.Body>
            <Modal.Footer>
              {/* <Button variant="secondary" onClick={handleClose2}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose2}>
            Save Changes
          </Button> */}
            </Modal.Footer>
          </Modal>

          <Modal
            // className="modal-content-3 "
            // style={{ height: "100%", width: "1500px" }}
            show={show3}
            onHide={handleClose3}
            dialogClassName="modal-90w-w"
            aria-labelledby="example-custom-modal-styling-title"
          >
            <Modal.Header closeButton>
              {/* <Modal.Title id="example-custom-modal-styling-title">
                Modal heading
              </Modal.Title> */}
            </Modal.Header>
            <Modal.Body className="modal-body-2">
              {/* <div className="modal fade show" id="aizUploaderModal" data-backdrop="static" role="dialog" aria-modal="true" style={{zIndex: 1050, display: 'block'}}>
  <div className="modal-dialog modal-adaptive" role="document"> */}
              {/* <div className="modal-content h-100 modal-content-2">
      <div className="modal-header pb-0 bg-light"> */}
              <div className="uppy-modal-nav">
                <ul className="nav nav-tabs border-0">
                  <li className="nav-item">
                    <a
                      className="nav-link active font-weight-medium text-dark"
                      data-toggle="tab"
                      href="#aiz-select-file"
                    >
                      Select File
                    </a>
                  </li>
                  <li className="nav-item">
                    {/* <a
                      className="nav-link font-weight-medium text-dark"
                      data-toggle="tab"
                      href="#aiz-upload-new"
                    >
                      Upload New
                    </a> */}
                    <Form.Group controlId="formFile" className="mb-3">
                      {/* <Form.Label> Upload New</Form.Label> */}
                      <Form.Control type="file" />
                    </Form.Group>
                  </li>
                </ul>
              </div>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                fdprocessedid="i7ga5a"
              >
                <span aria-hidden="true" />
              </button>
              {/* </div> */}
              <div className="modal-body">
                <div className="tab-content h-100">
                  <div className="tab-pane active h-100" id="aiz-select-file">
                    <div className="aiz-uploader-filter pt-1 pb-3 border-bottom mb-4">
                      <div className="row align-items-center gutters-5 gutters-md-10 position-relative">
                        <div className="col-xl-2 col-md-3 col-5">
                          <div className>
                            {/* Input */}
                            <select
                              className="form-control form-control-xs aiz-selectpicker"
                              name="aiz-uploader-sort"
                              fdprocessedid="o94fnp"
                            >
                              <option value="newest" selected>
                                Sort by newest
                              </option>
                              <option value="oldest">Sort by oldest</option>
                              <option value="smallest">Sort by smallest</option>
                              <option value="largest">Sort by largest</option>
                            </select>
                            {/* End Input */}
                          </div>
                        </div>
                        <div className="col-md-3 col-5">
                          <div className="custom-control custom-radio">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              name="aiz-show-selected"
                              id="aiz-show-selected"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="aiz-show-selected"
                            >
                              Selected Only
                            </label>
                          </div>
                        </div>
                        <div className="col-md-4 col-xl-3 ml-auto mr-0 col-2 position-static">
                          <div className="aiz-uploader-search text-right">
                            <input
                              type="text"
                              className="form-control form-control-xs"
                              name="aiz-uploader-search"
                              placeholder="Search your files"
                              fdprocessedid="tt1iu8"
                            />
                            <i className="search-icon d-md-none">
                              <span />
                            </i>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="aiz-uploader-all clearfix c-scrollbar-light">
                      <div
                        className="aiz-file-box-wrap"
                        aria-hidden="false"
                        data-selected="false"
                      >
                        <div className="aiz-file-box">
                          <div
                            className="card card-file aiz-uploader-select"
                            title="Kynoch-Logo-PNG.png"
                            data-value={2}
                          >
                            <div className="card-file-thumb">
                              <img
                                src="//mmslfashions.in/public/uploads/all/hz9Ng3hFHB2oQUvOb5dFqHn8Pfens0vc8ewiYZC7.png"
                                className="img-fit"
                              />
                            </div>
                            <div className="card-body">
                              <h6 className="d-flex">
                                <span className="text-truncate title">
                                  Kynoch-Logo-PNG
                                </span>
                                <span className="ext flex-shrink-0">.png</span>
                              </h6>
                              <p>30 KB</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane h-100" id="aiz-upload-new">
                    <div id="aiz-upload-files" className="h-100">
                      <div
                        className="uppy-Root uppy-Dashboard uppy-Dashboard--animateOpenClose uppy-Dashboard--isInnerWrapVisible"
                        aria-hidden="false"
                        aria-label="File Uploader"
                      >
                        <div className="uppy-Dashboard-overlay" tabIndex={-1} />
                        <div
                          className="uppy-Dashboard-inner"
                          // style={{ width: 750, height: 550 }}
                        >
                          <div className="uppy-Dashboard-innerWrap">
                            <div className="uppy-Dashboard-dropFilesHereHint">
                              Drop your files here
                            </div>
                            <div className="uppy-DashboardAddFiles">
                              <input
                                className="uppy-Dashboard-input"
                                hidden
                                aria-hidden="true"
                                tabIndex={-1}
                                type="file"
                                name="files[]"
                                multiple
                              />
                              <div className="uppy-DashboardTabs">
                                <div className="uppy-Dashboard-dropFilesTitle">
                                  Drop files here, paste or{" "}
                                  <button
                                    type="button"
                                    className="uppy-u-reset uppy-Dashboard-browse"
                                  >
                                    Browse
                                  </button>
                                </div>
                              </div>
                              <div className="uppy-DashboardAddFiles-info" />
                            </div>
                            <span />
                            <span />
                            <span />
                            <div className="uppy-Dashboard-progressindicators">
                              <div
                                className="uppy-StatusBar is-waiting"
                                aria-hidden="true"
                              >
                                <div
                                  className="uppy-StatusBar-progress
                     "
                                  role="progressbar"
                                  aria-valuemin={0}
                                  aria-valuemax={100}
                                  aria-valuenow={0}
                                  style={{ width: "0%" }}
                                />
                                <div className="uppy-StatusBar-actions" />
                              </div>
                              <div
                                className="uppy uppy-Informer"
                                aria-hidden="true"
                              >
                                <p role="alert"> </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="modal-footer justify-content-between bg-light">
                <div className="flex-grow-1 overflow-hidden d-flex">
                  <div className>
                    <div className="aiz-uploader-selected">0 File selected</div>
                    <button
                      type="button"
                      className="btn-link btn btn-sm p-0 aiz-uploader-selected-clear"
                      fdprocessedid="j1e0m"
                    >
                      Clear
                    </button>
                  </div>
                  <div className="mb-0 ml-3">
                    <button
                      type="button"
                      className="btn btn-sm btn-primary mr-3"
                      id="uploader_prev_btn"
                      fdprocessedid="elnjj"
                      disabled="disabled"
                    >
                      Prev
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-primary"
                      id="uploader_next_btn"
                      fdprocessedid="qlbfz9"
                      disabled="disabled"
                    >
                      Next
                    </button>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn btn-sm btn-primary"
                  data-toggle="aizUploaderAddSelected"
                  fdprocessedid="gjlfjc"
                >
                  Add Files
                </button>
              </div> */}
              {/* </div>
    </div> 
   </div>
</div> */}
            </Modal.Body>
            <Modal.Footer className="modal-footer-2">
                {/* <Button variant="secondary" onClick={handleClose3}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose3}>
              Save Changes
            </Button> */}
            <div className="modal-footer justify-content-between bg-light">
                <div className="flex-grow-1 overflow-hidden d-flex">
                  <div className>
                    <div className="aiz-uploader-selected">0 File selected</div>
                    <button
                      type="button"
                      className="btn-link btn btn-sm p-0 aiz-uploader-selected-clear"
                      fdprocessedid="j1e0m"
                    >
                      Clear
                    </button>
                  </div>
                  <div className="mb-0 ml-3">
                    <button
                      type="button"
                      className="btn btn-sm btn-primary mr-3"
                      id="uploader_prev_btn"
                      fdprocessedid="elnjj"
                      disabled="disabled"
                    >
                      Prev
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-primary"
                      id="uploader_next_btn"
                      fdprocessedid="qlbfz9"
                      disabled="disabled"
                    >
                      Next
                    </button>
                  </div>
                </div>
                <div className="button-sectionn">
                <Button
                  type="button"
                  className="btn btn-sm btn-primary"
                  data-toggle="aizUploaderAddSelected"
                  fdprocessedid="gjlfjc"
                >
                  Add Files
                </Button>
                </div>
              </div>
            </Modal.Footer>
          </Modal>
        </div>
        <div className="card">
          <div className="card-header">
            <h5 className="mb-0 h6">Wallet Recharge History</h5>
          </div>
          <div className="card-body">
            <table className="table aiz-table mb-0 aiz-table-2">
              <thead>
                <tr>
                  <th>#</th>
                  <th data-breakpoints="lg">Date</th>
                  <th>Amount</th>
                  <th data-breakpoints="lg">Payment method</th>
                  <th className="text-right">Approval</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>27-01-2023</td>
                  <td>ZK0.00</td>
                  <td>Club Point Convert</td>
                  <td className="text-right">N/A</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>20-12-2022</td>
                  <td>ZK1,000.00</td>
                  <td>Payfast</td>
                  <td className="text-right">N/A</td>
                </tr>
              </tbody>
            </table>
            <div className="aiz-pagination" />
          </div>
        </div>
      </div>
    </>
  );
}
export default Wallet;
