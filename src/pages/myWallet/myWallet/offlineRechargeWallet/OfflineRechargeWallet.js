import { useState } from "react"
import { Button, Modal } from "react-bootstrap"

function OfflineRechargeWallet(props) {
  const [rechargeWallet, setRechargeWallet] = useState(false)
  const changeBank = () => {
    setRechargeWallet(true)
  }
  return (

    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Modal heading
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="align-items-center gutters-5 row">
            <div className="col-6 col-md-4">
              <label className="aiz-megabox d-block mb-3">
                <input defaultValue="ICICI Bank" type="radio" name="payment_option" onchange="toggleManualPaymentData(1)" data-id={1} defaultChecked />
                <span className="d-block p-3 aiz-megabox-elem">
                  <img src="https://bucket-name.s3.region.amazonaws.com/uploads/all/qWtVvdVrkexRR41VVaNV6W7yzjMGUVrD3HqfnYNA.png" className="img-fluid mb-2" />
                  <span className="d-block text-center">
                    <span className="d-block fw-600 fs-15">ICICI Bank</span>
                  </span>
                </span>
              </label>
            </div>
            <div className="col-6 col-md-4" onClick={changeBank}>
              <label className="aiz-megabox d-block mb-3">
                <input defaultValue="Cheque Payment" type="radio" name="payment_option" onchange="toggleManualPaymentData(2)" data-id={2} defaultChecked />
                <span className="d-block p-3 aiz-megabox-elem" >
                  <img src="https://bucket-name.s3.region.amazonaws.com/uploads/all/Wnhuad4Xbhfy69Jd8MN8PHGvoGO8hnFcYDs9EnX2.png" className="img-fluid mb-2" />
                  <span className="d-block text-center">
                    <span className="d-block fw-600 fs-15">Cheque Payment</span>
                  </span>
                </span>
              </label>
            </div>
          </div>
          <div id="manual_payment_data">
            <div className="card mb-3 p-3">
              <div id="manual_payment_description">
                <div><p>ICICI Bank Ltd Bank Details<br /></p></div>
                <ul>
                  <li>Bank Name - ICICI Bank Ltd, Account Name - 11223344, Account Number - 101010, Routing Number - 123456</li>
                </ul>
              </div>
            </div>
            <div className="card mb-3 p-3" show={!rechargeWallet}>
              <div id="manual_payment_description">
                <div><p>Cheque Payment&nbsp;<br /></p></div>
              </div>
            </div>

            <div className="card mb-3 p-3">
              <div className="row mt-3">
                <div className="col-md-3">
                  <label>Amount <span className="text-danger">*</span></label>
                </div>
                <div className="col-md-9">
                  <input type="number" lang="en" className="form-control mb-3" min={0} step="0.01" name="amount" placeholder="Amount" required fdprocessedid="bgswjm" />
                </div>
              </div>
              <div className="row">
                <div className="col-md-3">
                  <label>Transaction ID <span className="text-danger">*</span></label>
                </div>
                <div className="col-md-9">
                  <input type="text" className="form-control mb-3" name="trx_id" placeholder="Transaction ID" required fdprocessedid="ghztqk" />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-md-3 col-form-label">Photo</label>
                <div className="col-md-9">
                  <input type="file" name="photo" className="selected-files" />
                  <div className="file-preview box sm">
                  </div>
                </div>
              </div>
            </div>
            <div className="form-group text-right">
              <button type="submit" className="btn btn-sm btn-primary transition-3d-hover mr-1" fdprocessedid="pvfj0n">Confirm</button>
            </div>
          </div>


        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
export default OfflineRechargeWallet