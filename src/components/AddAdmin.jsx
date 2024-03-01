import { useRef } from "react";
import "./AdminDetails.css";
import Cookies from "js-cookie";
const token = Cookies.get("cookie");
function AddAdmin(props) {
  const Cancel = () => {
    props.onCancel();
  };
  //   ////////////
  const Name = useRef();
  const Email = useRef();
  const PhoneNumber = useRef();
  const Password = useRef();
  const Category = useRef();
  // /////////////
  const canAccept = useRef();
  const canReject = useRef();
  const canInProgress = useRef();
  const canClose = useRef();
  const canManageAdmins = useRef();
  const onAddAdmin = (e) => {
    e.preventDefault();
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
    props.onSubmit({
      name: Name.current.value,
      phoneNumber: PhoneNumber.current.value,
      email: Email.current.value,
      password: Password.current.value,
      category: Category.current.value,
      canAccept: premissions[0],
      canReject: premissions[1],
      canInProgress: premissions[2],
      canClose: premissions[3],
      manageAdmins: premissions[4],
    });
  };
  const premissionContainer = useRef();
  const AddSelectedClass = (e) => {
    if (e.target.classList.contains("selected")) {
      e.target.classList.remove("selected");
    } else {
      e.target.classList.add("selected");
    }
  };
  return (
    <>
      <h2 className="d-flex justify-content-center border-bottom border-2 p-2">
        Add New Admin
      </h2>
      <div className="d-flex flex-column p-2 ">
        <label htmlFor="Name">Name:</label>
        <input
          type="text"
          id="Name"
          className="border-0 border-bottom border-1 outline-0 border-dark"
          ref={Name}
          required
        />
      </div>
      <div className="d-flex flex-column p-2 ">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          className="border-0 border-bottom border-1 outline-0 border-dark"
          ref={Email}
          required
        />
      </div>
      <div className="d-flex flex-column p-2 ">
        <label htmlFor="phoneNumber">Phone Number:</label>
        <input
          type="number"
          id="phoneNumber"
          className="border-0 border-bottom border-1 outline-0 border-dark"
          ref={PhoneNumber}
          required
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
      <div className="d-flex flex-column p-2 ">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          className="border-0 border-bottom border-1 outline-0 border-dark"
          ref={Password}
          required
        />
      </div>
      <h5 className="ps-2 pt-1">This Admin Can do :</h5>
      <div
        className="d-flex gap-2 flex-wrap p-2 justify-content-center"
        ref={premissionContainer}
      >
        <label className="check">
          <input type="checkbox" ref={canAccept} onClick={AddSelectedClass} />
          <span>Accept</span>
        </label>
        <label className="check">
          <input type="checkbox" ref={canReject} onClick={AddSelectedClass} />
          <span>Reject</span>
        </label>

        <label className="check">
          <input
            type="checkbox"
            ref={canInProgress}
            onClick={AddSelectedClass}
          />
          <span>In Progress</span>
        </label>

        <label className="check">
          <input type="checkbox" ref={canClose} onClick={AddSelectedClass} />
          <span>Close</span>
        </label>

        <label className="check">
          <input
            type="checkbox"
            ref={canManageAdmins}
            onClick={AddSelectedClass}
          />
          <span>Manage Admins</span>
        </label>
      </div>
      <div className="d-flex gap-3 p-3 justify-content-end">
        <button type="button" className="btn btn-danger" onClick={Cancel}>
          Cancel
        </button>
        <button type="button" className="btn btn-success" onClick={onAddAdmin}>
          Add Admin
        </button>
      </div>
    </>
  );
}
export default AddAdmin;
