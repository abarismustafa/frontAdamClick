import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { base_url } from "../../server";

function CancellOrders() {
  const userid = window.localStorage.getItem("user_id");
  const [data, setData] = useState(null);
  const [load, setLoad] = useState(false);
  const baseUrl = base_url();
  const getData = async () => {
    setLoad(true);
    try {
      const res = await axios.get(`${baseUrl}cancelOrder/customer`, {
        headers: {
          "content-type": "application/json; charset=UTF-8",
          authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      });
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

  return (
    <div className="container">
      <div className="aiz-user-panel">
        <div className="aiz-titlebar mt-2 mb-4">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h1 className="h3-3">Cancel Orders</h1>
            </div>
          </div>
        </div>
        {load && (
          <div className="preloaderCount">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        <div className="card">
          <table className="table  aiz-table mb-0 footable footable-1 breakpoint-xl">
            <thead>
              <tr className="footable-header">
                <th
                  className="footable-first-visible"
                  style={{ display: "table-cell" }}
                >
                  S.No
                </th>
                <th style={{ display: "table-cell" }}>Order No</th>

                <th data-breakpoints="md" style={{ display: "table-cell" }}>
                  Order Date
                </th>
                <th data-breakpoints="md" style={{ display: "table-cell" }}>
                  Buyer Name
                </th>
                <th data-breakpoints="md" style={{ display: "table-cell" }}>
                  Order Net Amount
                </th>
                <th data-breakpoints="md" style={{ display: "table-cell" }}>
                  Cancel Reason
                </th>
                {/* <th
                                data-breakpoints="md"
                                style={{ display: "table-cell" }}
                            >
                                Seller Name
                            </th> */}
                <th data-breakpoints="md" style={{ display: "table-cell" }}>
                  Delivery Type
                </th>

                {/* <th
                                        className="footable-last-visible"
                                        style={{}}
                                    >
                                        Options
                                    </th> */}
              </tr>
            </thead>

            <tbody>
              {data &&
                data.map((item, i) => {
                  return (
                    <tr key={item._id}>
                      <td
                        className="footable-first-visible"
                        style={{ display: "table-cell" }}
                      >
                        {i + 1}
                      </td>
                      <td style={{ display: "table-cell" }}>
                        {item?.orderId?.order_referenceNo}
                      </td>
                      <td style={{ display: "table-cell" }}>
                        {item?.orderId?.createdAt}
                      </td>

                      <td style={{ display: "table-cell" }}>
                        {item?.user?.firstname} {item?.user?.lastname}
                      </td>
                      <td style={{ display: "table-cell" }}>
                        {item?.orderId?.grandTotal}
                      </td>

                      <td style={{ display: "table-cell" }}>
                        {item?.reason?.reason}
                      </td>

                      {/* <td style={{ display: "table-cell" }}>{item?.orderId?.Seller ? item?.orderId?.Seller[0].firstname + " " + item?.orderId?.Seller[0].lastname : 'Leat Meatz'}</td> */}

                      <td style={{ display: "table-cell" }}>
                        {item?.orderId?.deliveryType}
                      </td>

                      {/* <td
                                            className="text-right footable-last-visible"
                                            style={{ display: "inline-flex" }}
                                        >
                                            <Link
                                                className="btn btn-soft-primary btn-icon btn-circle btn-sm me-2"
                                                to={`/admin/all_orders/order-Details/${item._id}`}
                                                title="View"
                                            >
                                                <i className="las la-eye" />
                                            </Link>


                                            <button type="button" onClick={() => deleteOrderData(item._id)} className="btn btn-soft-danger btn-icon btn-circle btn-sm" title="delete">
                                                <i className="las la-trash" />
                                            </button>

                                        </td> */}
                    </tr>
                  );
                })}
            </tbody>
            {!data && <h2>No Data</h2>}
          </table>
        </div>
      </div>
    </div>
  );
}
export default CancellOrders;
