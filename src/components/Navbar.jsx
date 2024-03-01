import { useCookies } from "react-cookie";
import Logo from "../assets/logo.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
function NavBar() {
  const [cookies, setCookie, removeCookie] = useCookies([
    "cookie",
    "isStaff",
    "ManageAdmins",
  ]);
  const navigate = useNavigate();
  const onLogout = () => {
    Swal.fire({
      title: "Are you sure to Log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout",
    }).then((result) => {
      if (result.isConfirmed) {
        removeCookie("cookie");
        removeCookie("isStaff");
        removeCookie("canAccept");
        removeCookie("canReject");
        removeCookie("canInProgress");
        removeCookie("canClose");
        removeCookie("userId");
        removeCookie("manageAdmins");
        navigate("/signIn");
        Swal.fire({
          title: "Logged out successfuly!",
          icon: "success",
        });
      }
    });
  };
  const [ManageAdminsButton, setManageAdminsButton] = useState();
  const canManageAdmins = Cookies.get("manageAdmins");
  useEffect(() => {
    if (canManageAdmins === "true") {
      setManageAdminsButton(
        <Link className="btn btn-primary" to={"/admins"}>
          Manage Admins
        </Link>
      );
    } else {
      setManageAdminsButton();
    }
  }, []);
  return (
    <nav className="navbar navbar-expand-lg bg-dark">
      <div className="container-fluid">
        <div className="d-flex justify-content-between w-100 h-50">
          <img src={Logo} width={50} />
          <div className="d-flex align-items-center gap-3 pe-5">
            {ManageAdminsButton}
            <Link to={"/"} className="btn btn-light">
              Complaints
            </Link>
            <button className=" btn btn-danger" onClick={onLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
export default NavBar;
