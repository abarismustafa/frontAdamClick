import React, { useEffect, useState } from "react";

const PdfCanvasViewer = ({ url, title }) => {
    // const [isPdf, setIsPdf] = useState(false);
    // const [iframeSrc, setIframeSrc] = useState("");

    // useEffect(() => {
    //     if (!url) return;

    //     const ext = url.split(".").pop().toLowerCase();
    //     const pdfCheck = ext === "pdf";
    //     setIsPdf(pdfCheck);

    //     // ✅ For PDFs → use iframe with google viewer to bypass CORS safely
    //     if (pdfCheck) {
    //         const encoded = encodeURIComponent(url);
    //         const googleViewer = `https://docs.google.com/gview?embedded=true&url=${encoded}`;
    //         setIframeSrc(googleViewer);
    //     } else {
    //         setIframeSrc(url);
    //     }
    // }, [url]);


    const ext = url.split(".").pop().toLowerCase();
    const isPdf = ext === "pdf";
    const [iframeSrc, setIframeSrc] = useState("");

    useEffect(() => {
        if (isPdf) {
            const encoded = encodeURIComponent(url);
            const googleViewer = `https://docs.google.com/gview?embedded=true&url=${encoded}`;
            setIframeSrc(googleViewer);
        } else {
            setIframeSrc(url);
        }
    }, [url]);

    return (
        <div
            style={{
                border: "1px solid #eee",
                borderRadius: 12,
                overflow: "hidden",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                background: "#fff",
                userSelect: "none",
            }}
            onContextMenu={(e) => e.preventDefault()}
        >
            <div style={{ padding: "10px 12px", borderBottom: "1px solid #f0f0f0" }}>
                <h3 style={{ margin: 0, fontSize: 16 }}>{title}</h3>
            </div>

            <div
                style={{
                    minHeight: 400,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#fafafa",
                }}
            >
                {!iframeSrc ? (
                    <p>Loading...</p>
                ) : isPdf ? (
                    <iframe
                        src={iframeSrc}
                        title={title}
                        style={{
                            width: "100%",
                            height: 500,
                            border: "none",
                        }}
                        sandbox="allow-same-origin allow-scripts"
                    ></iframe>
                ) : (
                    <img
                        src={iframeSrc}
                        alt={title}
                        style={{
                            width: "100%",
                            height: 500,
                            objectFit: "cover",
                            display: "block",
                        }}
                        draggable={false}
                        onContextMenu={(e) => e.preventDefault()}
                    />
                )}
            </div>
        </div>

        // <div
        //     style={{
        //         position: "sticky",
        //         top: 0,
        //         height: "100vh",
        //         background: "#fff",
        //         borderRadius: "12px",
        //         overflow: "hidden",
        //         boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
        //         userSelect: "none",
        //     }}
        //     onContextMenu={(e) => e.preventDefault()}
        // >
        //     {isPdf ? (
        //         <iframe
        //             src={iframeSrc}
        //             title="PDF Viewer"
        //             style={{
        //                 width: "100%",
        //                 height: "100%",
        //                 border: "none",
        //             }}
        //             sandbox="allow-same-origin allow-scripts"
        //         ></iframe>
        //     ) : (
        //         <img
        //             src={iframeSrc}
        //             alt="Report Image"
        //             style={{
        //                 width: "100%",
        //                 height: "100%",
        //                 objectFit: "cover",
        //                 display: "block",
        //             }}
        //             draggable={false}
        //             onContextMenu={(e) => e.preventDefault()}
        //         />
        //     )}
        // </div>
    );
};

export default PdfCanvasViewer;
