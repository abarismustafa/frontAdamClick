// import { useEffect } from "react";
// import axios from "axios";
// import { base_url } from "../../server";
// const UseStatisticTracker = (extraData = {}) => {
//     const baseUrl = base_url();
//     useEffect(() => {
//         const token = window.localStorage.getItem("token");
//         const sendStatistic = async () => {
//             try {
//                 const res = await fetch("https://ipapi.co/json/");
//                 const data = await res.json();
//                 const payload = {
//                     ipAddress: data.ip || "",
//                     long: data.longitude || "",
//                     lat: data.latitude || "",
//                     city: data.city || "",
//                     country: data.country_name || "",
//                     region: data.region || "",
//                     page: extraData.page || "",
//                     category_id: extraData.category_id || "",
//                     industry_id: extraData.industry_id || "",
//                     blog_id: extraData.blog_id || "",
//                 };


//                 await axios.post(`${baseUrl}statisticIp/create`, payload, {
//                     headers: {
//                         "Content-type": "application/json; charset=UTF-8",
//                         Authorization: `Bearer ${token}`,
//                     },
//                 });

//                 console.log("📊 Statistic sent:", payload);
//             } catch (err) {
//                 console.error("❌ Error sending statistic:", err);
//             }
//         };

//         sendStatistic();
//     }, [extraData.page]);
// }

// export default UseStatisticTracker



import axios from "axios";
import { base_url } from "../../server";

const UseStatisticTracker = async (extraData = {}) => {
    const baseUrl = base_url();

    try {
        const token = window.localStorage.getItem("token");
        const res = await fetch("https://ipapi.co/json/");
        const data = await res.json();

        const payload = {
            ipAddress: data.ip || "",
            long: data.longitude || "",
            lat: data.latitude || "",
            city: data.city || "",
            country: data.country_name || "",
            region: data.region || "",
            page: extraData.page || "",
            category_id: extraData.category_id || "",
            industry_id: extraData.industry_id || "",
            blog_id: extraData.blog_id || "",
        };

        await axios.post(`${baseUrl}statisticIp/create`, payload, {
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                Authorization: `Bearer ${token}`,
            },
        });

        console.log("📊 Statistic sent:", payload);
    } catch (err) {
        console.error("❌ Error sending statistic:", err);
    }
};

export default UseStatisticTracker;
