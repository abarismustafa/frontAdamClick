

import Accordion from 'react-bootstrap/Accordion';
import { MdEdit } from "react-icons/md";
import { useEffect, useMemo, useRef, useState } from "react";
import JoditEditor from 'jodit-react';

import { ToastContainer, toast } from 'react-toastify';
import { RxCrossCircled } from "react-icons/rx";
import { FaCloudUploadAlt } from "react-icons/fa";
import { base_url } from '../../../server';
import axios from 'axios';

function Replay({ id, ticketUser }) {
    const token = window.localStorage.getItem("token");
    const baseUrl = base_url();
    const editor = useRef(null);
    const [content, setContent] = useState('');
    console.log(content);

    const [attachDisable, setAttachDisable] = useState(true)
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [listImage, setListImage] = useState([])
    const [accordionOpen, setAccordionOpen] = useState("0");

    // console.log(listImage);
    // console.log(selectedFiles);

    const [autoFillInitial, setAutoFillInitial] = useState({
        name: '',
        email: "",
        phone: ''
    })

    const [initialdata, setInitialData] = useState({
        chat: '',
        dispute_id: '',
        attachments: []
    })


    const dataDefault = async () => {
        try {
            // const res = await userValidate()
            const res = await axios.get(`${baseUrl}user/profile`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setAutoFillInitial({
                email: res?.data?.getaUser?.email,
                name: `${res?.data?.getaUser?.firstname || ""} ${res?.data?.getaUser?.lastname || ""}`.trim(),
                phone: res?.data?.getaUser?.mobile
            })
        } catch (error) {

        }
    }

    const imgs = new FormData();
    const colodinaryImage = async (e) => {
        // setProfileImage(e.target.files[0])
        imgs.append("image", e.target.files[0]);
        // const file = profileImage

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

            for (let ind = 0; ind < e.target.files?.length; ind++) {
                try {
                    const element0 = e.target.files[ind];
                    imgs.set("image", element0);

                    // const res = await cloudImage(imgs)
                    // console.log(res?.data?.error == false);
                    const res = await axios.post(
                        `${baseUrl}/image/addImage`,
                        imgs
                    );

                    const obj2 = { id: Math.random(), url: res?.data?.url };
                    array2.push(obj2)

                    if (res?.data?.error == false) {
                        setAttachDisable(false)
                    }
                    // setshoingLoader(false);
                } catch (error) {
                    console.log(" Image not uploaded");

                }
            }
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
        // debugger
        const chatValue =
            editor.current?.editor?.innerHTML || "";
        console.log(chatValue);

        const maped = listImage.map((ite) => {
            return ite.url
        })
        const clone = { ...initialdata, chat: editor.current.value, attachments: maped, dispute_id: id, user_id: window.localStorage.getItem('token') }
        console.log(clone);

        try {
            // const res = await repayTicket(clone)
            const res = await axios.post(`${baseUrl}dmtdisputeChat/add_dispute/public`, clone, {
                headers: { Authorization: `Bearer ${token}` },
            });
            // console.log(res);
            // toastSuccessMessage
            if (res?.data?.error == false) {
                toastSuccessMessage(res?.data?.message)
                ticketUser(0)
                resetForm()
            }
            if (res?.data?.error == true) {
                toastSuccessMessage1(res?.data?.message)
            }
        } catch (error) {

        }
    }

    const resetForm = () => {
        setContent('');
        setListImage([]);
        setAccordionOpen("1"); // close the accordion
        setTimeout(() => {
            setAccordionOpen(""); // reset accordion key to default
        }, 0);
    };


    const Remove = (id) => {
        const clone = [...listImage]
        const filters = clone.filter((item) => {
            return item.id !== id
        })
        setListImage(filters)
        // setFileArray(clone.filter(item => item.id !== id));
    }

    useEffect(() => {
        dataDefault()
    }, [])


    // const [fileArray, setFileArray] = useState([{ id: Math.random(), url: "" }])
    // const AddMore = (item) => {
    //     const clone = [...fileArray]
    //     clone.push({ id: Math.random(), url: "" })
    //     setFileArray(clone);
    // }

    // const Remove = (id) => {
    //     const clone = [...fileArray]
    //     const filters = clone.filter((item) => {
    //         return item.id !== id
    //     })

    //     setFileArray(filters)

    //     // setFileArray(clone.filter(item => item.id !== id));
    // }

    const config = {
        readonly: false,
        height: 400,
        defaultMode: "1",  // WYSIWYG mode
        toolbarAdaptive: false,
        style: {
            color: "black !important",
            background: "white !important",
        },
    };
    return (
        <>
            <div className='col-lg-12'>
                <Accordion className='replay-accorddian'>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header style={{ fontWeight: '700' }}><MdEdit className='mr-2' style={{ fontWeight: '700' }} /> Reply</Accordion.Header>
                        <Accordion.Body style={{ backgroundColor: 'white' }}>
                            <form action="" method="post" name="frmReport" id="frmReport">
                                <input type="hidden" id="hidID" name="hidID" />
                                <div className="row" style={{ alignItems: 'end' }}>

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
                                    <div className="form-group col-md-12">
                                        <label htmlFor="txtUserId">Message <span style={{ color: 'red' }}>*</span></label>
                                        {/* <JoditEditor
                                            ref={editor}
                                            // value={content}
                                            config={config}
                                            // onBlur={(newContent) => setContent(newContent)}
                                            // config={config}
                                            // tabIndex={1} // tabIndex of textarea
                                            // onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                                            // onChange={newContent => setContent(newContent)}
                                            onChange={() => { }}
                                        /> */}

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
                                        <div className="d-flex">
                                            <input type="file" placeholder="Enter Subject" name="search" id="account_no" multiple className="form-control mr-4" style={{ width: '900px' }} onChange={colodinaryImage} />
                                        </div> */}
                                        <input type="file" class="input-file" id="file" name="search" multiple onChange={colodinaryImage} />
                                        <label for="file" class="btn btn-upload" style={{ marginBottom: '0px' }}>
                                            Choose File
                                            <FaCloudUploadAlt />
                                        </label>
                                    </div>
                                    <div className="form-group col-md-4">
                                        <label>&nbsp;</label>
                                        <button type="button" className="btn btn-primary mr-3" style={{ width: '100%' }} onClick={submitData}>Submit</button>
                                    </div>

                                    {listImage && listImage?.map((item) => {
                                        return <div className="col-lg-2 img-shoe-set" key={item?.id}>
                                            <img src={`${item?.url}`} alt="" style={{ height: '100%', width: "100%" }} />
                                            <div className="crose-icon">
                                                <RxCrossCircled onClick={() => { Remove(item.id) }} />
                                            </div>
                                        </div>
                                    })}



                                </div>
                            </form>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </div>
            <ToastContainer />
        </>
    )
}
export default Replay