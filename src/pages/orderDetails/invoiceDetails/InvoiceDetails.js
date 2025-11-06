import React, { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "./InvoiceDetails.css";

const InvoiceDetails = ({ data, handleDownload, printRef }) => {
    // const printRef = useRef();
    const invoice = data?.[0];
    console.log(invoice);



    const billing = invoice?.billing || {};
    const shipping = invoice?.shipping || {};
    const product = invoice?.products?.[0] || {};
    const productInfo = product?.productId || {};
    const price = product?.price || {};
    const currency = invoice?.currency?.[0]?.code || "₹";

    const subtotal = invoice?.subTotal?.toFixed(2) || "0.00";
    const tax = invoice?.tax?.toFixed(2) || "0.00";
    const total = invoice?.grandTotal?.toFixed(2) || "0.00";

    const invoiceDate = new Date(invoice?.invoiceDate).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
    // console.log(invoice);


    return (
        // <div className="invoice-page">
        //     <button className="download-btn" onClick={handleDownload}>
        //         Download Invoice PDF
        //     </button>

        <div className="invoice-wrapper" ref={printRef}>
            <h3 className="center bold underline">TAX INVOICE</h3>

            <table className="invoice-table full">
                <tbody>
                    <tr>
                        <td colSpan="6" className="center bold">
                            SHOPPERCLUE WEBTRADE INDIA PRIVATE LIMITED
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="6" className="center small">
                            D2/1B Basement Ardee City Sector 52 Gurgaon Haryana-122003 <br />
                            Email: adamclickshop@gmail.com <br />
                            GSTIN No: 06AAWCS3410K1ZI
                        </td>
                    </tr>
                </tbody>
            </table>

            <table className="invoice-table full">
                <tbody>
                    <tr>
                        <td className="bold" style={{ width: "50%" }}>
                            Bil to:
                            <br />
                            {billing.firstname} {billing.lastname} <br />
                            {billing.addressLine1}, {billing.city}, {billing.state}, {billing.zip} <br />
                            {billing.country} <br />
                            Email: {billing.email} <br />
                            Phone: {billing.phone} <br />

                            Ship to:
                            <br />
                            {shipping.bfirstname} {shipping.blastname} <br />
                            {shipping.baddressLine1}, {shipping.bcity}, {shipping.bstate}, {shipping.bzip} <br />
                            {shipping.bcountry} <br />
                            Email: {shipping.bemail} <br />
                            Phone: {shipping.bmobile}
                        </td>
                        <td className="bold" style={{ width: "50%" }}>
                            Place of Supply:
                            <br />
                            {/* Three Daughters Co. <br />
                                Ground Floor D2 Lane 1B Ardee City Sector 52 Gurgaon Haryana 122002 */}
                            {shipping.bstate || billing.state}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            GSTIN No.: 06CTFPN6282H1ZT
                        </td>
                        <td>
                            Invoice No.: {invoice?.invoiceNo} <br />
                            Dated: {invoiceDate}<br />
                            Vehicle No.: HR26DE2935 ,
                            Payment Type: {invoice?.payment_type === "Payment Gateway" ? "Prepaid" : invoice?.payment_type}
                        </td>
                    </tr>
                </tbody>
            </table>

            <table className="invoice-table bordered">
                <thead>
                    <tr>
                        <th>Description of Goods/Services</th>
                        <th>HSN Code</th>
                        <th>Qty.</th>
                        {/* <th>Units</th> */}
                        <th>Rate</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {invoice?.products?.map((item, i) => (
                        <tr key={i}>
                            <td>{item?.productId?.name}</td>
                            <td>{item?.price?.hsn_code}</td>
                            <td>{item?.qty}</td>
                            {/* <td>{item?.productId?.unit}</td> */}
                            <td>{currency} {item?.price?.sale_rate?.toFixed(2)}</td>
                            <td>{currency} {(item?.subTotal || 0).toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <table className="invoice-table full totals">
                <tbody>
                    <tr>
                        <td className="right">Taxable Value</td>
                        <td className="right">{currency} {subtotal}</td>
                    </tr>
                    <tr>
                        <td className="right">Add: SGST </td>
                        <td className="right">{invoice?.sgst ? invoice?.sgst : '0'}</td>
                    </tr>
                    <tr>
                        <td className="right">Add: CGST </td>
                        <td className="right">{invoice?.cgst ? invoice?.cgst : '0'}</td>
                    </tr>
                    <tr>
                        <td className="right">Add: IGST </td>
                        <td className="right">{invoice?.products[0]?.igst ? invoice?.products[0]?.igst : '0'}</td>
                    </tr>
                    <tr>
                        <td className="right bold">Total</td>
                        <td className="right bold">{currency} {total}</td>
                    </tr>
                </tbody>
            </table>

            <div className="footer-section">
                <p style={{ margin: '0' }}>
                    <strong>Amount Chargeable (in words):</strong>  {convertNumberToWords(total)} ONLY
                </p>

                <p style={{ margin: '0' }}>
                    <strong>BANK DETAILS:</strong><br />
                    SHOPPERCLUE WEBTRADE INDIA PVT LTD <br />
                    ACCOUNT NO. 43201500168 <br />
                    IFSC CODE: ICIC0004321 <br />
                    BRANCH: SECTOR 37D GURGAON
                </p>

                <p style={{ margin: '0' }}>
                    <em>Note: Please make cheques in favor of "SHOPPERCLUE WEBTRADE INDIA PRIVATE LIMITED"</em>
                </p>

                <div className="sign-section m-0" >
                    <p>For SHOPPERCLUE WEBTRADE INDIA PRIVATE LIMITED</p>
                    <div className="sign-box">
                        <p>Authorised Signatory</p>
                    </div>
                </div>

                <div className="footer-bottom d-flex">
                    <p>Shopperclue Webtrade India Pvt Ltd is the registered Trademark owner of BAOFENG</p>
                    <img style={{ width: '100px' }} src="https://res.cloudinary.com/duncu6k7b/image/upload/v1759318099/nj7xpcor7944mvchpqwk.png" alt="" />
                </div>
            </div>
        </div>
        // </div >
    );
}

function convertNumberToWords(num) {
    if (!num) return "";
    const a = [
        "", "ONE", "TWO", "THREE", "FOUR", "FIVE", "SIX", "SEVEN",
        "EIGHT", "NINE", "TEN", "ELEVEN", "TWELVE", "THIRTEEN",
        "FOURTEEN", "FIFTEEN", "SIXTEEN", "SEVENTEEN", "EIGHTEEN", "NINETEEN"
    ];
    const b = ["", "", "TWENTY", "THIRTY", "FORTY", "FIFTY", "SIXTY", "SEVENTY", "EIGHTY", "NINETY"];
    const n = parseInt(num, 10);
    if (isNaN(n)) return "";
    if (n === 0) return "ZERO";
    if (n < 20) return a[n];
    if (n < 100) return b[Math.floor(n / 10)] + (n % 10 ? " " + a[n % 10] : "");
    if (n < 1000)
        return (
            a[Math.floor(n / 100)] +
            " HUNDRED " +
            (n % 100 !== 0 ? "AND " + convertNumberToWords(n % 100) : "")
        );
    return n.toString();
}

export default InvoiceDetails