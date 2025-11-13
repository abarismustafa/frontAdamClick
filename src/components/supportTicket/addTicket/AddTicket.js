import { useEffect, useMemo, useRef, useState } from "react";
import JoditEditor from 'jodit-react';

import { FaRegUser } from "react-icons/fa";
import { IoMdAttach } from "react-icons/io";
import { RxCrossCircled } from "react-icons/rx";
// import { addTicket, cloudImage, department, dmtDisputePriority, relatedService, userValidate } from "../../../../api/login/Login";
import { ToastContainer, toast } from "react-toastify";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { FaCloudUploadAlt } from "react-icons/fa";
// import { baseUrl, baseUrlImage } from "../../../../baseUrl";
import "../ticket.css"
function AddTicket({ placeholder }) {
    const navigate = useNavigate()

    const patam = useParams()
    // console.log(patam);
    const [defaultData, setDefaultData] = useState()
    console.log(defaultData?.serviceId);
    const location = useLocation();
    // console.log(location.state);
    useEffect(() => {
        setDefaultData(location.state)
    }, [location])
    // const { someData } = location.state || {};
    // console.log(someData);

    const [departData, setDepartData] = useState(null)
    const [priotyData, setPriotyData] = useState(null)
    const [relateData, setRelateData] = useState(null)
    const [attachDisable, setAttachDisable] = useState(true)

    const [profileImage, setProfileImage] = useState()
    // console.log(profileImage);
    const [selectedFiles, setSelectedFiles] = useState([]);
    console.log(selectedFiles);

    const [listImage, setListImage] = useState([])

    // console.log(listImage);

    const editor = useRef(null);
    // console.log(editor?.current?.value);
    const [content, setContent] = useState('');
    // console.log(content);

    const [autoFillInitial, setAutoFillInitial] = useState({
        name: '',
        email: "",
        phone: ''
    })

    // console.log(autoFillInitial);

    const [initialData, setInitialData] = useState({
        type: '',
        subject: '',
        service_id: '',
        priority: '',
        description: '',
        attachments: []
    })

    const handleChange = (e) => {
        const clone = { ...initialData }
        const value = e.target.value
        const name = e.target.name
        clone[name] = value
        setInitialData(clone)
    }

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
    const relatService = async () => {
        // try {
        //     const res = await relatedService()
        //     const res2 = await userValidate()
        //     // console.log(res2?.data.email);
        //     setRelateData(res?.data?.data);
        //     setAutoFillInitial({
        //         email: res2?.data?.email,
        //         name: res2?.data?.name,
        //         phone: res2?.data?.mobile
        //     })



        // } catch (error) {

        // }
    }




    const imgs = new FormData();
    const colodinaryImage = async (e) => {
        // setProfileImage(e.target.files[0])
        imgs.append("image", e.target.files[0]);
        const file = profileImage

        const allowedTypes = [
            'video/mp4',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/vnd.ms-excel',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'application/x-rar-compressed',
            'application/x-zip-compressed',
            'application/zip'
        ];
        if (e.target.files[0] && allowedTypes.includes(e.target.files[0].type)) {
            alert('Warning: Only image files are allowed.');
        } else {
            const array = []
            const array2 = [...listImage]

            // for (let ind = 0; ind < e.target.files?.length; ind++) {
            //     try {
            //         const element0 = e.target.files[ind];
            //         imgs.set("image", element0);

            //         const res = await cloudImage(imgs)
            //         // console.log(res?.data?.error == false);

            //         const obj2 = { id: Math.random(), url: res?.data?.data?.url };
            //         array2.push(obj2)

            //         if (res?.data?.error == false) {
            //             setAttachDisable(false)
            //         }
            //         // setshoingLoader(false);
            //     } catch (error) {
            //         console.log(" Image not uploaded");

            //     }
            // }
            setTimeout(() => {
                setListImage(array2)
            }, 1000);
        }
    }

    const toastSuccessMessage = (str) => {
        toast.success(`${str}`, {
            position: "top-center",
            autoClose: 2000,
        })
    };

    const toastSuccessMessage1 = (str) => {
        toast.error(`${str}`, {
            position: "top-center",
            autoClose: 2000,
        })
    };


    const submitData = async () => {
        const maped = listImage.map((ite) => {
            return ite.url
        })
        const clone = { ...initialData, description: editor.current.value, attachments: maped, user_id: window.localStorage.getItem('userIdToken') }
        // console.log(clone);
        // try {
        //     const res = await addTicket(clone)
        //     if (res?.data?.error == false) {
        //         toastSuccessMessage(res?.data?.message)
        //         setTimeout(() => {
        //             navigate('/list-tickets')
        //         }, [2000])
        //     }
        //     if (res?.data?.error == true) {
        //         toastSuccessMessage1(res?.data?.message)
        //     }
        // } catch (error) {

        // }
    }


    const [fileArray, setFileArray] = useState([{ id: Math.random(), url: "" }])
    const AddMore = (item) => {
        const clone = [...fileArray]
        clone.push({ id: Math.random(), url: "" })
        setFileArray(clone);
    }

    const Remove = (id) => {
        const clone = [...listImage]
        const filters = clone.filter((item) => {
            return item.id !== id
        })
        setListImage(filters)
        // setFileArray(clone.filter(item => item.id !== id));
    }

    useEffect(() => {
        depart()
        prioty()
        relatService()
        setInitialData({ ...initialData, service_id: defaultData?.serviceId })
        console.log('kjbjk', defaultData?.serviceId);
    }, [])
    useEffect(() => {

        setInitialData({ ...initialData, service_id: defaultData?.serviceId })
        console.log('kjbjk', defaultData?.serviceId);
    }, [defaultData?.serviceId])
    return (
        <>

            <div className="container">
                <div className="PageHeading">
                    <h1>Add Ticket</h1>
                </div>
                <div className="card">
                    <div className="card-header"><span>Open Ticket</span></div>
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
                                    <label htmlFor="txtUserId">Name <span style={{ color: 'red' }}>*</span></label>
                                    <input type="text" disabled name="name" id="account_no" placeholder="Enter Name" className="form-control" value={autoFillInitial.name} />
                                </div>
                                <div className="form-group col-md-4">
                                    <label htmlFor="txtUserId">Email <span style={{ color: 'red' }}>*</span></label>
                                    <input type="email" disabled name="email" id="account_no" placeholder="Enter email" className="form-control" value={autoFillInitial.email} />
                                </div>
                                <div className="form-group col-md-4">
                                    <label htmlFor="txtUserId">Phone <span style={{ color: 'red' }}>*</span></label>
                                    <input type="text" disabled name="email" id="account_no" placeholder="Enter Phoen" className="form-control" value={autoFillInitial.phone} />
                                </div>
                                <div className="form-group col-md-8">
                                    <label htmlFor="txtUserId">Subject <span style={{ color: 'red' }}>*</span></label>
                                    <input type="text" placeholder="Enter Subject" name="subject" id="account_no" className="form-control" value={initialData.subject} onChange={handleChange} />
                                </div>

                                <div className="form-group col-md-4">
                                    <label htmlFor="txtUserId">Department <span style={{ color: 'red' }}>*</span></label>
                                    <select class="form-select" name="type" onChange={handleChange}>
                                        <option selected disabled>Select Type</option>
                                        {departData && departData?.map((item) => {
                                            return <option value={item?._id}>{item?.department}</option>
                                        })}
                                    </select>
                                </div>
                                <div className="form-group col-md-4">
                                    <label htmlFor="txtUserId">Related Service <span style={{ color: 'red' }}>*</span></label>
                                    <select class="form-select" name="service_id" value={initialData?.service_id} onChange={handleChange}>
                                        <option selected disabled>Select Type</option>
                                        {relateData && relateData?.map((item) => {
                                            return <option value={item?._id}>{item?.service_name}</option>
                                        })}
                                    </select>
                                </div>
                                <div className="form-group col-md-4">
                                    <label htmlFor="txtUserId">Priority <span style={{ color: 'red' }}>*</span></label>
                                    <select class="form-select" name="priority" onChange={handleChange}>
                                        <option selected disabled>Select Type</option>
                                        {priotyData && priotyData?.map((item) => {
                                            return <option value={item?._id}>{item?.priority}</option>
                                        })}

                                    </select>
                                </div>
                                <div className="form-group col-md-12">
                                    <label htmlFor="txtUserId">Message <span style={{ color: 'red' }}>*</span></label>
                                    <JoditEditor
                                        ref={editor}
                                        value={content}
                                        // config={config}
                                        // tabIndex={1} // tabIndex of textarea
                                        // onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                                        onChange={newContent => setContent(newContent)}
                                    />
                                </div>

                                <div className="form-group form-group-img col-md-8">
                                    {/* <label htmlFor="txtUserId">Attach </label>
                                    <input type="file" placeholder="Enter Subject" name="attachments" id="account_no" className="form-control mr-4" multiple onChange={colodinaryImage} /> */}
                                    <input type="file" class="input-file" id="file" name="attachments" multiple onChange={colodinaryImage} />
                                    <label for="file" class="btn btn-upload" style={{ marginBottom: '0px' }}>
                                        Choose File
                                        <FaCloudUploadAlt />
                                    </label>
                                </div>



                                {/* {fileArray && fileArray?.map((item, i) => {
                                    return <div className="form-group col-md-12">
                                        <label htmlFor="txtUserId">Attach <span style={{ color: 'red' }}>*</span></label>
                                        <div className="d-flex">

                                            {i == 0 ? <button type="button" className="btn btn-warning" style={{ width: '24%' }} onClick={AddMore}>Add More</button> : <button type="button" className="btn btn-danger" style={{ width: '24%' }} onClick={() => Remove(item?.id)}>Remove</button>}
                                        </div>
                                    </div>
                                })} */}
                                <div className="form-group col-md-4">
                                    <label>&nbsp;</label>
                                    <button type="button" style={{ width: '100%' }} disabled={!initialData.subject || !editor.current.value || !initialData.priority || !initialData.type || !initialData.service_id} className={`btn ${!initialData.subject || !editor.current.value || !initialData.priority || !initialData.type || !initialData.service_id ? 'commonbotton_disable' : 'btn-primary'} mr-3`} onClick={submitData}>Submit</button>
                                </div>

                                {/* {listImage && listImage?.map((item) => (
                                    <div className="col-lg-3 col-md-4 col-sm-6 img-shoe-set mb-3" key={item?.id} style={{ height: '155px', position: 'relative' }}>
                                        <img src={`${baseUrlImage}${item?.url}`} alt="" style={{ height: '100%', width: "100%", objectFit: 'cover', borderRadius: '5px' }} />
                                        <div className="crose-icon" style={{ position: 'absolute', top: '10px', right: '10px', cursor: 'pointer' }}>
                                            <RxCrossCircled onClick={() => { Remove(item.id) }} style={{ color: 'red', fontSize: '1.5rem' }} />
                                        </div>
                                    </div>
                                ))} */}
                            </div>
                        </form>
                    </div>
                </div >
            </div >
            <ToastContainer />
        </>
    )
}
export default AddTicket