import axios from "axios";
import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { base_url } from "../../server";

function CoupensList(props) {
  const token = window.localStorage.getItem("token");
  const [data, setData] = useState(null);
  const baseUrl = base_url();
  const getList = async () => {
    try {
      const res = await axios.get(`${baseUrl}coupons/public`, {
        withCredentials: true,
        headers: {
          "content-type": "application/json; charset=UTF-8",
          authorization: `Bearer ${token}`,
        },
      });
      setData(res.data?.data);
    } catch (error) {}
  };
  useEffect(() => {
    getList();
  }, []);
  const [count, setcount] = useState(null);
  const [count2, setcount2] = useState(null);
  const getCoupen = (i, e) => {
    setcount(i);
    setcount2(e);
  };
  const applyCoupen = () => {
    props.sendCouponFree(count2);
    props.onHide();
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
          Available Coupons
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Coupons</h4>
        <div style={{ height: "300px", overflow: "auto" }}>
          {data &&
            data?.map((item, i) => {
              return (
                <div
                  className={`couponsCard ${i === count && "backColor"}`}
                  onClick={() => {
                    getCoupen(i, item?.code);
                  }}
                  key={i}
                >
                  <img
                    src={
                      item?.icon
                        ? item?.icon?.url
                        : "https://indian-retailer.s3.ap-south-1.amazonaws.com/s3fs-public/2022-10/Coupons.jpg"
                    }
                    width={150}
                    height={150}
                  />
                  <div className="coupenetail">
                    <div style={{ display: "flex", margin: "0 6px" }}>
                      <h6>CODE : {item?.code} </h6>
                      <div>
                        Discount : {item?.discount} ({item?.discount_type})
                      </div>
                    </div>
                    <p className={`${i === count && "colowhit"}`}>
                      Description : {item?.description}
                    </p>
                  </div>
                </div>
              );
            })}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button type="button" className="btn btn-danger" onClick={props.onHide}>
          Close
        </button>
        <button type="button" className="btn btn-success" onClick={applyCoupen}>
          Apply!
        </button>
      </Modal.Footer>
    </Modal>
  );
}
export default CoupensList;
