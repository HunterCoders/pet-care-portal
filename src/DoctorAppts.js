import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams,Link } from "react-router-dom";
import "./DoctorAppointmentsPage.css";

const DoctorAppointmentsPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [param] = useSearchParams();
  const doctorName = param.get("name");

  useEffect(() => {
    // Fetch appointments data for the doctorName from the server
    axios
      .get(`/appointments/${doctorName}`,{ withCredentials: true })
      .then((response) => {
        console.log(response.data);
        setAppointments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching appointments:", error);
      });
  }, []);

  const handleMarkComplete = async (id) => {
    try {
      // Send a PATCH request to mark the appointment as complete
      await axios.patch(`/updateappointments/${id}`, {
        completed: true
      },{withCredentials:true});

      // Update the local state to reflect the change
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment._id === id
            ? { ...appointment, completed: true }
            : appointment
        )
      );
    } catch (error) {
      console.error("Error marking appointment as complete:", error);
    }
  };
  return (
    <div className="parentContainer">
    <div className="btnContainer">
      <div></div>
      <div>
      <button>
        <Link to="/">Logout</Link>
      </button>
      </div>
    </div>
    <div className="container">
      <h1>Doctor Appointments</h1>
      <div className="appointments-list">
        {appointments.map((appointment) => (
          <div
            key={appointment._id}
            className={`appointment-item ${
              appointment.completed ? "completed" : "pending"
            }`}
          >
            <h2>Appointment ID: {appointment._id}</h2>
            <p>Customer ID: {appointment.custId}</p>
            <p>Pet Name: {appointment.petName}</p>
            <p>Appointment Date: {appointment.apptDate}</p>
            <p>Reason: {appointment.reason}</p>
            {!appointment.completed && (
              <button onClick={() => handleMarkComplete(appointment._id)}>
                Mark as Complete
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default DoctorAppointmentsPage;
