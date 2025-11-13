import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"

import { Pagination } from "antd";
import Loader from "../../../common/loader/Loader";



function ListTicket() {
    const param = useParams()
    // console.log(param);

    const [loading, setLoading] = useState(false);
    const [count, setCount] = useState(10)
    const [page, setPage] = useState(0)
    // console.log(page);
    const [totalCount, setTotalCount] = useState(null)
    const [departData, setDepartData] = useState(null)
    const [priotyData, setPriotyData] = useState(null)
    const [statussearch, setStatusSearch] = useState(null)
    const [data, setData] = useState(null)
    const [allData, setAllData] = useState(null)
    const [filterInitial, setFilterInitial] = useState({
        user_id: '',
        count: '',
        page: '',
        end_date: '',
        start_date: '',
        txn_id: '',
        status: '',
        department_id: '',
        priority: '',
        service_id: '',
        sortType: ''
    })

    const handleChange = (e) => {
        const clone = { ...filterInitial }
        const value = e.target.value
        const name = e.target.name
        clone[name] = value
        setFilterInitial(clone)
    }

    const getTransitionReport = async (input) => {
        // console.log('iojijip');
        // setLoading(true)
        // const clone = { ...filterInitial, count: count, page: input, min_amt: +filterInitial.min_amt, max_amt: +filterInitial.max_amt, user_id: window.localStorage.getItem('userIdToken') }
        // try {
        //     const res = await listTicket(clone)
        //     console.log(res);
        //     setTotalCount(res?.data?.data?.totalCount)
        //     setData(res?.data?.data?.data)
        //     
        // } catch (error) {

        // }
        // setLoading(false)
    }

    const onChangeVal = (e) => {
        console.log(e - 1);

        setPage(e - 1)
        getTransitionReport(e - 1)
    };


    const depart = async () => {
        // try {
        //     const res = await department()
        //     setDepartData(res?.data?.data);
        // } catch (error) {

        // }
    }
    const prioty = async () => {
        // try {
        //     const res = await dmtDisputePriority()
        //     setPriotyData(res?.data?.data);
        // } catch (error) {

        // }
    }
    const statusfunction = async () => {
        // try {
        //     const res = await dmtDisputeStatus()
        //     setStatusSearch(res?.data?.data);
        // } catch (error) {
        //     // Error handling
        // }
    }



    const ResetData = async () => {
        setLoading(true)
        const obj = {
            count: 10,
            page: 0,
            end_date: '',
            start_date: '',
            txn_id: '',
            status: '',
            department_id: '',
            priority: '',
            service_id: '',
            sortType: '',
            user_id: window.localStorage.getItem('userIdToken')
        }
        // try {
        //     const res = await listTicket(obj)
        //     setTotalCount(res?.data?.data?.totalCount)
        //     setData(res?.data?.data?.data)
        //     setFilterInitial({
        //         end_date: '',
        //         start_date: '',
        //         txn_id: '',
        //         status: '',
        //         department_id: '',
        //         priority: '',
        //         service_id: '',
        //     })
        //     setPage(0)
        // } catch (error) {

        // }
        setLoading(false)
    }


    const [sortDirection, setSortDirection] = useState();
    // console.log(sortDirection);

    const [assending, setDecending] = useState(1)

    const sortByColumn = async (key) => {
        if (sortDirection == 'asc') {
            setDecending(1)
        } else {
            setDecending(-1)
        }

        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');

        setLoading(true)

        const clone = { ...filterInitial, count: count, page: page, min_amt: +filterInitial.min_amt, max_amt: +filterInitial.max_amt, sortType: +assending, sortKey: key, user_id: window.localStorage.getItem('userIdToken') }
        // console.log(clone);
        try {
            // const res = await walletsREports(clone)
            // // console.log(res?.data?.data?.wallet);
            // setTotalCount(res?.data?.data?.total)
            // setData(res?.data?.data?.wallet)
            // // getTransitionReport()
        } catch (error) {

        }
        setLoading(false)
    };



    const [currentDate, setCurrentDate] = useState('');
    // console.log(currentDate);

    const getCurrentDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const day = String(today.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        setCurrentDate(formattedDate);
        const clone = { ...filterInitial, start_date: formattedDate, end_date: formattedDate }
        setFilterInitial(clone)
    }

    useEffect(() => {
        // getCurrentDate()
    }, [])


    useEffect(() => {
        depart()
        prioty()
        statusfunction()
    }, [])

    useEffect(() => {
        getTransitionReport(0)
    }, [])

    const handleSubmit = () => {
        getTransitionReport(0)
        setPage(0)
    }

    return (
        <>
            {loading && <Loader />}
            <div className="container">
                <div className="PageHeading">
                    <h1>List Tickets</h1>
                </div>
                <div className="ContentArea">
                    <div className="card">
                        <div className="card-header"><span>Filter</span></div>
                        <div className="card-body">
                            <form action="" method="post" name="frmReport" id="frmReport">
                                <input type="hidden" id="hidID" name="hidID" />
                                <div className="row" style={{ alignItems: 'end' }}>
                                    {/* <div className="form-group col-md-4">
                                    <label htmlFor="txtUserId">Min Amount</label>
                                    <input type="number" name="min_amt" id="account_no" className="form-control" value={filterInitial.min_amt} onChange={handleChange} />
                                </div>
                                <div className="form-group col-md-4">
                                    <label htmlFor="txtUserId">Max Amount</label>
                                    <input type="number" name="max_amt" id="account_no" className="form-control" value={filterInitial.max_amt} onChange={handleChange} />
                                </div> */}

                                    <div className="form-group col-md-4">
                                        <label htmlFor="txtUserId">Start Date</label>
                                        <input type="date" name="start_date" id="account_no" max={currentDate} value={filterInitial.start_date} className="form-control" onChange={handleChange} />
                                    </div>
                                    <div className="form-group col-md-4">
                                        <label htmlFor="txtUserId">End Date</label>
                                        <input type="date" name="end_date" id="account_no" max={currentDate} className="form-control" value={filterInitial.end_date} onChange={handleChange} />
                                    </div>
                                    <div className="form-group col-md-4">
                                        <label htmlFor="txtUserId">Ticket Number</label>
                                        <input type="text" name="txn_id" id="account_no" className="form-control" value={filterInitial?.txn_id} placeholder="Enter Ticket Number" onChange={handleChange} />
                                    </div>
                                    <div className="form-group col-md-4">
                                        <label htmlFor="txtUserId">Department </label>
                                        <select class="form-select" name="department_id" value={filterInitial?.department_id} onChange={handleChange}>
                                            <option selected >Select Department</option>
                                            {departData && departData?.map((item) => {
                                                return <option value={item?._id}>{item?.department}</option>
                                            })}
                                        </select>
                                    </div>

                                    <div className="form-group col-md-4">
                                        <label htmlFor="txtUserId">Priority </label>
                                        <select class="form-select" name="priority" value={filterInitial?.priority} onChange={handleChange}>
                                            <option selected >Select Priority</option>
                                            {priotyData && priotyData?.map((item) => {
                                                return <option value={item?._id}>{item?.priority}</option>
                                            })}
                                        </select>
                                    </div>


                                    <div className="form-group col-md-4">
                                        <label htmlFor="txtUserId">Status</label>
                                        <select class="form-select" name="status" value={filterInitial?.status} onChange={handleChange}>
                                            <option selected >Select Status</option>
                                            {statussearch && statussearch?.map((item) => {
                                                return <option value={item?._id}>{item?.name}</option>
                                            })}
                                        </select>
                                    </div>



                                    <div className="form-group col-md-12 text-center">
                                        <label>&nbsp;</label>
                                        <button type="button" className="btn btn-primary me-3" onClick={handleSubmit}>
                                            Search

                                        </button>
                                        <button type="button" className="btn btn-light" onClick={ResetData}>Reset</button>
                                    </div>

                                </div>
                            </form>
                        </div>

                    </div>
                    <div className="card mt-2" style={{ overflow: 'auto' }}>
                        <div className="card-body">

                            <div className="GridUi no-header-footer-grid mt-3" id="all_transaction">
                                <div id="rechargehistorytbl_wrapper" className="dataTables_wrapper">

                                    <table id="rechargehistorytbl" className="table table-striped table-bordered table-hover display fixed_headers dataTable" style={{ width: 1250 }} role="grid" aria-describedby="rechargehistorytbl_info">
                                        <thead>
                                            <tr role="row">
                                                <th className="sorting" tabIndex={0} aria-controls="rechargehistorytbl" rowSpan={1} colSpan={1} aria-label="Recharge ID: activate to sort column ascending">
                                                    S.No
                                                </th>
                                                <th className="sorting" tabIndex={0} aria-controls="rechargehistorytbl" rowSpan={1} colSpan={1} aria-label="Recharge ID: activate to sort column ascending">
                                                    Creation Date
                                                </th>
                                                <th className="sorting" tabIndex={0} aria-controls="rechargehistorytbl" rowSpan={1} colSpan={1} aria-label="Company Name: activate to sort column ascending">
                                                    Ticket No
                                                </th>
                                                <th className="sorting" tabIndex={0} aria-controls="rechargehistorytbl" rowSpan={1} colSpan={1} aria-label="Mobile No: activate to sort column ascending">
                                                    Subject
                                                </th>
                                                <th className="sorting" tabIndex={0} aria-controls="rechargehistorytbl" rowSpan={1} colSpan={1} aria-label="Amount: activate to sort column ascending">
                                                    Department
                                                </th>
                                                <th className="sorting" tabIndex={0} aria-controls="rechargehistorytbl" rowSpan={1} colSpan={1} aria-label="Amount: activate to sort column ascending">
                                                    Priority
                                                </th>
                                                {/* <th className="sorting" tabIndex={0} aria-controls="rechargehistorytbl" rowSpan={1} colSpan={1} aria-label="Amount: activate to sort column ascending">
                                                Reason
                                            </th> */}
                                                <th className="sorting" tabIndex={0} aria-controls="rechargehistorytbl" rowSpan={1} colSpan={1} aria-label="Amount: activate to sort column ascending">
                                                    Status
                                                </th>
                                                <th className="sorting" tabIndex={0} aria-controls="rechargehistorytbl" rowSpan={1} colSpan={1} aria-label="Amount: activate to sort column ascending">
                                                    Reply
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data && data?.map((item, i) => {
                                                // console.log(item);
                                                return <tr className="odd" key={item?._id}>
                                                    <td valign="top" className="dataTables_empty">{(i + 1) + (page * count)}</td>
                                                    <td valign="top" className="dataTables_empty">{item?.createdAt}</td>
                                                    {/* <td valign="top" className="dataTables_empty">{item?.updatedAt}</td> */}

                                                    <td valign="top" className="dataTables_empty">{item?.refer_code}</td>
                                                    <td valign="top" className="dataTables_empty">{item?.subject}</td>
                                                    <td valign="top" className="dataTables_empty">{item?.department_id}</td>
                                                    <td valign="top" className="dataTables_empty">{item?.priority}</td>
                                                    {/* <td valign="top" className="dataTables_empty">--</td> */}


                                                    <td valign="top" className="dataTables_empty">{item?.status}</td>
                                                    <td valign="top" className="dataTables_empty"> <Link to={`/list-ticket-user/${item?._id}`} className="btn btn-primary">Reply</Link> </td>
                                                    {/* <td valign="top" className="dataTables_empty">{item?.c_bal}</td> */}
                                                    {/* <td valign="top" className="dataTables_empty">{item?.message}</td> */}
                                                    {/* {item?.approve == true ? <td valign="top" >
                                               
                                                <div className="approve">
                                                    <p><MdVerified /></p>
                                                    <p className="VERIFIED">SUCCESS</p>
                                                </div>
                                            </td> : <td valign="top" className="dataTables_empty">
                                                <div className="approve approv2">
                                                    <p><GiCancel /></p>
                                                    <p className="VERIFIED">UNVERIFIED</p>
                                                </div>
                                            </td>} */}

                                                </tr>
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="dataTables_info_page">
                        <div className="dataTables_info" id="empoloyees-tblwrapper_info" role="status" aria-live="polite">
                            Total {totalCount}  entries
                        </div>
                        <div className="dataTables_paginate paging_simple_numbers" id="empoloyees-tblwrapper_paginate">
                            <Pagination
                                // showSizeChanger
                                // onShowSizeChange={''}

                                defaultCurrent={1}
                                current={page + 1}
                                onChange={onChangeVal}
                                total={totalCount}
                            />
                        </div>
                    </div>
                </div >
            </div>
        </>
    )
}
export default ListTicket