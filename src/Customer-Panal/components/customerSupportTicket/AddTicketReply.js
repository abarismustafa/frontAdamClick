import axios from "axios";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { base_url } from "../../../server";

function AddTicketReply(props) {
  const userid = window.localStorage.getItem("user_id");
  const baseUrl = base_url();
  const [state, setState] = useState({
    subject: "",
    ticket_id: props.idsh,
    reply: "",
  });

  const [file, setFile] = useState(null);

  const photoChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onchange = (e) => {
    const clone = { ...state };
    clone[e.target.name] = e.target.value;
    setState(clone);
  };
  const { t } = useTranslation();
  const token = window.localStorage.getItem("token");
  const sendData = async () => {
    const formData = new FormData();
    console.log(file);
    formData.append("subject", state.subject);
    formData.append("reply", state.reply);
    formData.append("image", file);
    formData.append("ticket_id", state.ticket_id);
    try {
      const res = await axios.post(
        `${baseUrl}ticketList/add_Tickets`,
        formData,
        {
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      props.getData();
      alert("Add Ticket Successfully ");
      props.onHide();
    } catch (error) {}
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
          Ticket Replies
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form
          className
          action="https://mmslfashions.in/support_ticket"
          method="post"
          encType="multipart/form-data"
        >
          <div className="row" style={{ margin: "15px 0" }}>
            <div className="col-md-2">
              <label>Replies</label>
            </div>
            <div className="col-md-10">
              <textarea
                type="text"
                className="form-control mb-3"
                rows={3}
                onChange={onchange}
                name="subject"
                placeholder="Type your reply"
                data-buttons="bold,underline,italic,|,ul,ol,|,paragraph,|,undo,redo"
                required
                defaultValue={""}
              />
            </div>
          </div>

          <div className="row" style={{ margin: "15px 0" }}>
            <div className="col-md-2">
              <label>{t("Image")}</label>
            </div>
            <div className="col-md-10">
              <input
                type="file"
                className="form-control mb-3"
                name="image"
                onChange={photoChange}
              />
            </div>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={sendData}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddTicketReply;
