import classnames from "classnames";
import { useEffect, useState } from "react"
import { useDeleteShippingMutation, useGetShippingAddQuery } from "../products/productSlice";

function ShippingAddress({ setShippingAdd }) {
    const [state, setState] = useState(0)
    const token = window.localStorage.getItem('token')
    const { data  ,isLoading} = useGetShippingAddQuery(token)
    const [deleteAdd] = useDeleteShippingMutation()

    const setIdAddress = (item, index) => {
        setState(index)
        setShippingAdd(item)
        window.localStorage.setItem('shippingId', item._id)
    }

    useEffect(() => {
        const pickup = window.localStorage.getItem('pickUpPoint')
        if (pickup === 'null') {
            if (data) {
                window.localStorage.setItem('shippingId', data[0]?._id)
            }

        }

    }, [])

    const deleteItem = (id) => {
        deleteAdd({id:id ,token:window.localStorage.getItem('token')})
    }

    return <div className="mb-3">
        {isLoading && <div className="preloaderCount">
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>}
        <div>
            {data?.address?.map((item, i) => {
                return <div key={i} className={`showShippingAdd ${i === state && 'activeAddres'}`}  onClick={() => setIdAddress(item, i)}>
                    <div className="form-check" style={{display: "flex", justifyContent: "start"}}>
                        <input onClick={() => setIdAddress(item, i)} style={{ padding: "10px"}} className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="option2" />
                    </div>
                    <div style={{ margin: "10px 0", }}>Full-Address :{item.addressLine1} {item.addressLine2}</div>
                    <div>Name :{item.firstname} {item.lastname}</div>
                    <div>Country :{item.country}</div>
                    {/* <div>State : {item.state}</div> */}
                    <div>City : {item.city}</div>
                    <div>Phone : {item?.phone}</div>
                    <div>Email : {item?.email}</div>
                    <div style={{ paddingBottom: "10px" }}>zip Code : {item.zip}</div>
                    <button style={{ borderRadius: "100%" }} type="button" className="btn shippingDelete" onClick={() => { deleteItem(item._id) }}><span className="btn-close" aria-label="Close"></span></button>
                </div>
            })}

        </div>

        <button type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" className="btn btn-success">Add New Address</button>
    </div>
}
export default ShippingAddress