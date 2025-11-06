function EarningPoints() {
    return (
        <>
        <div className="aiz-user-panel">
  <div className="aiz-titlebar mt-2 mb-4">
    <div className="row align-items-center">
      <div className="col-md-6">
        <h1 className="h3">My Points</h1>
      </div>
    </div>
  </div>
  <div className="row">
    <div className="col-md-7 mx-auto">
      <div className="bg-grad-1 text-white rounded-lg overflow-hidden">
        <div className="px-3 pt-3 pb-3">
          <div className="h3 fw-700 text-center">10 Points = ZK1.00 Wallet Money</div>
          <div className="opacity-50 text-center">Exchange Rate</div>
        </div>
      </div>
    </div>
  </div>
  <br />
  <div className="card">
    <div className="card-header">
      <h5 className="mb-0 h6">Point Earning history</h5>
    </div>
    <div className="card-body">
      <table className="table aiz-table mb-0 aiz-table-2">
        <thead>
          <tr>
            <th>#</th>
            <th>Order Code:</th>
            <th data-breakpoints="lg">Points</th>
            <th data-breakpoints="lg">Converted</th>
            <th data-breakpoints="lg">Date</th>
            <th className="text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>
              20221209-06452846
            </td>
            <td>0 pts</td>
            <td>
              <span className="badge badge-inline badge-success">Yes</span>
            </td>
            <td>09-12-2022</td>
            <td className="text-right">
              <span className="badge badge-inline badge-success">Done</span>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="aiz-pagination">
      </div>
    </div>
  </div>
</div>

        </>
    )
}
export default EarningPoints