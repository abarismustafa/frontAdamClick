import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Table } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useSendRmaMutation } from "../../components/products/productSlice";
import { base_url } from "../../server";

function ReturnsModal(props) {
  const userid = window.localStorage.getItem("user_id");
  const [reasopns, setReasons] = useState();
  const baseUrl = base_url();
  const getReasons = async () => {
    try {
      const res = await axios.get(`${baseUrl}rmaReason`);
      setReasons(res.data);
    } catch (error) {}
  };

  useEffect(() => {
    getReasons();
  }, []);
  const [state, setState] = useState({
    orderId: props.param,
    product_id: props.data[0]?.products[props.index]?.productId.uid,
    variant_id: props.item.variant,
    resolution_type: "",
    // userid: userid,
    reason: "",
    pickupTime: "",
    returnPickupAddress: props.data[0]?.shippingAddress_save
      ? props.data[0]?.shippingAddress_save
      : props.data[0]?.shipping,
  });

  const changeHandle = (e) => {
    const clone = { ...state };
    clone[e.target.name] = e.target.value;
    setState(clone);
  };

  const [sendValue, { isSuccess, isError, isLoading }] = useSendRmaMutation();
  const sendData = () => {
    sendValue({ data: state, token: window.localStorage.getItem("token") });
  };

  useEffect(() => {
    if (isSuccess) {
      alert("Request RMA Post Successfully !");
      props.onHide();
    }
    if (isError) {
      alert(`Request RMA Post Faild  Order must be Delivery`);
    }
  }, [isSuccess, isError]);
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Request New RMA{" "}
          <span style={{ fontSize: "18px" }}>
            (Return Merchandise Authorization)
          </span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {isLoading && (
          <div className="preloaderCount">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
        <h5>Item Ordered *</h5>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Product Name</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Reason</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>{props.item?.productId?.name}</td>
              <td>{props.item?.qty}</td>
              <td>{props?.item?.total}</td>
              <td>
                <select
                  name="reason"
                  onChange={changeHandle}
                  className="form-select"
                  aria-label="Default select example"
                >
                  <option selected>Select Reason</option>
                  {reasopns &&
                    reasopns.map((item) => {
                      return <option value={item._id}>{item?.name}</option>;
                    })}
                </select>
              </td>
            </tr>
          </tbody>
        </Table>

        <form>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Product Delivery Status
            </label>
            <select
              disabled
              className="form-select"
              aria-label="Default select example"
            >
              <option disabled selected>
                {props.data[0]?.status[0].orderStatusName}
              </option>
              <option value="1">Pending</option>
              <option value="2">Deliverd</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Resolution Type
            </label>
            <select
              className="form-select"
              name="resolution_type"
              onChange={changeHandle}
              aria-label="Default select example"
            >
              <option selected>Select Resolution</option>
              <option value="Refund">Refund</option>
              <option value="Return">Return</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Return Pickup Time
            </label>
            <select
              name="pickupTime"
              onChange={changeHandle}
              className="form-select"
              aria-label="Default select example"
            >
              <option selected>Select Time</option>
              <option value="Morning">Morning</option>
              <option value="After_noon">After noon</option>
              <option value="Evening">Evening</option>
              <option value="night">night</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Return Pickup Address
            </label>
            <div className="form-floating">
              <textarea
                className="form-control"
                disabled
                placeholder="Leave a comment here"
                id="floatingTextarea"
                value="Pickup Boy Go on Shipping Address"
              ></textarea>
              {/* <label htmlFor="floatingTextarea">Full Address *</label> */}
            </div>
          </div>

          <button type="button" className="btn btn-primary" onClick={sendData}>
            Submit
          </button>
        </form>
      </Modal.Body>
      {/* <Modal.Footer>
            <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer> */}
    </Modal>
  );
}
export default ReturnsModal;
