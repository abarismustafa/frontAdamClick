import { Outlet } from "react-router-dom"
import AsideBar from "../../components/dashbord/AsideBar"


function DashbordCustomer({showSidebar}) {
    return <section className="py-5" style={{ backgroundColor: "#f2f3f8" }}>
        <div className="container">
            <div className="d-flex align-items-start">
                <AsideBar showSidebar={showSidebar} />
                <Outlet></Outlet>
            </div>
        </div>
    </section>
}
export default DashbordCustomer