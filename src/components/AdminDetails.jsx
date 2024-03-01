import { useEffect, useRef, useState } from "react";
import "./AdminDetails.css";
import Cookies from "js-cookie";
function AdminDetails(props) {
  const token = Cookies.get("cookie");
  const clickedAdmin = props.data;

  const [inputValues, setInputValues] = useState(clickedAdmin);

  const handleInputChange = (inputName, event) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      [inputName]: event.target.value,
    }));
  };
  const premissionsContainer = useRef();
  const [checkboxes, setCheckboxes] = useState({
    Accept: false,
    Reject: false,
    InProgress: false,
    Close: false,
    ManageAdmins: false,
  });

  const handleCheckboxChange = (checkboxName) => {
    setCheckboxes((prevCheckboxes) => ({
      ...prevCheckboxes,
      [checkboxName]: !prevCheckboxes[checkboxName],
    }));
  };

  useEffect(() => {
    clickedAdmin.permissions.forEach((premission) => {
      let formattedPremission = premission.split(" ,")[0];
      const premissionBox = premissionsContainer.current.children;
      if (formattedPremission === premissionBox[0].children[1].innerText) {
        premissionBox[0].children[1].classList.add("selected");
        setCheckboxes((prevCheckboxes) => ({
          ...prevCheckboxes,
          Accept: true,
        }));
      } else if (
        formattedPremission === premissionBox[1].children[1].innerText
      ) {
        premissionBox[1].children[1].classList.add("selected");
        setCheckboxes((prevCheckboxes) => ({
          ...prevCheckboxes,
          Reject: true,
        }));
      } else if (
        formattedPremission === premissionBox[2].children[1].innerText
      ) {
        premissionBox[2].children[1].classList.add("selected");
        setCheckboxes((prevCheckboxes) => ({
          ...prevCheckboxes,
          InProgress: true,
        }));
      } else if (
        formattedPremission === premissionBox[3].children[1].innerText
      ) {
        premissionBox[3].children[1].classList.add("selected");
        setCheckboxes((prevCheckboxes) => ({
          ...prevCheckboxes,
          Close: true,
        }));
      } else if (
        formattedPremission === premissionBox[4].children[1].innerText
      ) {
        premissionBox[4].children[1].classList.add("selected");
        setCheckboxes((prevCheckboxes) => ({
          ...prevCheckboxes,
          ManageAdmins: true,
        }));
      } else {
      }
    });
  }, []);
  const AddSelectedClass = (e) => {
    if (e.target.classList.contains("selected")) {
      e.target.classList.remove("selected");
    } else {
      e.target.classList.add("selected");
    }
  };
  const name = useRef();
  const email = useRef();
  const phoneNumber = useRef();
  const Category = useRef();
  const canAccept = useRef();
  const canReject = useRef();
  const canInProgress = useRef();
  const canClose = useRef();
  const canManageAdmins = useRef();

  const submitHandler = () => {
    let premissions = [];
    if (canAccept.current.classList.contains("selected")) {
      premissions.push(true);
    } else {
      premissions.push(false);
    }
    if (canReject.current.classList.contains("selected")) {
      premissions.push(true);
    } else {
      premissions.push(false);
    }
    if (canInProgress.current.classList.contains("selected")) {
      premissions.push(true);
    } else {
      premissions.push(false);
    }
    if (canClose.current.classList.contains("selected")) {
      premissions.push(true);
    } else {
      premissions.push(false);
    }
    if (canManageAdmins.current.classList.contains("selected")) {
      premissions.push(true);
    } else {
      premissions.push(false);
    }
    const Values = {
      name: name.current.value,
      phoneNumber: phoneNumber.current.value,
      email: email.current.value,
      category: Category.current.value,
      canAccept: premissions[0],
      canReject: premissions[1],
      canInProgress: premissions[2],
      canClose: premissions[3],
      manageAdmins: premissions[4],
      password: "",
    };

    fetch(`https://complaintapi.kodunya.com/api/Users/${props.data.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(Values), // Convert the object to a JSON string
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data === true) {
          props.onCancel();
          window.location.reload(true);
        }
      })
      .catch((error) => {
        console.error("Error during the fetch operation:", error);
      });
  };
  const Cancel = () => {
    props.onCancel();
  };
  return (
    <>
      <h1 className="border-bottom border-3 d-flex justify-content-center p-2">
        Edit {clickedAdmin.name}
      </h1>
      <div className="d-flex flex-column p-2 ">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          className="border-0 border-bottom border-1 outline-0 border-dark"
          value={inputValues.name}
          onChange={(event) => handleInputChange("name", event)}
          ref={name}
        />
      </div>

      <div className="d-flex flex-column p-2 ">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          className="border-0 border-bottom border-1 outline-0 border-dark"
          value={inputValues.email}
          onChange={(event) => handleInputChange("email", event)}
          ref={email}
        />
      </div>

      <div className="d-flex flex-column p-2 ">
        <label htmlFor="phoneNumber">Phone Number:</label>
        <input
          type="number"
          id="phoneNumber"
          className="border-0 border-bottom border-1 outline-0 border-dark"
          value={inputValues.phoneNumber}
          onChange={(event) => handleInputChange("phoneNumber", event)}
          ref={phoneNumber}
        />
      </div>
      <div className="d-flex flex-column p-2 ">
        <label htmlFor="category">Category:</label>
        <select ref={Category} className="p-2 m-2 border border-dark border-1">
          <option>Tüm</option>
          <option>Yol Ve Çevre düzeni</option>
          <option>Kaski</option>
          <option>Armadaş</option>
          <option>Akedaş</option>
          <option>Sokak Hayvanı</option>
          <option>Çöp Birikmesi</option>
          <option>Ulaşım ihbarı</option>
          <option>Zabıta</option>
          <option>Diğer</option>
        </select>
      </div>
      <h5 className="ps-2 pt-1">This Admin Can do :</h5>
      <div
        className="d-flex gap-2 flex-wrap p-2 justify-content-center"
        ref={premissionsContainer}
      >
        <label className="check">
          <input
            type="checkbox"
            checked={checkboxes.Accept}
            onChange={() => handleCheckboxChange("Accept")}
            ref={canAccept}
            onClick={AddSelectedClass}
          />
          <span>Accept</span>
        </label>
        <label class="check">
          <input
            type="checkbox"
            checked={checkboxes.Reject}
            onChange={() => handleCheckboxChange("Reject")}
            ref={canReject}
            onClick={AddSelectedClass}
          />
          <span>Reject</span>
        </label>

        <label class="check">
          <input
            type="checkbox"
            checked={checkboxes.InProgress}
            onChange={() => handleCheckboxChange("InProgress")}
            ref={canInProgress}
            onClick={AddSelectedClass}
          />
          <span>In Progress</span>
        </label>

        <label class="check">
          <input
            type="checkbox"
            checked={checkboxes.Close}
            onChange={() => handleCheckboxChange("Close")}
            ref={canClose}
            onClick={AddSelectedClass}
          />
          <span>Close</span>
        </label>

        <label class="check">
          <input
            type="checkbox"
            checked={checkboxes.ManageAdmins}
            onChange={() => handleCheckboxChange("ManageAdmins")}
            ref={canManageAdmins}
            onClick={AddSelectedClass}
          />
          <span>Manage Admins</span>
        </label>
      </div>
      <div className="d-flex justify-content-end  p-2 gap-2">
        <button className="btn btn-secondary" onClick={Cancel}>
          Cancel
        </button>
        <button className="btn btn-success" onClick={submitHandler}>
          Refresh
        </button>
      </div>
    </>
  );
}

export default AdminDetails;
