import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { AiFillDelete, AiOutlineEdit } from "react-icons/ai";
import { GrView } from "react-icons/gr";
import DetailPage from "./DetailPage";
import AddTicketReply from "./AddTicketReply";

function TicketCartList({ deleteData, data, t,getData }) {

    const [state, setState] = useState(false)
    const [idsh, setIds] = useState(null)
    const openDetailPage = (id) => {
        setState(true)
        setIds(id)
    }

    const [modalShow, setModalShow] = useState(false);
    const manageOpen = () => {
        setModalShow(true)
        setState(false)
    }
    const changeOpenSeting = () => {
        setModalShow(false)
        setState(true)
    }
    return <div>
        <div className="fisherman-content">
            <h5 className="mb-0 h6">{t('Tickets')}</h5>
        </div>
        <div className="table-responsive">
            <table
                className="table "
                
            >
                <thead>
                    <tr className="footable-header">
                        <th
                            data-breakpoints="lg"
                            className="footable-first-visible"
                            style={{ display: "table-cell" }}
                        >
                            #
                        </th>
                        <th data-breakpoints="lg" style={{ display: "table-cell" }}>
                            {t('Sending Date')}
                        </th>
                        <th style={{ display: "table-cell" }}>{t('Subject')}</th>
                        <th style={{ display: "table-cell" }}>{t('Status')}</th>
                        <th
                            data-breakpoints="lg"
                            className="footable-last-visible"
                            style={{ display: "table-cell" }}
                        >
                            {t('Options')}
                        </th>
                    </tr>
                </thead>
                <tbody>

                    {data && data.map((item, i) => {
                        return <tr key={i}>
                            <td
                                className="footable-first-visible"
                                style={{ display: "table-cell" }}
                            >
                                {1 + i}
                            </td>
                            <td style={{ display: "table-cell" }}>{item?.createdAt}</td>
                            <td style={{ display: "table-cell" }}>
                                {item?.subject}
                            </td>
                            <td style={{ display: "table-cell" }}>
                                {item?.status}
                            </td>

                            <td
                                className="footable-last-visible"
                                style={{ display: "table-cell" }}
                            >
                                <GrView onClick={() => { openDetailPage(item._id) }} />
                                <AiOutlineEdit style={{ margin: "0 15px" }} />
                                <AiFillDelete onClick={() => deleteData(item._id)} />
                            </td>
                        </tr>
                    })}

                </tbody>
            </table>
            <div className="aiz-pagination"></div>
        </div>

        {state && <DetailPage
            show={state}
            onHide={() => setState(false)}
            manageOpen={manageOpen}
            id={idsh}
        />}

        {modalShow && <AddTicketReply
            show={modalShow}
            idsh={idsh}
            onHide={changeOpenSeting}
            getData={getData}
        />}
    </div>
}
export default TicketCartList