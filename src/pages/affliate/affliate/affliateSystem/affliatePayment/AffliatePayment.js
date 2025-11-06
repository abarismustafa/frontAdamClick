
function AffiliatePayment() {
    return (
        <>
            <div className="container-1">
                <div className="aiz-user-panel">
                    <div className="aiz-titlebar mt-2 mb-4">
                        <div className="row align-items-center">
                            <div className="col-md-6">
                                <h1 className=" h3-3">Affiliate</h1>
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-header">
                            <h5 className="mb-0 h6">Payment Settings</h5>
                        </div>
                        <div className="card-body">
                            <form action="https://mmslfashions.in/affiliate/payment/settings/store" method="POST">
                                <input type="hidden" name="_token" defaultValue="Kn0SYeyqga1GSn4b5HXyZ4f7BA6GSb57cDPXzu5Y" />                                <div className="form-group row">
                                    <label className="col-md-2 col-form-label">Paypal Email</label>
                                    <div className="col-md-10">
                                        <input type="email" className="form-control" placeholder="Paypal Email" name="paypal_email" defaultValue="demo@gmail.com" fdprocessedid="be3s0j" />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-md-2 col-form-label">Bank Informations</label>
                                    <div className="col-md-10">
                                        <input type="text" className="form-control" placeholder="Acc. No, Bank Name etc" name="bank_information" defaultValue={123456} fdprocessedid="ylg4rj" />
                                    </div>
                                </div>
                                <div className="form-group mb-0 text-right">
                                    <button type="submit" className="btn btn-primary float-right" fdprocessedid="t2txlj">Update Payment Settings</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}
export default AffiliatePayment