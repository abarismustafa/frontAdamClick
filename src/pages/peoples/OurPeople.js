import axios from "axios";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import ModalftgMan from "./modalftgMan";
import { base_url } from "../../server";

function OurPeople() {
  const [data, setData] = useState(null);
  const [load, setLoad] = useState(false);
  const baseUrl = base_url();
  const getData = async () => {
    setLoad(true);
    try {
      const res = await axios.get(`${baseUrl}adminMemberWidget`);
      setData(res.data);
      setLoad(false);
    } catch (error) {
      console.log("server error")
      setLoad(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const [modalShow, setModalShow] = useState(false);
  const [value, setValue] = useState();
  const setDataVal = (val) => {
    setModalShow(true);
    setValue(val);
  };

  return (
    <div className="container">
      <div className="aiz-user-panel">
        <div className="aiz-titlebar mt-2 mb-4">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h1>Our Peoples</h1>
            </div>
          </div>
          <div>
            <p
              style={{
                color: "black",
                fontSize: "20px",
                textAlign: "center",
                lineHeight: "25px",
              }}
            >
              We aspire to build a work culture that puts our people first.
              Nurturing them along their career-path, ETG is committed to help
              our teams fulfil their career goals. Our ethos of equality,
              meritocracy, constant learning and focus on work-life balance
              ensures that our people realise their full potential.
            </p>
          </div>
        </div>
        <div></div>
        {load && (
          <div className="preloaderCount">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        <div className="etgMember">
          {data &&
            data.map((item, i) => {
              return (
                <div onClick={() => setDataVal(item)}>
                  <img
                    style={{ height: "100%", objectFit: "cover" }}
                    key={i}
                    src={item?.photo ? item?.photo.url : ""}
                  />
                </div>
              );
            })}
        </div>

        {modalShow && (
          <ModalftgMan
            value={value}
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
        )}
      </div>
    </div>
  );
}
export default OurPeople;
