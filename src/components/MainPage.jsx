import Logo from "../assets/logo.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCodeCommit,
  faPenToSquare,
  faTrashCan,
  faArrowDownAZ,
  faSort,
  faSortDown,
  faSortUp,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import ModalComponent from "./AddComplaint";
import DetailPage from "./DetailPage";
import { Link, useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import AddComplaint from "./AddComplaint";
import "./MainPage.css";
import { Pagination } from "@mui/material";
import Sorting from "./Sorting";

function MainPage(props) {
  // description - search in navbar - filter complaints
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
      width: "1000px",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
  };
  const [tableContent, setTableContent] = useState([]);
  const formSubmitHandler = (record) => {
    setTableContent((prevContent) => [
      <tr onClick={handleOpenModal}>
        <td>{record.title}</td>
        <td>{record.Type}</td>
        <td>{record.Date}</td>
        <td className="text-white bg-secondary">{record.status}</td>
        <td>
          <FontAwesomeIcon
            icon={faTrashCan}
            className="bg-danger p-1  rounded-start rounded-end text-white ms-3"
          />
        </td>
      </tr>,
      ...prevContent,
    ]);

    const Values = {
      description: record.Description,
      category: record.Type,
      address: record.Adress,
      title: record.title,
      image: record.image,
    };

    fetch("https://complaintapi.kodunya.com/api/Complaints", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + token,
        // Add any other headers if needed
      },
      body: JSON.stringify(Values), // Convert the object to a JSON string
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {});
    handleCloseModal();
  };
  const onClick = (e) => {
    if (e.target.tagName === "TD") {
      OpenDetailPage(e);
    } else {
      DeleteComplaint(e);
    }
  };
  const token = Cookies.get("cookie");
  const [loading, setLoading] = useState(false);
  const [complaints, setcomplaints] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);
  const fetchProducts = async (pageNumber, category, type) => {
    let page_number;
    setLoading(true);
    if (pageNumber === undefined || pageNumber === null) {
      page_number = page;
    } else {
      page_number = pageNumber;
    }
    const res = await fetch(
      `https://complaintapi.kodunya.com/api/Complaints/Paging?skip=${page_number}&take=10${
        category === undefined
          ? ""
          : type !== undefined || type !== ""
          ? `&SortField=${category}&SortType=${type}`
          : ""
      }`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.json();

    if (data.items && data.items.length)
      setcomplaints(data.items), setTotal(data.total), setPage(page_number);
    setLoading(false);
  };
  useEffect(() => {
    fetchProducts();
  }, [page]);

  // event handler for page change on click
  const handlePageChange = (e, pageNumber) => {
    if (
      pageNumber > 0 &&
      pageNumber <= complaints.length / 10 &&
      pageNumber !== page
    )
      setPage(pageNumber);

    fetchProducts(pageNumber);
  };

  const [table, setTable] = useState(<div className="custom-loader"></div>);
  useEffect(() => {
    if (loading === true) {
      setTable(<div className="custom-loader"></div>);
    } else {
      setTable(tableContent.slice(0, Math.ceil(tableContent.length) / 2));
    }
  }, [loading, tableContent]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsOpenModal(true);
  };
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsOpenModal(false);
  };
  const DeleteComplaint = (e) => {
    const trId = e.currentTarget.closest("tr").id;
    Swal.fire({
      title: "Are you sure to Delete This Complaint ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted successfuly!",
          icon: "success",
        });
        fetch(`https://complaintapi.kodunya.com/api/Complaints/${trId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: "bearer " + token,
          },
        }).then((response) => {
          response.json();
        });
        setTimeout(() => {
          window.location.reload(true);
        }, 2000);
      } else {
        return;
      }
    });
  };
  const [filteringButton, setFilteringButton] = useState("All");
  const tableBody = useRef();
  const ComplaintTypes = (event) => {
    let complaintType = event.target.outerText.split(" ")[0];
    setFilteringButton(complaintType);
    for (let i = 1; i < tableBody.current.children.length; i++) {
      if (
        tableBody.current.children[i].children[3].innerText !== complaintType
      ) {
        if (complaintType === "All") {
          tableBody.current.children[i].style.display = "table-row";
        } else {
          tableBody.current.children[i].style.display = "none";
        }
      } else {
        tableBody.current.children[i].style.display = "table-row";
      }
    }
  };
  const navigate = useNavigate();
  const OpenDetailPage = (event) => {
    const trElement = event.target.closest("tr");
    const trElementId = trElement.id;
    navigate(`/${trElementId}`);
  };
  const [mainTitle, setMainTitle] = useState("My Complaints");
  const [head, setHead] = useState();
  const isStaff = Cookies.get("isStaff");
  useEffect(() => {
    if (isStaff === "true") {
      setMainTitle("All Complaints");
      setHead();
    } else {
      setMainTitle("My Complaints");
      setHead(
        <div className="mt-5 ms-5 me-5 d-flex justify-content-between  border-bottom border-dark pb-3 border-3 rounded-start rounded-end">
          <div className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {filteringButton}
            </button>
            <ul className="dropdown-menu">
              <li>
                <a className="dropdown-item" href="#" onClick={ComplaintTypes}>
                  <p>All Complaints</p>
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#" onClick={ComplaintTypes}>
                  <p> Accepted Complaints</p>
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#" onClick={ComplaintTypes}>
                  <p> Rejected Complaints</p>
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#" onClick={ComplaintTypes}>
                  <p>Pending Complaints</p>
                </a>
              </li>
            </ul>
          </div>
          <Link className="btn btn-success" onClick={handleModalOpen}>
            Add Complaints <span>&#43;</span>
          </Link>
        </div>
      );
    }
  }, []);
  const [sortTypeTitle, setSortTypeTitle] = useState(
    <FontAwesomeIcon icon={faSort} className="ms-1 " />
  );
  const [sortTypeCategory, setSortTypeCategory] = useState(
    <FontAwesomeIcon icon={faSort} className="ms-1 " />
  );
  const [sortTypeDate, setSortTypeDate] = useState(
    <FontAwesomeIcon icon={faSort} className="ms-1 " />
  );
  const [sortTypeStatus, setSortTypeStatus] = useState(
    <FontAwesomeIcon icon={faSort} className="ms-1 " />
  );
  const sorting = (props, icon) => {
    if (props === "Title") {
      setSortTypeTitle(<FontAwesomeIcon icon={icon} className="ms-1 down" />);
    } else if (props === "Category") {
      setSortTypeCategory(
        <FontAwesomeIcon icon={icon} className="ms-1 down" />
      );
    } else if (props === "Date") {
      setSortTypeDate(<FontAwesomeIcon icon={icon} className="ms-1 down" />);
    } else if (props === "Status") {
      setSortTypeStatus(<FontAwesomeIcon icon={icon} className="ms-1 down" />);
    } else {
    }
  };
  const sort = (e, category) => {
    const svgElement = e.target.children[0].closest("svg");
    const HeaderTDs = e.target.closest("tr").children;
    for (let i = 0; i < HeaderTDs.length; i++) {
      console.log(HeaderTDs[i].innerText);
      sorting(HeaderTDs[i].innerText, faSort);
    }

    if (svgElement.classList.contains("fa-sort")) {
      sorting(category, faSortDown);
      fetchProducts(page, category, "AZ");
    } else if (svgElement.classList.contains("fa-sort-down")) {
      sorting(category, faSortUp);
      fetchProducts(page, category, "ZA");
    } else {
      sorting(category, faSort);
      fetchProducts(page, category, "");
    }
  };
  return (
    <>
      <div className="d-flex flex-column w-100 justify-content-center align-items-center mt-3">
        <h1>{mainTitle}</h1>
      </div>
      {head}
      <table className="table table-hover table-striped mt-3">
        <tbody ref={tableBody}>
          <tr className="border-0 border-bottom border-3 border-dark d-table-row">
            <th onClick={(e) => sort(e, "Title", "")}>
              Title
              {sortTypeTitle}
            </th>
            <th onClick={(e) => sort(e, "Category", "")}>
              Category
              {sortTypeCategory}
            </th>
            <th onClick={(e) => sort(e, "createdDate", "")}>
              Date
              {sortTypeDate}
            </th>
            <th onClick={(e) => sort(e, "Status", "")}>
              Status
              {sortTypeStatus}
            </th>
            <th></th>
          </tr>
          {
            <>
              {complaints.slice(0, 10).map((complaint) => (
                <tr
                  key={complaint.id}
                  onClick={onClick}
                  id={complaint.id}
                  className="border-bottom border-1"
                  style={{ cursor: "pointer" }}
                >
                  <td className="text-break w-25">{complaint.title}</td>
                  <td>{complaint.category}</td>
                  <td>{complaint.createdDate.split("T")[0]}</td>
                  <td className={`text-white bgStatus${complaint.status} p-2`}>
                    {complaint.status === 0
                      ? "Pending"
                      : complaint.status === 1
                      ? "Accepted"
                      : complaint.status === 2
                      ? "Rejected"
                      : complaint.status === 3
                      ? "In Progress"
                      : complaint.status === 4
                      ? "Closed"
                      : ""}
                  </td>
                  <td>
                    <FontAwesomeIcon
                      icon={faTrashCan}
                      className="bg-danger p-1 rounded-start rounded-end text-white ms-3"
                      onClick={onClick}
                      style={{ cursor: "pointer" }}
                    />
                  </td>
                </tr>
              ))}
            </>
          }
        </tbody>
      </table>
      {complaints.length > 0 && (
        <section
          className="pagination w-100 p-2 justify-content-center bg-white border-top border-dark"
          style={{
            position: "fixed",
            marginTop: "-50px",
            bottom: "0",
            left: "0",
          }}
        >
          <Pagination
            count={Math.ceil(total / 10)}
            variant="outlined"
            page={page}
            onChange={handlePageChange}
          />
        </section>
      )}
      <Modal
        isOpen={isOpenModal}
        onRequestClose={handleCloseModal}
        contentLabel="Modal"
        style={modalStyles}
      >
        <AddComplaint
          onCancel={handleCloseModal}
          onFormSubmit={formSubmitHandler}
        />
      </Modal>
    </>
  );
}
export default MainPage;
