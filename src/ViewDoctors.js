import React, { useState, useEffect } from "react";
import axios from "axios";
import './ViewDoctor.css';

const ViewDoctorsPage = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    // Fetch doctors data from the server
    axios
      .get("/adminapi/doctors", { withCredentials: true })
      .then((response) => {
        setDoctors(response.data);
      })
      .catch((error) => {
        console.error("Error fetching doctors:", error);
      });
  }, []);

  return (
    <div className="container">
      <h1>View Doctors</h1>
      <div className="doctors-list">
        {doctors.map((doctor) => (
          <div key={doctor._id} className="doctor-item">
            <h2>{doctor.docName}</h2>
            <p>Email: {doctor.docEmail}</p>
            <p>Licence Number: {doctor.docLicNo}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewDoctorsPage;
