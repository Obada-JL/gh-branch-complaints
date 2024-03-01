import { Link, useParams } from "react-router-dom";
import "./DetailPage.css";
import { useContext, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShare } from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie";
import { AuthContext } from "../AppContext";
function DetailPage() {
  const [loading, setLoading] = useState(false);
  const [table, setTable] = useState(<div className="custom-loader"></div>);
  const [tableContent, setTableContent] = useState([]);
  const { id } = useParams();
  const [messages, setMesages] = useState([]);

  const token = Cookies.get("cookie");
  const isStaff = Cookies.get("isStaff");
  const canAccept = Cookies.get("canAccept");
  const canReject = Cookies.get("canReject");
  const canInProgress = Cookies.get("canInProgress");
  const canClose = Cookies.get("canClose");
  const getuserId = Cookies.get("userId");

  const handleButtonClick = (action, message, apiEndpoint) => {
    swal
      .fire({
        title: `Are you sure?`,
        text: message,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: `Yes, ${action} it!`,
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          fetch(apiEndpoint, {
            method: "POST",
            headers: {
              Authorization: "bearer " + token,
            },
          })
            .then((response) => response.json())
            .then((data) => {
              setTimeout(() => {
                window.location.reload(true);
              }, 2000);
            });

          swal.fire(
            `${action}d!`,
            `The ${action.toLowerCase()} action has been performed.`,
            "success"
          );
        } else if (result.dismiss === swal.DismissReason.cancel) {
          swal.fire(
            "Cancelled",
            `The ${action.toLowerCase()} action has been cancelled.`,
            "error"
          );
        }
      });
  };

  const onChangeAccept = (e) => {
    handleButtonClick(
      "Accept",
      "Are You sure to Change Status to Accept?",
      `https://complaintapi.kodunya.com/api/Complaints/Accept/${id}`
    );
  };

  const onChangeReject = (e) => {
    handleButtonClick(
      "Reject",
      "Are You sure to Change Status to Reject?",
      `https://complaintapi.kodunya.com/api/Complaints/Reject/${id}`
    );
  };
  const onChangeInProgress = (e) => {
    handleButtonClick(
      "InProgress",
      "Are You sure to Change Status to In Progress?",
      `https://complaintapi.kodunya.com/api/Complaints/InProgress/${id}`
    );
  };
  const onChangeClosed = (e) => {
    handleButtonClick(
      "Closed",
      "Are You sure to Change Status to Closed?",
      `https://complaintapi.kodunya.com/api/Complaints/Close/${id}`
    );
  };
  useEffect(() => {
    setLoading(true);
    fetch(`https://complaintapi.kodunya.com/api/Complaints/${id}`, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        let status;
        if (data.status === 0) {
          status = "Pending";
        } else if (data.status === 1) {
          status = "Accepted";
        } else if (data.status === 2) {
          status = "Rejected";
        } else if (data.status === 3) {
          status = "InProgress";
        } else if (data.status === 4) {
          status = "Closed";
        }
        let isUserStaff = "";

        if (isStaff === "true") {
          if (status === "Accepted") {
            if (canInProgress == "true") {
              if (canClose === "true") {
                isUserStaff = (
                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-warning"
                      type="button"
                      onClick={onChangeInProgress}
                    >
                      In Progress
                    </button>
                    <button
                      className="btn btn-info"
                      type="button"
                      onClick={onChangeClosed}
                    >
                      Close
                    </button>
                  </div>
                );
              } else {
                isUserStaff = (
                  <button
                    className="btn btn-warning"
                    type="button"
                    onClick={onChangeInProgress}
                  >
                    In Progress
                  </button>
                );
              }
            } else {
              isUserStaff = (
                <button
                  className="btn btn-warning"
                  type="button"
                  onClick={onChangeInProgress}
                >
                  In Progress
                </button>
              );
            }
            if (canClose === "true") {
              if (canInProgress === "true") {
                isUserStaff = (
                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-warning"
                      type="button"
                      onClick={onChangeInProgress}
                    >
                      In Progress
                    </button>
                    <button
                      className="btn btn-info"
                      type="button"
                      onClick={onChangeClosed}
                    >
                      Closed
                    </button>
                  </div>
                );
              } else {
                isUserStaff = (
                  <button
                    className="btn btn-info"
                    type="button"
                    onClick={onChangeClosed}
                  >
                    Close
                  </button>
                );
              }
            } else {
              isUserStaff = (
                <button
                  className="btn btn-info"
                  type="button"
                  onClick={onChangeClosed}
                >
                  Close
                </button>
              );
            }
          } else {
            if (canAccept === "true") {
              if (canReject === "true") {
                isUserStaff = (
                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-success"
                      type="button"
                      onClick={onChangeAccept}
                    >
                      Accept
                    </button>
                    <button
                      className="btn btn-danger"
                      type="button"
                      onClick={onChangeReject}
                    >
                      Reject
                    </button>
                  </div>
                );
              } else {
                isUserStaff = (
                  <button
                    className="btn btn-success"
                    type="button"
                    onClick={onChangeAccept}
                  >
                    Accept
                  </button>
                );
              }
            } else {
              isUserStaff = (
                <button
                  className="btn btn-success"
                  type="button"
                  onClick={onChangeAccept}
                >
                  Accept
                </button>
              );
            }

            if (canReject === "true") {
              if (canAccept === "true") {
                isUserStaff = (
                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-success"
                      type="button"
                      onClick={onChangeAccept}
                    >
                      Accept
                    </button>
                    <button
                      className="btn btn-danger"
                      type="button"
                      onClick={onChangeReject}
                    >
                      Reject
                    </button>
                  </div>
                );
              } else {
                isUserStaff = (
                  <button
                    className="btn btn-danger"
                    type="button"
                    onClick={onChangeReject}
                  >
                    Reject
                  </button>
                );
              }
            } else {
              isUserStaff = (
                <button
                  className="btn btn-danger"
                  type="button"
                  onClick={onChangeReject}
                >
                  Reject
                </button>
              );
            }
          }
        } else {
        }
        if (status === "Rejected" || status === "Closed") {
          isUserStaff = "";
        }
        setTableContent((prevContent) => [
          <div
            className="d-flex flex-column"
            style={{
              flex: "65%",
              overflow: "scroll",
              overflowX: "hidden",
              // overflowY: "auto",
              height: "calc(100vh - 66px)",
            }}
          >
            <Link
              className=" position-absolute p-4 font-size link-secondary d-block text-decoration-none"
              to={".."}
            >
              &#171;
            </Link>
            <h1 className="d-flex justify-content-center pt-2">{data.title}</h1>
            <div className="d-flex flex-50 h5 justify-content-around pt-2">
              {isUserStaff}
              <td className={`text-white bgStatus${data.status} p-2 rounded`}>
                {status}
              </td>
            </div>
            <p className="d-flex justify-content-center h5 pb-2 mt-3 border-bottom gap-5">
              {" "}
              <div className="d-flex gap-2 align-items-center">
                <p className="h5">Date:</p>{" "}
                <p className="h5">{data.createdDate.split("T")[0]}</p>
              </div>
              {data.category}
            </p>
            <div className="d-flex justify-content-between p-2">
              <div>
                <div className="pt-1 text-break">
                  <p className="h4 ms-2 text-break">Adress:</p>
                  <p className="p-2" style={{ width: "calc(65vw - 400px)" }}>
                    {data.address}
                  </p>
                </div>
                <div>
                  <p className="h4 ms-2 text-break">Description:</p>
                  <p
                    className="p-2 text-break"
                    style={{ width: "calc(65vw - 400px)" }}
                  >
                    {data.description}
                  </p>
                </div>
              </div>
              <img
                src={`https://complaintapi.kodunya.com/api/Files/${data.image}`}
                width={350}
              />
            </div>
            <p className="h4 mb-3 p-2">Logs:</p>
            <div className="pb-1 d-flex gap-5 p-2">
              <div className="d-flex gap-2 h5">
                <p>{data.logs[0].logText}</p>
              </div>
              <div className="d-flex gap-2 h5">
                <p>{data.logs[0].logDate.split("T")[0]}</p>
              </div>
            </div>
          </div>,
        ]);

        data.messages.forEach((message) => {
          let sender;
          if (message.userId === getuserId) {
            sender = (
              <div className="message my_msg h5">
                <p className="bg-dark text-white text-break">
                  {message.message}
                </p>
              </div>
            );
          } else {
            sender = (
              <div className="message friend_msg  text-white w-25 text-left">
                <p
                  className="bg-secondary text-break w-25"
                  style={{ width: "50vw", textWrap: "wrap", textAlign: "left" }}
                >
                  {message.message}
                </p>
              </div>
            );
          }
          setMesages((prevContent) => [...prevContent, sender]);
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  useEffect(() => {
    if (loading === true) {
      setTable(<div className="custom-loader"></div>);
    } else {
      setTable(tableContent);
    }
  }, [loading, tableContent]);
  const [AddMessage, setAddMessage] = useState(
    messages.slice(0, messages.length / 2)
  );
  const messageInput = useRef();
  const onMessageSend = (event) => {
    const values = {
      complaintId: id,
      message: messageInput.current.value,
    };
    fetch("https://complaintapi.kodunya.com/api/ComplaintMessages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(values), // Convert the object to a JSON string
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        window.scrollTo(0, document.body.scrollHeight);
      })
      .catch((error) => {
        console.error("Error during the fetch operation:", error);
      });
    setAddMessage((prevContent) => [
      <div className="message my_msg h5">
        <p className="bg-dark text-white">{messageInput.current.value}</p>
      </div>,
    ]);
  };
  const SendButton = useRef();
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onMessageSend();
      window.scrollTo(0, document.body.scrollHeight);
    }
  };
  return (
    <div className="d-flex">
      {table}

      <div
        className="d-flex flex-column border-start border-dark border-2"
        style={{ flex: "35%" }}
      >
        <h1 className="d-flex justify-content-center pt-3">MESSAGING</h1>
        <div
          className=""
          style={{
            overflow: "scroll",
            overflowX: "hidden",
            height: "calc(100vh - 198px)",
          }}
        >
          {messages.slice(0, messages.length / 2)}
          {AddMessage}
        </div>

        <div className="chat_input bg-secondary opacity-50">
          <input
            type="text"
            placeholder="Type a message"
            ref={messageInput}
            onKeyPress={handleKeyPress}
          />
          <div
            onClick={onMessageSend}
            ref={SendButton}
            style={{ cursor: "pointer" }}
          >
            <FontAwesomeIcon className="icon text-dark" icon={faShare} />
          </div>
        </div>
      </div>
    </div>
  );
}
export default DetailPage;
