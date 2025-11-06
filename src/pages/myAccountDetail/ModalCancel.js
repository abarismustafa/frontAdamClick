import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { base_url } from "../../server";

function ModalCancel(props) {
  console.log(props);

  const userid = window.localStorage.getItem("user_id");
  const token = window.localStorage.getItem("token");
  const [state, setState] = useState({
    orderId: props.val._id,
    reason: "",
    user: userid,
    note: "",
  });

  const changeVal = (e) => {
    const clone = { ...state };
    clone[e.target.name] = e.target.value;
    setState(clone);
  };

  const [reasons, setReasons] = useState(null);
  const baseUrl = base_url();
  const getData = async () => {
    try {
      const res = await axios.get(`${baseUrl}cancelReason`);
      setReasons(res.data);
    } catch (error) {
      alert("Somthing Wend Wrong");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const sendData = async () => {
    try {
      const res = await axios.post(
        `${baseUrl}cancelOrder/addReasonOrder`,
        state,
        {
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(res);
      if (res?.data?.status == 200) {
        props.fechData();
        props.onHide();
        alert("Order Cancel Successfully");
      }


    } catch (error) {
      alert("Please Select reason");
    }
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Cancel Order Number : {props.val.referenceNo}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <select
          name="reason"
          onChange={changeVal}
          style={{ margin: "15px 0" }}
          className="form-select"
          aria-label="Default select example"
        >
          <option selected>Open this select menu</option>
          {reasons &&
            reasons.map((item) => {
              return <option value={item?._id}>{item.reason}</option>;
            })}
        </select>

        <div className="form-floating">
          <textarea
            className="form-control"
            name="note"
            onChange={changeVal}
            placeholder="Leave a comment here"
            id="floatingTextarea"
          ></textarea>
          <label for="floatingTextarea">Comments</label>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={sendData} disabled={!state?.reason || !state?.note}>Send</Button>
      </Modal.Footer>
    </Modal>
  );
}
export default ModalCancel;
