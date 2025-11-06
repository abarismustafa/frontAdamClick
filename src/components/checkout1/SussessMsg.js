import { BsCheckCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";

function SussessMsg({ plaecedData, cartValue, currencySymbol }) {
  console.log("placeOrde", plaecedData);
  console.log("cartValue", cartValue);
  const isLogin = window.localStorage.getItem("isLogin");
  return (
    <div
      className="modal fade show"
      id="exampleModal"
      tabIndex="-1"
      role="dialog"
      style={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "#808080a8",
      }}
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" style={{ width: "500px" }} role="document">
        <div className="modal-content">
          <div className="modal-header d-block">
            <h5
              className="modal-title"
              style={{
                display: "flex",
                justifyContent: "center",
                fontSize: "45px",
              }}
              id="exampleModalLabel"
            >
              <BsCheckCircleFill />
            </h5>
            <h5
              className="modal-title succesful"
              id="exampleModalLabel"
              style={{
                display: "flex",
                justifyContent: "center",
                fontSize: "25px",
              }}
            >
              Order placed Successfully
            </h5>
          </div>
          {plaecedData?.orderList?.map((item) => {
            return (
              <div className="modal-body">
                <h6>Your Order Id : {item?.order_referenceNo}</h6>
                <h6>
                  Amount : {plaecedData?.currency?.symbol} {item?.grandTotal}
                </h6>
              </div>
            );
          })}
          <Link
            to="/"
            className="btn btn-outline-success"
            style={{ width: "200px", margin: "20px auto" }}
          >
            Continue Shopping
          </Link>
          {isLogin == "true" && (
            <div style={{ margin: "10px" }}>
              {plaecedData?.orderList?.map((item, i) => {
                return (
                  <Link
                    key={i}
                    to={`/order-detail/${item._id}`}
                    className="btn btn-outline-info"
                    style={{ width: "130px", margin: "0 5px" }}
                  >
                    Order Detail
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default SussessMsg;
