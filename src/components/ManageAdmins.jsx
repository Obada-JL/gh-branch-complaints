import Logo from "../assets/logo.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import ModalComponent from "./AddComplaint";
import Cookies from "js-cookie";
import "./MainPage.css";
import AdminDetails from "./AdminDetails";
import AddAdmin from "./AddAdmin";
import { useAuth } from "../AppContext";
const token = Cookies.get("cookie");
function AdminPage() {
  const modalStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "50%",
      transform: "translate(-50%,-50%)",
      border: "none",
      padding: "0px",
      borderRadius: " 10px",
      width: "400px",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
  };
  const [tableContent, setTableContent] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const [AdminData, setAdminData] = useState({});
  const handleDetailOpenModal = (e) => {
    setAdminData(e);
    setIsDetailModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsDetailModalOpen(false);
  };
  const tableBody = useRef();

  const [loading, setLoading] = useState(false);

  const submitHandler = (record) => {
    const Values = {
      name: record.name,
      phoneNumber: record.phoneNumber,
      email: record.email,
      password: record.password,
      category: record.category,
      canAccept: record.canAccept,
      canReject: record.canReject,
      canInProgress: record.canInProgress,
      canClose: record.canClose,
      manageAdmins: record.manageAdmins,
    };

    fetch("https://complaintapi.kodunya.com/api/Users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(Values),
    })
      .then((response) => response.json())
      .then((data) => {})
      .catch((error) => {
        console.error("Error during the fetch operation:", error);
      });
    handleCloseModal();
  };
  const DeleteAdmins = (data) => {
    const adminId = data.currentTarget.closest("tr").id;
    fetch(`https://complaintapi.kodunya.com/api/Users/${adminId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            setTimeout(() => {
              window.location.reload(true);
            }, 2000);
          }
        });
      });
  };
  useEffect(() => {
    setLoading(true);
    fetch("https://complaintapi.kodunya.com/api/Users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        data.forEach((admin) => {
          let premissionsArray = [];
          if (admin.canAccept) {
            premissionsArray.push("Accept" + " , ");
          } else {
          }
          if (admin.canReject) {
            premissionsArray.push("Reject" + " , ");
          }
          if (admin.canInProgress) {
            premissionsArray.push("In Progress" + " , ");
          } else {
          }
          if (admin.canClose) {
            premissionsArray.push("Close" + " , ");
          } else {
          }
          if (admin.manageAdmins) {
            premissionsArray.push("Manage Admins" + " , ");
          } else {
          }
          setTableContent((prevContent) => [
            <tr id={admin.id}>
              <td>{admin.name}</td>
              <td>{admin.email}</td>
              <td>{admin.phoneNumber}</td>
              <td>{premissionsArray}</td>
              <td>
                <FontAwesomeIcon
                  icon={faPenToSquare}
                  className="bg-warning p-1  rounded-start rounded-end text-white me-1"
                  onClick={() =>
                    handleDetailOpenModal({
                      name: admin.name,
                      email: admin.email,
                      phoneNumber: admin.phoneNumber,
                      permissions: premissionsArray,
                      id: admin.id,
                    })
                  }
                  style={{ cursor: "pointer" }}
                />
                <FontAwesomeIcon
                  icon={faTrashCan}
                  className="bg-danger p-1  rounded-start rounded-end text-white"
                  onClick={DeleteAdmins}
                  style={{ cursor: "pointer" }}
                />
              </td>
            </tr>,
            ...prevContent,
          ]);
        });
        {
          tableContent.slice(Math.ceil(tableContent.length / 2));
        }
        return;
      })
      .catch((error) => {
        console.error("Error during the fetch operation:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  const [table, setTable] = useState(<div className="custom-loader"></div>);
  useEffect(() => {
    if (loading === true) {
      setTable(<div className="custom-loader"></div>);
    } else {
      setTable(tableContent.slice(0, Math.ceil(tableContent.length) / 2));
    }
  }, [loading, tableContent]);

  return (
    <>
      <div className="d-flex flex-column w-100 justify-content-center align-items-center mt-3">
        <h1>All Admins</h1>
      </div>
      <div className="mt-5 ms-5 me-5 d-flex justify-content-between  border-bottom border-dark pb-3 border-3 rounded-start rounded-end">
        <button
          type="button"
          className="btn btn-success ms-3"
          onClick={handleOpenModal}
        >
          Add Admins <span>&#43;</span>
        </button>
      </div>
      <table className="table table-hover table-striped mt-5 ">
        <tbody ref={tableBody}>
          <tr className="border-0 border-bottom border-3 border-dark">
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Premissions</th>
            <th></th>
          </tr>
          {/* {tableContent.slice(Math.ceil(tableContent.length / 2))} */}
          {table}
        </tbody>
      </table>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Modal"
        style={modalStyles}
      >
        <AddAdmin onCancel={handleCloseModal} onSubmit={submitHandler} />
      </Modal>
      <Modal
        isOpen={isDetailModalOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Modal"
        style={modalStyles}
      >
        <AdminDetails onCancel={handleCloseModal} data={AdminData} />
      </Modal>
    </>
  );
}

export default AdminPage;
