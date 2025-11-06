import { useEffect, useState } from "react"
import { Button, Modal } from "react-bootstrap"
import { useGetAddressDetailQuery, useSetEditedAddresMutation } from "../products/productSlice"

function EditAddress({ handleClose, getData, ship, type }) {
    const ship_id = window.localStorage.getItem('setIdEditAdress')
    const editAdress = window.localStorage.getItem('setIdEditAdress')
    const [editAdd, { isLoading }] = useSetEditedAddresMutation()
    const { data, refetch } = useGetAddressDetailQuery({ id: editAdress, token: window.localStorage.getItem('token') })
    const [show, setShow] = useState(false)
    const [state, setState] = useState({
        type: "",
        country: "",
        state: "",
        city: "",
        zip: "",
        addressLine1: "",
        addressLine2: "",
        landmark: "",
        province: "",
        company: "",
        userid: window.localStorage.getItem('user_id')
    })

    const onchengeHandle = (e) => {
        const clone = { ...state }
        clone[e.target.name] = e.target.value
        setState(clone)
    }

    const token = window.localStorage.getItem('token')
    const onsubmitData = () => {
        setShow(true)
        editAdd({ data: { ...state, ship_id: ship_id }, token: token })

        setTimeout(() => {
            setShow(false)
            handleClose()
            getData()
        }, 1000);
        setState({
            type: "",
            country: "",
            state: "",
            city: "",
            zip: "",
            addressLine1: "",
            addressLine2: "",
            landmark: "",
            province: "",
            company: "",
            userid: window.localStorage.getItem('user_id')
        })
    }

    const setAddress = (val) => {
        const clone = { ...state, type: val }
        setState(clone)
    }
    useEffect(() => {
        if (data) {
            setState(data)
        }
        refetch()
    }, [data])

    return <>
        <Modal.Header closeButton>

            <Modal.Title>Address Update Form</Modal.Title>
        </Modal.Header>
        <form className="row" style={{ margin: "20px" }}>
            <div className="mb-3 col-6">
                {!data && <div className="preloaderCount">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>}
                {ship === 'Shipping' && <div className="form-check">
                    <input className="form-check-input" type="radio" name="flexRadioDefault" checked={state.type === 'Shipping'} id="flexRadioDefault1" onClick={() => { setAddress('shipping') }} />
                    <label className="form-check-label" htmlFor="flexRadioDefault1">
                        Shipping Address
                    </label>
                </div>}
                {ship === 'billing' && <div className="form-check">
                    <input className="form-check-input" type="radio" name="flexRadioDefault" checked={state.type === 'billing'} id="flexRadioDefault2" onClick={() => { setAddress('billing') }} />
                    <label className="form-check-label" htmlFor="flexRadioDefault2">
                        Billing Address
                    </label>
                </div>}
            </div>

            {/* {ship === 'Shipping' && <>
                <div className="mb-3 col-6">
                    <label htmlFor="exampleInputEmail1" className="form-label">First Name</label>
                    <input type="text" className="form-control" value={state?.firstname} name="firstname" onChange={onchengeHandle} aria-describedby="emailHelp" />
                </div>
                <div className="mb-3 col-6">
                    <label htmlFor="exampleInputEmail1" className="form-label">Last Name</label>
                    <input type="text" className="form-control" value={state?.lastname} name="lastname" onChange={onchengeHandle} aria-describedby="emailHelp" />
                </div>
                <div className="mb-3 col-6">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                    <input type="text" className="form-control" name="email" value={state?.email} onChange={onchengeHandle} aria-describedby="emailHelp" />
                </div>
                <div className="mb-3 col-6">
                    <label htmlFor="exampleInputEmail1" className="form-label">Phone</label>
                    <input type="text" className="form-control" name="phone" value={state?.phone} onChange={onchengeHandle} aria-describedby="emailHelp" />
                </div>
            </>} */}

            <div className="mb-3 col-6">
                <label htmlFor="exampleInputEmail1" className="form-label">First Name</label>
                <input type="text" className="form-control" value={state?.firstname} name="firstname" onChange={onchengeHandle} aria-describedby="emailHelp" />
            </div>
            <div className="mb-3 col-6">
                <label htmlFor="exampleInputEmail1" className="form-label">Last Name</label>
                <input type="text" className="form-control" value={state?.lastname} name="lastname" onChange={onchengeHandle} aria-describedby="emailHelp" />
            </div>
            <div className="mb-3 col-6">
                <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                <input type="text" className="form-control" name="email" value={state?.email} onChange={onchengeHandle} aria-describedby="emailHelp" />
            </div>
            <div className="mb-3 col-6">
                <label htmlFor="exampleInputEmail1" className="form-label">Phone</label>
                <input type="text" className="form-control" name="phone" value={state?.phone} onChange={onchengeHandle} aria-describedby="emailHelp" />
            </div>

            <div className="mb-3 col-6">
                <label htmlFor="exampleInputEmail1" className="form-label">Country</label>
                <input type="text" className="form-control" name="country" value={state.country} onChange={onchengeHandle} aria-describedby="emailHelp" />
            </div>

            <div className="mb-3 col-6">
                <label htmlFor="exampleInputEmail1" className="form-label">State</label>
                <input type="text" className="form-control" name="state" value={state.state} onChange={onchengeHandle} aria-describedby="emailHelp" />
            </div>
            <div className="mb-3 col-6">
                <label htmlFor="exampleInputEmail1" className="form-label">City</label>
                <input type="text" className="form-control" name="city" value={state.city} onChange={onchengeHandle} aria-describedby="emailHelp" />
            </div>
            <div className="mb-3 col-6">
                <label htmlFor="exampleInputEmail1" className="form-label">ZIP</label>
                <input type="text" className="form-control" name="zip" value={state.zip} onChange={onchengeHandle} aria-describedby="emailHelp" />
            </div>
            <div className="mb-3 col-6">
                <label htmlFor="exampleInputEmail1" className="form-label">Province</label>
                <input type="text" className="form-control" name="province" value={state.province} onChange={onchengeHandle} aria-describedby="emailHelp" />
            </div>
            <div className="mb-3 col-6">
                <label htmlFor="exampleInputEmail1" className="form-label">Address Line1</label>
                <input type="text" className="form-control" name="addressLine1" value={state.addressLine1} onChange={onchengeHandle} aria-describedby="emailHelp" />
            </div>
            <div className="mb-3 col-6">
                <label htmlFor="exampleInputEmail1" className="form-label">Address Line2</label>
                <input type="text" className="form-control" name="addressLine2" value={state.addressLine2} onChange={onchengeHandle} aria-describedby="emailHelp" />
            </div>
            <div className="mb-3 col-6">
                <label htmlFor="exampleInputEmail1" className="form-label">Landmark</label>
                <input type="text" className="form-control" name="landmark" value={state.landmark} onChange={onchengeHandle} aria-describedby="emailHelp" />
            </div>
            <div className="mb-3 col-6">
                <label htmlFor="exampleInputEmail1" className="form-label">Company</label>
                <input type="text" className="form-control" name="company" value={state.company} onChange={onchengeHandle} aria-describedby="emailHelp" />
            </div>
            {show && (<div className="alert alert-success" role="alert">
                Address Update Successfully!
            </div>)}

            <button type="button" className="btn btn-primary" onClick={onsubmitData}>Submit  {show && <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>}</button>
        </form>

    </>
}
export default EditAddress