import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { base_url } from "../../server";

const arr = [];
function AffilieatRegister() {
  const [data, setData] = useState();
  const [state, setSatae] = useState();
  const baseUrl = base_url();
  const getData = async () => {
    try {
      const res = await axios.get(`${baseUrl}affiliateForm`);
      setData(res.data);
      setSatae(res.data.value);
    } catch (error) {
      // alert('Server Error Failed To load Data')
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const changeHandel = (e) => {
    if (e.target.type === "checkbox") {
      const fillData = state.map((item) => {
        console.log(item);
        if ("checkbox" === item?.type) {
          for (let i = 0; i < arr.length; i++) {
            if (arr[i] === e.target.value) {
              let obj = { ...item };
              let val = obj.value;
              val.splice(i, 1);
              obj.value = val;
              return { ...item, value: val };
            }
          }
          arr.push(e.target.value);
          return { ...item, value: arr };
        } else {
          return item;
        }
      });
      console.log(fillData);
      setSatae(fillData);
    } else {
      const fillData = state.map((item) => {
        if (e.target.type === item?.type) {
          return { ...item, value: e.target.value };
        } else {
          return item;
        }
      });
      setSatae(fillData);
    }
  };

  const senData = async () => {
    const maped = state.map((item) => {
      return { label: item.label, value: item.value };
    });
    try {
      const res = await axios.post(
        `${baseUrl}affiliateUser/add_affiliateUser`,
        maped
      );
      alert("Affiliate Register Successfully");
    } catch (error) {
      alert("Server Error Affiliate Register Faild");
    }
  };

  return (
    <div className="profilePage p-30">
      <div className="container">
        <div className="pageTitle">
          <h1 className="fs-3">Affiliate Register</h1>
        </div>
        <div className="row">
          <div className="col-lg-9">
            <div className="card">
              <div className="card-body">
                {data &&
                  data.value.map((item, i) => {
                    if (item.type === "text") {
                      return (
                        <div className="mb-3" key={i}>
                          <h5>
                            {" "}
                            <label
                              htmlFor="exampleInputEmail2"
                              className="form-label"
                            >
                              {item?.label}
                            </label>
                          </h5>
                          <input
                            type="text"
                            name={item?.type}
                            onChange={changeHandel}
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                          />
                        </div>
                      );
                    }
                    if (item.type === "checkbox") {
                      return (
                        <div className="mb-3" key={i}>
                          <h5>
                            {" "}
                            <label
                              htmlFor="exampleInputEmail2"
                              className="form-label"
                            >
                              {item?.label}
                            </label>
                          </h5>
                          {item?.options.map((item, i) => {
                            return (
                              <div key={i} className="form-check">
                                <input
                                  className="form-check-input"
                                  name={item?.type}
                                  onClick={changeHandel}
                                  type="checkbox"
                                  value={item}
                                  id={`flexCheckDefault${i}`}
                                />
                                <label
                                  name={item?.type}
                                  onClick={changeHandel}
                                  value={item}
                                  className="form-check-label"
                                  htmlFor={`flexCheckDefault${i}`}
                                >
                                  {item}
                                </label>
                              </div>
                            );
                          })}
                        </div>
                      );
                    }
                    if (item.type === "radio") {
                      return (
                        <div className="mb-3" key={i}>
                          <h5>
                            {" "}
                            <label
                              htmlFor={`flexRadioDefaults${i + 1}`}
                              className="form-label"
                            >
                              {item?.label}
                            </label>
                          </h5>
                          {item?.options.map((item, i) => {
                            return (
                              <div key={i} className="form-check">
                                <input
                                  name={item?.type}
                                  onChange={changeHandel}
                                  className="form-check-input"
                                  value={item}
                                  type="radio"
                                  id={`flexRadioDefaults${i}`}
                                />
                                <label
                                  name={item?.type}
                                  onChange={changeHandel}
                                  className="form-check-label"
                                  value={item}
                                  htmlFor={`flexRadioDefaults${i}`}
                                >
                                  {item}
                                </label>
                              </div>
                            );
                          })}
                        </div>
                      );
                    }
                  })}
              </div>
              <button
                type="button"
                style={{ width: "180x", margin: "10px auto" }}
                className="btn btn-success"
                onClick={senData}
              >
                Save Affiliate{" "}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AffilieatRegister;
