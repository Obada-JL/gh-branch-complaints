import { Outlet } from "react-router-dom";
import NavBar from "./Navbar";

function PageLayout() {
  return (
    <div>
      <NavBar />
      <div>
        <Outlet />
      </div>
    </div>
  );
}
export default PageLayout;
