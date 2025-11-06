import axios from "axios";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { base_url } from "../../server";

function PickupList() {
  const [data, setData] = useState(null);
  const [load, setLoad] = useState(false);
  const [page, setpage] = useState(0);
  const baseUrl = base_url();
  const getData = async () => {
    setLoad(true);
    try {
      const res = await axios.get(`${baseUrl}pickupPoints/page/${page}`);
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

  const ref = useRef();

  const getFilterData = async () => {
    setLoad(true);
    try {
      const res = await axios.get(
        `${baseUrl}pickupPoints/search/${ref.current.value}`
      );
      setData(res.data);
      setLoad(false);
    } catch (error) {
      console.log("server error")
      setLoad(false);
    }
  };

  return (
    <div className="container">
      <div className="aiz-user-panel">
        <div className="aiz-titlebar mt-2 mb-4">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h1 className="h3-3">Stores and pickup points</h1>
            </div>
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

        <div style={{ width: "500px", margin: "auto" }}>
          <input placeholder="Search.." className="form-control" ref={ref} />
          <button
            type="button"
            className="btn btn-info"
            style={{ margin: "10px 0" }}
            onClick={getFilterData}
          >
            Search
          </button>
        </div>

        <div className="pickvalD">
          {data &&
            data.map((item) => {
              return (
                <div key={item._id} className="picks">
                  <h5 style={{ color: "white" }}>{item?.pickupPoint_name}</h5>
                  <h6 style={{ color: "white" }}>{item.province}</h6>
                  <div>
                    {item?.pickUpManagerSchema?.firstname +
                      " " +
                      item?.pickUpManagerSchema?.lastname}
                  </div>
                  <div>Address will be Provided By Business Team</div>
                  <div>
                    long: {item?.location?.long} , lat: {item?.location?.lat}
                  </div>
                  <div>{item?.email}</div>
                  <div>{item?.phone}</div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default PickupList;
