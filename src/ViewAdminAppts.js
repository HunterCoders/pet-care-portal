import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ViewAdminAppointmentsPage = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // Fetch appointments data from the server
    axios
      .get("/adminapi/appointments", { withCredentials: true })
      .then((response) => {
        setAppointments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching appointments:", error);
      });
  }, []);

  return (
    <div className="parentContainer">
    <div className="btnContainer">
      <div>
    <button>
      <Link to="/viewDocs">View Doctors</Link>
    </button>
    <button>
      <Link to="/addFood">Add Food</Link>
    </button>
    <button>
      <Link to="/adminOrders">View Orders</Link>
    </button>
    <button>
      <Link to="/viewAdminAppts">View Appointments</Link>
    </button>
    </div>
    <div>
    <button>
      <Link to="/">Logout</Link>
    </button>
    </div>
    </div>
    <div className="container">
      <h1>View Appointments</h1>
      <div className="appointments-list">
        {appointments.map((appointment) => (
          <div key={appointment._id} className="appointment-item">
            <h2>Appointment ID: {appointment._id}</h2>
            <p>Pet Name: {appointment.petName}</p>
            <p>Doctor Name: {appointment.doctorName}</p>
            <p>Appointment Date: {new Date(appointment.apptDate).toLocaleDateString()}</p>
            <p>Reason: {appointment.reason}</p>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default ViewAdminAppointmentsPage;
