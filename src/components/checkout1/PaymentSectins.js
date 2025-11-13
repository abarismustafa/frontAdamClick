import { Link } from "react-router-dom";
import CardModal from "./CardModal";
import SelectOptions from "./SelectOptions";
import { useEffect, useState } from "react";

import { Button } from "react-bootstrap";
import axios from "axios";
import { base_url } from "../../server";

function PaymentSectins() {
  const [modalShow, setModalShow] = useState(false);

  const [payCards, setPaycards] = useState({
    paywithCart: false,
    netbank: false,
    upi: false,
  });
  const chengePayment = (str) => {
    // const obj = { ...payCards }
    // obj[str] = !obj[str]

    if (str === "paywithCart") {
      const obj = { paywithCart: true, netbank: false, upi: false };
      setPaycards(obj);
    }
    if (str === "netbank") {
      const obj = { paywithCart: false, netbank: true, upi: false };
      setPaycards(obj);
    }
    if (str === "upi") {
      const obj = { paywithCart: false, netbank: false, upi: true };
      setPaycards(obj);
    }
  };

  const [data1, setData1] = useState();
  const baseUrl = base_url();
  const getPayments1 = async () => {
    try {
      const res = await axios.get(`${baseUrl}africanConfig/available`);
      setData1(res.data);
    } catch (error) { }
  };

  useEffect(() => {
    // getPayments1()
  }, []);

  return (
    <div className="payRadio">
      <div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault1"
          />
          <label
            className="form-check-label"
            htmlFor="flexRadioDefault1"
            onClick={() => {
              chengePayment("paywithCart");
            }}
          >
            Pay with Debit/Credit/ATM Cards
          </label>
          {payCards.paywithCart && (
            <div>
              <p onClick={() => setModalShow(true)}>
                <Link to="#" style={{ color: "#007185" }}>
                  Enter card details.
                </Link>
              </p>
              {/* <img src={img2} /> */}
            </div>
          )}
          <CardModal show={modalShow} onHide={() => setModalShow(false)} />
        </div>

        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault2"
            defaultChecked
          />
          <label
            className="form-check-label"
            htmlFor="flexRadioDefault2"
            onClick={() => {
              chengePayment("netbank");
            }}
          >
            Net Banking
          </label>
          {payCards.netbank && (
            <div>
              <SelectOptions />
            </div>
          )}
        </div>

        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault3"
            defaultChecked
          />
          <label
            className="form-check-label"
            htmlFor="flexRadioDefault3"
            onClick={() => {
              chengePayment("upi");
            }}
          >
            Other UPI Apps
          </label>
          {payCards.upi && (
            <div>
              Please enter your UPI ID
              <input
                placeholder="Ex:Mobile-Number(8217.)@upi"
                className="form-control"
                style={{ margin: "8px 0" }}
              />
              <Button variant="warning" type="button">
                Verify
              </Button>
            </div>
          )}
        </div>
      </div>
      <hr />
    </div>
  );
}
export default PaymentSectins;
