import axios from "axios";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { base_url } from "../../../server";

function DetailPage(props) {
  const token = window.localStorage.getItem("token");
  const [data, setData] = useState(null);
  const baseUrl = base_url();
  const getData = async () => {
    try {
      const res = await axios.get(`${baseUrl}ticketList/ticket/${props.id}`, {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${token}`,
        },
      });
      setData(res.data);
    } catch (error) {}
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Ticket Detail
          <Button
            style={{ margin: "0 10px" }}
            variant="info"
            onClick={() => {
              props.manageOpen();
            }}
          >
            Ticket Add
          </Button>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="innTick">
          <h4>Subject : {data?.getaTicket?.subject}</h4>
          <p>{data?.getaTicket?.details}</p>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>Date : {data?.getaTicket?.createdAt}</div>
            <div>Status : {data?.getaTicket?.status}</div>
          </div>
        </div>
        {data?.ticketList &&
          data?.ticketList?.map((item, i) => {
            return (
              <div key={i} style={{ margin: "10px 0" }} className="innTick">
                {item?.user_id == null ? (
                  <h5>
                    Replies by{" "}
                    {item?.staff_id?.firstname + " " + item?.staff_id?.lastname}
                  </h5>
                ) : (
                  <h5>
                    Replies by{" "}
                    {item?.user_id?.firstname + " " + item?.user_id?.lastname}
                  </h5>
                )}
                <p>{item?.subject}</p>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div>Date : {item?.createdAt}</div>
                  <div>Status : {item?.status}</div>
                </div>
              </div>
            );
          })}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
export default DetailPage;
