import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import "./AddComplaint.css";
import Cookies from "js-cookie";
function AddComplaint(props) {
  const Title = useRef();
  const Description = useRef();
  const Type = useRef();
  const file = useRef();
  const Adress = useRef();
  // Create a new Date object representing the current date and time
  const today = new Date();

  // You can get various components of the date using the Date object methods
  const year = today.getFullYear();
  const month = today.getMonth() + 1; // Month is zero-indexed, so add 1
  const day = today.getDate();

  // Create a formatted string for today's date
  const formattedDate = `${year}-${month < 10 ? "0" + month : month}-${
    day < 10 ? "0" + day : day
  }`;
  const [img, setImg] = useState("");
  const onAddComplaint = (event) => {
    event.preventDefault();
    const randomUUID = uuidv4();
    props.onFormSubmit({
      title: Title.current.value,
      Description: Description.current.value,
      Type: Type.current.innerText,
      Date: formattedDate,
      status: "Pending",
      id: randomUUID,
      Adress: Adress.current.value,
      image: img,
    });
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  function handleButtonClick() {
    // Trigger a click on the hidden file input
    document.getElementById("fileInput").click();
  }
  const [filteringButton, setFilteringButton] = useState("Diğer");
  const ComplaintTypes = (event) => {
    let complaintType = event.target.outerText.split(" ")[0];
    setFilteringButton(complaintType);
  };
  const [urlValue, setUrlValue] = useState("");
  const token = Cookies.get("cookie");
  const setUrlChange = (event) => {
    let data = new FormData();
    setUrlValue(event.target.files[0].name);
    data.append("file", event.target.files[0]);
    fetch("https://complaintapi.kodunya.com/api/Files", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data, // Convert the object to a JSON string
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setImg(data);
      })
      .catch((error) => {
        console.error("Error during the fetch operation:", error);
      });
  };

  return (
    <form className="p-5 " onSubmit={onAddComplaint}>
      <div>
        <div className="pb-3">
          <label htmlFor="Title">Complaint Title</label>
          <input
            type="text"
            id="Title"
            ref={Title}
            required
            className="border-0 border-bottom border-2 border-dark shadow-none form-control"
          />
        </div>
        <div className="dropdown mb-3">
          <label className="me-2">Complaint Type</label>
          <button
            className="btn btn-success dropdown-toggle"
            type="button"
            ref={Type}
            data-bs-toggle="dropdown"
            aria-expanded="false"
            required
          >
            {filteringButton}
          </button>
          <ul className="dropdown-menu">
            <li>
              <a className="dropdown-item" href="#" onClick={ComplaintTypes}>
                <p>Tüm</p>
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#" onClick={ComplaintTypes}>
                <p> Yol ve çevre düzeni</p>
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#" onClick={ComplaintTypes}>
                <p> Kaski</p>
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#" onClick={ComplaintTypes}>
                <p>Armadaş</p>
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#" onClick={ComplaintTypes}>
                <p>Akedaş</p>
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#" onClick={ComplaintTypes}>
                <p>Sokak Hayvanı</p>
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#" onClick={ComplaintTypes}>
                <p>Çöp Birikmesi</p>
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#" onClick={ComplaintTypes}>
                <p>Ulaşım İhbarı</p>
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#" onClick={ComplaintTypes}>
                <p>Zabıta</p>
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#" onClick={ComplaintTypes}>
                <p>Diğer</p>
              </a>
            </li>
          </ul>
        </div>
        <div>
          <label>Complaint Adress</label>
          <input
            type="text"
            required
            className="border-0 border-bottom border-2 border-dark shadow-none form-control"
            ref={Adress}
          />
          <label className="pt-4" htmlFor="Description">
            Complaint Description
          </label>
          <textarea
            type="text"
            id="Description"
            ref={Description}
            required
            cols={25}
            className="pb-3 border-0 border-bottom border-2 border-dark shadow-none form-control mb-3"
          />
        </div>
        <label htmlFor="fileInput"></label>
        <input
          type="file"
          id="fileInput"
          className="d-none"
          ref={file}
          onChange={setUrlChange}
          accept=".jpg,.jpeg,.png"
          required
        />
        <div className="d-flex gap-3 align-items-center">
          <button
            onClick={handleButtonClick}
            type="button"
            className="cssbuttons-io-button btn btn-secondary d-inline-block mb-3"
          >
            <svg
              viewBox="0 0 640 512"
              fill="white"
              height="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"></path>
            </svg>
            <span>Upload</span>
          </button>
          <p>{urlValue}</p>
        </div>
      </div>
      <div className="d-flex gap-2">
        <button type="submit" className="btn btn-success">
          Add Complaint
        </button>
        <Link onClick={handleCloseModal} className="btn btn-secondary">
          Cancel
        </Link>
      </div>
    </form>
  );
}
export default AddComplaint;
