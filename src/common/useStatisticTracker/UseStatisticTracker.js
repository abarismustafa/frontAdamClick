

import axios from "axios";
import { base_url } from "../../server";

const UseStatisticTracker = async (extraData = {}) => {
    const baseUrl = base_url();

    try {
        const token = window.localStorage.getItem("token");

        let cachedData = JSON.parse(sessionStorage.getItem("ip_data"));


        if (!cachedData) {

            const res = await fetch("https://ipapi.co/json/");
            const data = await res.json();

            cachedData = {
                ip: data.ip || "",
                longitude: data.longitude || "",
                latitude: data.latitude || "",
                city: data.city || "",
                country_name: data.country_name || "",
                region: data.region || "",
                timestamp: Date.now(),
            };


            sessionStorage.setItem("ip_data", JSON.stringify(cachedData));
            // console.log(cachedData);
        } else {
            console.log("🗂 Cached IP/location", cachedData);
        }


        const lastPage = sessionStorage.getItem("last_stat_page");
        if (lastPage === window.location.pathname) {
            // console.log("✅ इस पेज का डेटा पहले ही भेजा जा चुका है");
            return;
        }
        sessionStorage.setItem("last_stat_page", window.location.pathname);


        const payload = {
            ipAddress: cachedData.ip || "",
            long: cachedData.longitude || "",
            lat: cachedData.latitude || "",
            city: cachedData.city || "",
            country: cachedData.country_name || "",
            region: cachedData.region || "",
            page: extraData.page || window.location.pathname,
            category_id: extraData.category_id || "",
            industry_id: extraData.industry_id || "",
            blog_id: extraData.blog_id || "",
            product_id: extraData.product_id || ""
        };


        await axios.post(`${baseUrl}statisticIp/create`, payload, {
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                Authorization: `Bearer ${token}`,
            },
        });

        // console.log( payload);
    } catch (err) {
        // console.error( err);
    }
};

export default UseStatisticTracker;



// import axios from "axios";
// import { base_url } from "../../server";

// const UseStatisticTracker = async (extraData = {}) => {
//     const baseUrl = base_url();

//     try {
//         const token = window.localStorage.getItem("token");
//         const res = await fetch("https://ipapi.co/json/");
//         const data = await res.json();

//         const payload = {
//             ipAddress: data.ip || "",
//             long: data.longitude || "",
//             lat: data.latitude || "",
//             city: data.city || "",
//             country: data.country_name || "",
//             region: data.region || "",
//             page: extraData.page || "",
//             category_id: extraData.category_id || "",
//             industry_id: extraData.industry_id || "",
//             blog_id: extraData.blog_id || "",
//         };

//         await axios.post(`${baseUrl}statisticIp/create`, payload, {
//             headers: {
//                 "Content-type": "application/json; charset=UTF-8",
//                 Authorization: `Bearer ${token}`,
//             },
//         });

//         console.log("📊 Statistic sent:", payload);
//     } catch (err) {
//         console.error("❌ Error sending statistic:", err);
//     }
// };

// export default UseStatisticTracker;
