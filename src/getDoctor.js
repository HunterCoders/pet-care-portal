import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useSearchParams } from "react-router-dom";

function BookAppointment() {
  let [param] = useSearchParams();
  const [Err, setErr] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [petName, setPetName] = useState("");
  const [apptDate, setDate] = useState("");
  const [reason, setReason] = useState("");

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get("/getdoctors",{withCredentials:true});
        console.log("Fetched doctors:", response.data);
        setDoctors(response.data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };
    fetchDoctors();
  }, []);

  const checkParams = (event) => {
    setErr("");
    event.preventDefault();
    const petName = event.target.petName.value.trim();
    const doctorName = event.target.doctorName.value.trim();
    const reason = event.target.reason.value.trim();
    const apptDate = event.target.apptDate.value.trim();

    if (!selectedDoctor || !petName || !apptDate || !reason || !doctorName) {
      setErr("All Fields are required");
      return;
    }
    if (new Date(apptDate) < Date.now()) {
      setErr("Invalid Date. Select a later date!!!!");
      return;
    }
    event.target.submit();
  };

  return (
    <div className="parentContainer">
    <div className="btnContainer">
      <div>
    <button>
      <Link to="/buyFood">Buy Food</Link>
    </button>
    <button>
      <Link to="/getDoctor">Book Doctor</Link>
    </button>
    <button>
      <Link to="/viewOrders">View Orders</Link>
    </button>
    <button>
      <Link to="/viewAppt">View Appointments</Link>
    </button>
    </div>
    <div>
    <button>
      <Link to="/">Logout</Link>
    </button>
    </div>
  </div>
      <form
        onSubmit={checkParams}
        action="/createAppt"
        method="post"
        className="register-form"
      >
        <h1 style={{ textAlign: "center" }}>Book Appointment</h1>
        <div className="form-group">
          <label htmlFor="petName">Pet Name:</label>
          <input
            type="text"
            name="petName"
            id="petName"
            className="form-control"
            value={petName}
            onChange={(e) => setPetName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="doctorName">Select Doctor:</label>
          <select
            id="doctorName"
            name="doctorName"
            value={selectedDoctor}
            onChange={(e) => setSelectedDoctor(e.target.value)}
            className="form-control"
          >
            <option value="">Select a doctor</option>
            {doctors.map((doctor) => (
              <option key={doctor._id} value={doctor.docName}>
                {doctor.docName}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="apptDate">Date:</label>
          <input
            type="date"
            name="apptDate"
            id="apptDate"
            className="form-control"
            value={apptDate}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="reason">Reason for Visit:</label>
          <textarea
            name="reason"
            id="reason"
            className="form-control"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </div>
        <input type="submit" value="Book Appointment" className="btn-submit" />
        <br></br>
        <br></br>
        {Err && (
          <div style={{ color: "maroon" }} className="already">
            {Err}
          </div>
        )}
        {param.get("param") === "err" && (
          <div
            className="registered"
            style={{ color: "maroon", textAlign: "center",boxShadow:"1 px black" }} 
          >
            The doctor is booked for the day!! Choose other date
          </div>
        )}
      </form>
    </div>
  );
}

export default BookAppointment;
