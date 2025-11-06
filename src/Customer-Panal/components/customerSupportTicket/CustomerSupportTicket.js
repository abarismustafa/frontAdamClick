import axios from "axios";
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { GrAddCircle } from "react-icons/gr";
import TicketCartList from "./TicketCartList";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { base_url } from "../../../server";

function CustomerSupportTicket() {
  const [show, setShow] = useState(false);
  const userid = window.localStorage.getItem("user_id");

  const handleShow = () => setShow(true);
  const token = window.localStorage.getItem("token");
  const [state, setState] = useState({
    subject: "",
    user_id: userid,
    details: "",
    priority: "low",
    department: "sale",
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

  const handleClose = () => {
    setShow(false);
  };

  const baseUrl = base_url();

  const [data, setData] = useState();

  const getData = async () => {
    try {
      const res = await axios.get(`${baseUrl}ticketList/user`, {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${token}`,
        },
      });
      setData(res.data);
    } catch (error) {
      alert("Faild To load Ticket");
    }
  };

  const sendData = async () => {
    const formData = new FormData();

    formData.append("subject", state.subject);
    formData.append("details", state.details);
    formData.append("user_id", state.user_id);
    formData.append("status", "Pending");
    formData.append("image", file);
    formData.append("priority", state.priority);
    formData.append("department", state.department);
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
      alert("Add Ticket Successfully ");
      getData();
      handleClose();
    } catch (error) {
      alert("Add Ticket Fail");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const deleteData = async (id) => {
    try {
      const res = await axios.delete(
        `${baseUrl}ticketList/delete_Tickets/${id}`,
        {
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Ticket Delete Successfully");
      getData();
    } catch (error) {
      alert("Ticket Not Delete");
    }
  };
  const { t } = useTranslation();
  return (
    <>
      <section className="sectionPD">
        <div className="container">
          <div className="fisherman-content">
            <h3>{t("Support Ticket")}</h3>
          </div>

          <div className="row">
            <div className="col-lg-6 mb-3">
              <div
                className="p-3 rounded mb-3 c-pointer text-center bgGray shadow-sm hov-shadow-lg has-transition"
                data-toggle="modal"
                data-target="#ticket_modal"
                onClick={handleShow}
              >
                <div
                  style={{
                    width: "60px",
                    height: "60px",
                    margin: "auto",
                    fontSize: "40px",
                  }}
                >
                  <GrAddCircle />
                </div>
                <div className="fs-20 text-primary">{t("Create a Ticket")}</div>
              </div>

              <Modal
                show={show}
                onHide={handleClose}
                dialogClassName="modal-wrapper"
                className="tiketMa"
              >
                <Modal.Header closeButton>
                  <Modal.Title>{t("Create a Ticket")}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="modal-body px-3 pt-3">
                    <form
                      className
                      action="https://mmslfashions.in/support_ticket"
                      method="post"
                      encType="multipart/form-data"
                    >
                      <div className="row" style={{ margin: "15px 0" }}>
                        <div className="col-md-2">
                          <label>{t("Subject")}</label>
                        </div>
                        <div className="col-md-10">
                          <input
                            type="text"
                            onChange={onchange}
                            className="form-control mb-3"
                            placeholder={t("Subject")}
                            name="subject"
                            required
                          />
                        </div>
                      </div>

                      <div className="row" style={{ margin: "15px 0" }}>
                        <div className="col-md-2">
                          <label>{t("Priority")}</label>
                        </div>
                        <div className="col-md-10">
                          <select
                            className="form-select"
                            onChange={onchange}
                            name="priority"
                            aria-label="Default select example"
                          >
                            <option value="low">Low</option>
                            <option value="high">Higth</option>
                            <option value="urgent">Urgent</option>
                            <option value="top_urgent">Top Urgent</option>
                          </select>
                        </div>
                      </div>

                      <div className="row" style={{ margin: "15px 0" }}>
                        <div className="col-md-2">
                          <label>{t("Department")}</label>
                        </div>
                        <div className="col-md-10">
                          <select
                            className="form-select"
                            onChange={onchange}
                            name="department"
                            aria-label="Default select example"
                          >
                            <option value="sale">Sale</option>
                            <option value="purchase">Purchase</option>
                          </select>
                        </div>
                      </div>

                      <div className="row" style={{ margin: "15px 0" }}>
                        <div className="col-md-2">
                          <label>{t("Provide a detailed description")}</label>
                        </div>
                        <div className="col-md-10">
                          <textarea
                            type="text"
                            className="form-control mb-3"
                            rows={3}
                            onChange={onchange}
                            name="details"
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
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={sendData}>
                    Submit
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>

          <TicketCartList
            deleteData={deleteData}
            data={data}
            t={t}
            getData={getData}
          />
        </div>
      </section>
    </>
  );
}
export default CustomerSupportTicket;
