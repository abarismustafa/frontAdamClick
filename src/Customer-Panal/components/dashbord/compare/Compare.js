function Compare() {
    return (
        <>
            <div style={{width: 100 + '%'}}>
                <section className="pt-4 mb-4 w-100">
                    <div className="container text-center">
                        <div className="row">
                            <div className="col-lg-6 text-center text-lg-left">
                                <h1 className="fw-600 h4">Compare</h1>
                            </div>
                            <div className="col-lg-6">
                                <ul className="breadcrumb bg-transparent p-0 justify-content-center justify-content-lg-end">
                                    <li className="breadcrumb-item opacity-50">
                                        <a className="text-reset" href="https://mmslfashions.in">Home</a>
                                    </li>
                                    <li className="text-dark fw-600 breadcrumb-item">
                                        <a className="text-reset" href="https://mmslfashions.in/compare/reset">"Compare"</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="mb-4">
                    <div className="container text-left">
                        <div className="bg-white shadow-sm rounded">
                            <div className="p-3 border-bottom d-flex justify-content-between align-items-center">
                                <div className="fs-15 fw-600">Comparison</div>
                                <a href="https://mmslfashions.in/compare/reset" style={{ textDecoration: 'none' }} className="btn btn-soft-primary btn-sm fw-600">Reset Compare List</a>
                            </div>
                            <div className="text-center p-4">
                                <p className="fs-17 fs-17-2">Your comparison list is empty</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}
export default Compare;