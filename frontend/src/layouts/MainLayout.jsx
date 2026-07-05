import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div>
      <Navbar />

      <div className="min-h-screen">
        <Outlet />
      </div>
    </div>
  );
}

export default MainLayout;