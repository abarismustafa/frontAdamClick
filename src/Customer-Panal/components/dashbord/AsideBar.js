import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
// import '../../custumerAssest/custom_style.css'

function AsideBar({showSidebar}) {
  const [state, setState] = useState(false);
  const [auction, setAution] = useState(false);

  return (
    <>
      <div className="left_aside">
        <div className="profile">
          sdfsdf
        </div>
        <div>
          
        </div>
      </div>
    </>
  );
    
}
export default AsideBar;
