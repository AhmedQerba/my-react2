import SideBar from "../../Components/SideBar";
import TopBar from "../../Components/TopBar";

import { Outlet } from "react-router-dom";

export default function Dashboard() {
  return (
    <div>
      <TopBar />
      <div className="content-flex">
        <SideBar />
        <div style={{ width: "80%" }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
