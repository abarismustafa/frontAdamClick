

// import React from "react";
// import { useLocation } from "react-router-dom";
// import UseStatisticTracker from "./common/useStatisticTracker/UseStatisticTracker";


// const StatisticTrackerWrapper = () => {
//     const location = useLocation();

//     const currentPath = location.pathname.replace("/", "") || "home";

//     UseStatisticTracker({ page: currentPath });

//     return null;
// };

// export default StatisticTrackerWrapper;


import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import UseStatisticTracker from "./common/useStatisticTracker/UseStatisticTracker";

const StatisticTrackerWrapper = () => {
    const location = useLocation();
    const currentPath = location.pathname.replace("/", "") || "home";

    // ✅ manually trigger custom hook re-run using useEffect
    useEffect(() => {
        UseStatisticTracker({ page: currentPath });
    }, [currentPath]);

    return null;
};

export default StatisticTrackerWrapper;
