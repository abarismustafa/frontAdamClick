
function AuctionDetails() {
    return (
        <>
        <div>
  <div className="aiz-user-panel">
    <div className="aiz-titlebar mt-2 mb-4">
      <div className="row align-items-center">
        <div className="col-md-6">
          <h1 className="h3">Order Id: 20221209-06452846</h1>
        </div>
      </div>
    </div>
    <div className="card">
      <div className="card-header">
        <h5 className="h6 mb-0">Order Summary</h5>
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col-lg-6">
            <table className="table-borderless table">
              <tbody>
                <tr>
                  <td className="w-50 fw-600">Order Code::</td>
                  <td>20221209-06452846</td>
                </tr>
                <tr>
                  <td className="w-50 fw-600">Customer:</td>
                  <td>Azharuddin Shamim</td>
                </tr>
                <tr>
                  <td className="w-50 fw-600">Email:</td>
                  <td>abarissolution@gmail.com</td>
                </tr>
                <tr>
                  <td className="w-50 fw-600">Shipping address:</td>
                  <td>
                    Gali No. 21, Zakir Nagar,, New Delhi, 110025, India
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col-lg-6">
            <table className="table-borderless table">
              <tbody>
                <tr>
                  <td className="w-50 fw-600">Order date:</td>
                  <td>09-12-2022 06:45 AM</td>
                </tr>
                <tr>
                  <td className="w-50 fw-600">Order status:</td>
                  <td>Confirmed</td>
                </tr>
                <tr>
                  <td className="w-50 fw-600">Total order amount:</td>
                  <td>ZK250.00</td>
                </tr>
                <tr>
                  <td className="w-50 fw-600">Shipping method:</td>
                  <td>Flat shipping rate</td>
                </tr>
                <tr>
                  <td className="w-50 fw-600">Payment method:</td>
                  <td>Cheque Payment</td>
                </tr>
                <tr>
                  <td className="text-main text-bold">Additional Info</td>
                  <td className />
                </tr>
                <tr>
                  <td className="w-50 fw-600">Tracking code:</td>
                  <td>123123</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div className="row">
      <div className="col-md-9">
        <div className="card">
          <div className="card-header">
            <h5 className="h6 mb-0">Order Details</h5>
          </div>
          <div className="card-body">
            <table className="aiz-table table footable footable-1 breakpoint-xl" style={{}}>
              <thead>
                <tr className="footable-header">
                  <th className="footable-first-visible" style={{display: 'table-cell'}}>
                    #
                  </th>
                  <th width="30%" style={{display: 'table-cell'}}>
                    Product
                  </th>
                  <th data-breakpoints="md" style={{display: 'table-cell'}}>
                    Variation
                  </th>
                  <th style={{display: 'table-cell'}}>Quantity</th>
                  <th data-breakpoints="md" style={{display: 'table-cell'}}>
                    Delivery Type
                  </th>
                  <th style={{display: 'table-cell'}}>Price</th>
                  <th data-breakpoints="md" style={{display: 'table-cell'}}>
                    Refund
                  </th>
                  <th data-breakpoints="md" className="text-right footable-last-visible" style={{display: 'table-cell'}}>
                    Review
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="footable-first-visible" style={{display: 'table-cell'}}>
                    1
                  </td>
                  <td style={{display: 'table-cell'}}>
                    <a href="https://mmslfashions.in/product/aceta" target="_blank">
                      ACETA
                    </a>
                  </td>
                  <td style={{display: 'table-cell'}} />
                  <td style={{display: 'table-cell'}}>1</td>
                  <td style={{display: 'table-cell'}}>Home Delivery</td>
                  <td style={{display: 'table-cell'}}>ZK250.00</td>
                  <td style={{display: 'table-cell'}}>
                    <b>Non-refundable</b>
                  </td>
                  <td className="text-right footable-last-visible" style={{display: 'table-cell'}}>
                    <span className="text-danger">Not Delivered Yet</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="col-md-3">
        <div className="card">
          <div className="card-header">
            <b className="fs-15">Order Ammount</b>
          </div>
          <div className="card-body pb-0">
            <table className="table-borderless table">
              <tbody>
                <tr>
                  <td className="w-50 fw-600">Subtotal</td>
                  <td className="text-right">
                    <span className="strong-600">ZK250.00</span>
                  </td>
                </tr>
                <tr>
                  <td className="w-50 fw-600">Shipping</td>
                  <td className="text-right">
                    <span className="text-italic">ZK100.00</span>
                  </td>
                </tr>
                <tr>
                  <td className="w-50 fw-600">Tax</td>
                  <td className="text-right">
                    <span className="text-italic">ZK0.00</span>
                  </td>
                </tr>
                <tr>
                  <td className="w-50 fw-600">Coupon</td>
                  <td className="text-right">
                    <span className="text-italic">ZK0.00</span>
                  </td>
                </tr>
                <tr>
                  <td className="w-50 fw-600">Total</td>
                  <td className="text-right">
                    <strong>
                      <span>ZK350.00</span>
                    </strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
  
</div>
        </>
    )
}
export default AuctionDetails