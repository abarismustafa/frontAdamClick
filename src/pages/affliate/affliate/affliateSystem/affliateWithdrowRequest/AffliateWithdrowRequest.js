import { Button, Modal } from "react-bootstrap"

function AffliateWithdrowRequest(props) {
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
            Affiliate Withdraw Request
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-3">
              <label>Amount <span className="text-danger">*</span></label>
            </div>
            <div className="col-md-9">
              <input type="number" className="form-control mb-3" name="amount" min={1} max={30} placeholder="Amount" required />
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
export default AffliateWithdrowRequest