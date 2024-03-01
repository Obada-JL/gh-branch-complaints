import "./signIn.css";
import Logo from "../assets/logo.jpg";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

function RegisterPage() {
  const [cookies, setCookie, removeCookie] = useCookies(["cookie"]);
  const password = useRef();
  const userName = useRef();
  const phoneNumber = useRef();
  const email = useRef();
  const TC = useRef();
  const navigate = useNavigate();
  const registerForm = useRef();
  const onRegister = () => {
    const Values = {
      name: userName.current.value,
      phoneNumber: phoneNumber.current.value,
      password: password.current.value,
      tc: TC.current.value,
      email: email.current.value,
    };
    let formChildrens = registerForm.current.children[0].children;
    for (let i = 0; i < formChildrens.length; i++) {
      if (formChildrens[i].classList.contains("is-valid") === false) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "You have some errors!",
        });
      } else {
        fetch("https://complaintapi.kodunya.com/api/Users/SignUp", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(Values),
        })
          .then((response) => {
            if (response.status === 200) {
              return response.json();
            } else if (response.status === 401) {
              return Swal.fire({
                title: "The user is not defined",
                text: "Check your Username and password",
                icon: "error",
              });
            } else {
              alert("error " + response.status);
            }
          })
          .then((data) => {
            if (data.token) {
              const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.onmouseenter = Swal.stopTimer;
                  toast.onmouseleave = Swal.resumeTimer;
                },
              });
              Toast.fire({
                icon: "success",
                title: "Signed up successfully",
              });
              setCookie("cookie", data.token);
              navigate("/");
            }
          })
          .catch((error) => {
            console.error("Error during the fetch operation:", error);
          });
      }
    }
  };
  const handleBlurPassword = (e) => {
    const formisValid = () => {
      input.classList.add("form-control");
      input.classList.remove("is-invalid");
      input.classList.add("is-valid");
    };
    const formisinValid = () => {
      input.classList.add("form-control");
      input.classList.remove("is-valid");
      input.classList.add("is-invalid");
    };
    const input = e.target;
    if (
      input.value.length === 0 ||
      input.value.length < 8 ||
      input.value.length > 20
    ) {
      formisinValid();
    } else {
      formisValid();
    }
  };
  const userNameBlur = (e) => {
    const formisValid = () => {
      input.classList.add("form-control");
      input.classList.remove("is-invalid");
      input.classList.add("is-valid");
    };
    const formisinValid = () => {
      input.classList.add("form-control");
      input.classList.remove("is-valid");
      input.classList.add("is-invalid");
    };
    const input = e.target;
    if (input.value.length === 0) {
      formisinValid();
    } else {
      formisValid();
    }
  };
  const handleBlurEmail = (e) => {
    const formisValid = () => {
      input.classList.add("form-control");
      input.classList.remove("is-invalid");
      input.classList.add("is-valid");
    };
    const formisinValid = () => {
      input.classList.add("form-control");
      input.classList.remove("is-valid");
      input.classList.add("is-invalid");
    };
    const input = e.target;
    if (input.value.length === 0 || input.value.includes("@") === false) {
      formisinValid();
    } else {
      formisValid();
    }
  };
  const handleBlurTC = (e) => {
    const formisValid = () => {
      input.classList.add("form-control");
      input.classList.remove("is-invalid");
      input.classList.add("is-valid");
    };
    const formisinValid = () => {
      input.classList.add("form-control");
      input.classList.remove("is-valid");
      input.classList.add("is-invalid");
    };
    const input = e.target;
    if (input.value.length !== 11 || input.value < 0) {
      formisinValid();
    } else {
      formisValid();
    }
  };
  const handlePhoneNumber = (e) => {
    const formisValid = () => {
      input.classList.add("form-control");
      input.classList.remove("is-invalid");
      input.classList.add("is-valid");
    };
    const formisinValid = () => {
      input.classList.add("form-control");
      input.classList.remove("is-valid");
      input.classList.add("is-invalid");
    };
    const input = e.target;
    if (input.value.length !== 13 || input.value.length === 0) {
      formisinValid();
    } else {
      formisValid();
    }
  };
  return (
    <>
      <div className="sidenav bg-dark">
        <div className="login-main-text">
          <h2>
            Complaints app
            <br /> Register Page
          </h2>
          <p>Register or login from here to access.</p>
        </div>
      </div>
      <div className="main me-7">
        <img src={Logo} width={250} />
        <div className="col-md-6 col-sm-12 ">
          <div className="mt-lg-3">
            <form ref={registerForm}>
              <div className="form-group">
                <label>TC Number</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Please Enter Your TC Number"
                  ref={TC}
                  onBlur={handleBlurTC}
                  required
                />
                <label>User Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Please Enter Your Username"
                  ref={userName}
                  onBlur={userNameBlur}
                  required
                />
                <label>Email Adress</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Please Enter Your Email Address"
                  ref={email}
                  onBlur={handleBlurEmail}
                  required
                />
                <label className="mt-2">Phone Number</label>
                <input
                  type="tel"
                  className="form-control "
                  id="validationDefault01"
                  placeholder="Ex: 539-982-55-77"
                  ref={phoneNumber}
                  pattern="[0-9]{3}-[0-9]{3}-[0-9]{2}-[0-9]{2}"
                  onBlur={handlePhoneNumber}
                  required
                />
                <div className="form-group mb-2 mt-2">
                  <label htmlFor="inputPassword5" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    id="inputPassword5"
                    className="form-control"
                    aria-describedby="passwordHelpBlock"
                    placeholder="Please Enter Your Password"
                    onBlur={handleBlurPassword}
                    ref={password}
                    required
                  />
                </div>
              </div>

              <button
                type="button"
                className="btn btn-secondary me-1"
                onClick={onRegister}
              >
                Register
              </button>
              <Link to={"/signIn"} className="btn btn-black ">
                Login
              </Link>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
export default RegisterPage;
