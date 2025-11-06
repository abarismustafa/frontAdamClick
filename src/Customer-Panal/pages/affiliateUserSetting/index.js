function AffiliateUserSetting() {
    return (
        <>
            <div className="aiz-user-panel">
                <div className="aiz-titlebar mt-2 mb-4">
                    <div className="row align-items-center">
                        <div className="col-md-6">
                            <h1 className="h3">Affiliate</h1>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header">
                        <h5 className="mb-0 h6">Payment Settings</h5>
                    </div>
                    <div className="card-body">
                        <form action="https://mmslfashions.in/affiliate/payment/settings/store" method="POST">
                            <input type="hidden" name="_token" defaultValue="QrigTcMPDNEqWMLnUjPgkMc78xKMJ9WWaGEvwg3h" />                                <div className="form-group row">
                                <label className="col-md-2 col-form-label">Paypal Email</label>
                                <div className="col-md-10">
                                    <input type="email" className="form-control" placeholder="Paypal Email" name="paypal_email" defaultValue="demo@gmail.com" fdprocessedid="c2carq" />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-md-2 col-form-label">Bank Informations</label>
                                <div className="col-md-10">
                                    <input type="text" className="form-control" placeholder="Acc. No, Bank Name etc" name="bank_information" defaultValue={123456} fdprocessedid="cfaco9" />
                                </div>
                            </div>
                            <div className="form-group mb-0 text-right">
                                <button type="submit" className="btn btn-primary" fdprocessedid="ll471j">Update Payment Settings</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}
export default AffiliateUserSetting;