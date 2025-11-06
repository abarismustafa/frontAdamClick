import { Link } from "react-router-dom"

function PurchaseHistory(){
    return (
        <>
       <div className="aiz-user-panel">
  <div className="card">
    <div className="card-header">
      <h5 className="mb-0 h6">Purchase History</h5>
    </div>
    <div className="card-body">
      <table className="table aiz-table mb-0 footable footable-1 breakpoint-xl" style={{}}>
        <thead>
          <tr className="footable-header">
            <th className="footable-first-visible" style={{display: 'table-cell'}}>Code</th><th data-breakpoints="md" style={{display: 'table-cell'}}>Date</th><th style={{display: 'table-cell'}}>Amount</th><th data-breakpoints="md" style={{display: 'table-cell'}}>Delivery Status</th><th data-breakpoints="md" style={{display: 'table-cell'}}>Payment Status</th><th className="text-right footable-last-visible" style={{display: 'table-cell'}}>Options</th></tr>
        </thead>
        <tbody>
          <tr>
            <td className="footable-first-visible" style={{display: 'table-cell'}}>
              <a href="https://mmslfashions.in/purchase_history/details/eyJpdiI6InRxaU5PMFpqN3dZSWYySXB0T0VUbUE9PSIsInZhbHVlIjoiZE9UL0l3L3hFS3p5OHdFTGdxU0oyUT09IiwibWFjIjoiOGYwMThjYzM4MWExNmQyZTEyYTdkYTAyY2U4ZjM5YTI4Yjc5NmMwY2U4NmY5MmYxMjUzZjhmYjlkNDIxMzQwMiIsInRhZyI6IiJ9">20221209-06452846</a>
            </td><td style={{display: 'table-cell'}}>09-12-2022</td><td style={{display: 'table-cell'}}>
              ZK350.00
            </td><td style={{display: 'table-cell'}}>
              Confirmed
            </td><td style={{display: 'table-cell'}}>
              <span className="badge badge-inline badge-success">Paid</span>
            </td><td className="text-right footable-last-visible" style={{display: 'table-cell'}}>
              <Link to="/customer/purchase_history/details-page" className="btn btn-soft-info btn-icon btn-circle btn-sm" title="Order Details">
                <i className="las la-eye" />
              </Link>
              <a className="btn btn-soft-warning btn-icon btn-circle btn-sm" href="https://mmslfashions.in/invoice/6" title="Download Invoice">
                <i className="las la-download" />
              </a>
            </td></tr><tr>
            <td className="footable-first-visible" style={{display: 'table-cell'}}>
              <a href="https://mmslfashions.in/purchase_history/details/eyJpdiI6IktxWnBrWUZRM29Ic3FXOFdjdVBiYUE9PSIsInZhbHVlIjoiVVJSOEVnYldFbGZmSEVDUjhqYWdXZz09IiwibWFjIjoiNTVkYzMzMzVlOWM4YWI1ODkwYjk2MDRjYTY4MTE2M2E4NGFhMmUwNDM3MGUwZTNkMjA3ZGFjMzQ0MWEwZjU0NyIsInRhZyI6IiJ9">20221103-09563323</a>
            </td><td style={{display: 'table-cell'}}>03-11-2022</td><td style={{display: 'table-cell'}}>
              ZK600.00
            </td><td style={{display: 'table-cell'}}>
              Pending
            </td><td style={{display: 'table-cell'}}>
              <span className="badge badge-inline badge-danger">Un-Paid</span>
            </td><td className="text-right footable-last-visible" style={{display: 'table-cell'}}>
              <a href="javascript:void(0)" className="btn btn-soft-danger btn-icon btn-circle btn-sm confirm-delete" data-href="https://mmslfashions.in/purchase_history/destroy/3" title="Cancel">
                <i className="las la-trash" />
              </a>
              <Link to="/customer/purchase_history/details-page" className="btn btn-soft-info btn-icon btn-circle btn-sm" title="Order Details">
                <i className="las la-eye" />
              </Link>
              <a className="btn btn-soft-warning btn-icon btn-circle btn-sm" href="https://mmslfashions.in/invoice/3" title="Download Invoice">
                <i className="las la-download" />
              </a>
            </td></tr><tr>
            <td className="footable-first-visible" style={{display: 'table-cell'}}>
              <a href="https://mmslfashions.in/purchase_history/details/eyJpdiI6IllVWkZvV3hPcFgwd2M0aERveGlGeEE9PSIsInZhbHVlIjoiTFdqVHZoc3B4ay9iZ0JQeDhPaGRNZz09IiwibWFjIjoiOTA4MDVmMzA1MDBjOGU2ZTJlMTExYzNjNmUxZjE4MjUxNTU2MDdiMTlhMTM3YjBkNTc4NGM4YjU5NWY1ZGY4NCIsInRhZyI6IiJ9">20221006-19574683</a>
            </td><td style={{display: 'table-cell'}}>06-10-2022</td><td style={{display: 'table-cell'}}>
              ZK220.00
            </td><td style={{display: 'table-cell'}}>
              Pending
            </td><td style={{display: 'table-cell'}}>
              <span className="badge badge-inline badge-danger">Un-Paid</span>
            </td><td className="text-right footable-last-visible" style={{display: 'table-cell'}}>
              <a href="javascript:void(0)" className="btn btn-soft-danger btn-icon btn-circle btn-sm confirm-delete" data-href="https://mmslfashions.in/purchase_history/destroy/2" title="Cancel">
                <i className="las la-trash" />
              </a>
              <Link to="/customer/purchase_history/details-page" className="btn btn-soft-info btn-icon btn-circle btn-sm" title="Order Details">
                <i className="las la-eye" />
              </Link>
              <a className="btn btn-soft-warning btn-icon btn-circle btn-sm" href="https://mmslfashions.in/invoice/2" title="Download Invoice">
                <i className="las la-download" />
              </a>
            </td></tr><tr>
            <td className="footable-first-visible" style={{display: 'table-cell'}}>
              <a href="https://mmslfashions.in/purchase_history/details/eyJpdiI6IkQ4ZEJYM3NiMkQ1Z2srTzVnZHlaTVE9PSIsInZhbHVlIjoiYVpYWGduK0E4cjUrZEVOaFVOK2ZtQT09IiwibWFjIjoiODE5OGY4MGQ2N2YxYWFhNTI5YjJhYzIwMGEyOTI3NGFkODhiYmI4MTIwNGMzODM4NWZjZmEyOWYwMzk3N2VjOCIsInRhZyI6IiJ9">20221006-19574668</a>
            </td><td style={{display: 'table-cell'}}>06-10-2022</td><td style={{display: 'table-cell'}}>
              ZK550.00
            </td><td style={{display: 'table-cell'}}>
              Pending
            </td><td style={{display: 'table-cell'}}>
              <span className="badge badge-inline badge-danger">Un-Paid</span>
            </td><td className="text-right footable-last-visible" style={{display: 'table-cell'}}>
              <a href="javascript:void(0)" className="btn btn-soft-danger btn-icon btn-circle btn-sm confirm-delete" data-href="https://mmslfashions.in/purchase_history/destroy/1" title="Cancel">
                <i className="las la-trash" />
              </a>
              <Link to="/customer/purchase_history/details-page" className="btn btn-soft-info btn-icon btn-circle btn-sm" title="Order Details">
              <i className="las la-eye" />
              </Link>
              <a className="btn btn-soft-warning btn-icon btn-circle btn-sm" href="https://mmslfashions.in/invoice/1" title="Download Invoice">
                <i className="las la-download" />
              </a>
            </td></tr></tbody>
      </table>
      <div className="aiz-pagination">
      </div>
    </div>
  </div>
</div>

        </>
    )
}
export default PurchaseHistory