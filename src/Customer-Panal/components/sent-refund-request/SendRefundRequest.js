function SendRefundRequest() {
    return <div className="aiz-user-panel">
        <div className="card">
            <div className="card-header">
                <h5 className="mb-0 h6">Applied Refund Request</h5>
            </div>
            <div className="card-body">
                <table className="table aiz-table mb-0 footable footable-1 breakpoint-xl" >
                    <thead>
                        <tr className="footable-header">
                            <th style={{display: "table-cell"}}>#</th>
                            <th data-breakpoints="lg" style={{display: "table-cell"}}>Date</th>
                            <th style={{display: "table-cell"}}>Order Id</th>
                            <th data-breakpoints="lg" style={{display: "table-cell"}}>Product</th>
                            <th data-breakpoints="lg" style={{display: "table-cell"}}>Amount</th>
                            <th style={{display: "table-cell"}}>Status</th></tr>
                    </thead>
                    <tbody>
                        <tr className="footable-empty"><td colSpan="6">Nothing found</td></tr></tbody>
                </table>

            </div>
        </div>
    </div>
}
export default SendRefundRequest