// CustomerOptionsPage.js

import React from "react";
import "./CustomerOptions.css"; // Import the CSS file
import { Link, useSearchParams } from "react-router-dom";

const CustomerOptionsPage = () => {
  const [params] = useSearchParams();
  return (
    <div className="container">
      <h1>Customer DashBoard</h1>
      <div className="grid-container">
        {/* Buy Food and Supplies Card */}
        <div className="card">
          <div className="card-content">
            <h2>Buy Food and Supplies</h2>
            <p>Explore and purchase food items or medical supplies.</p>
          </div>
          <div className="button-container">
            <button>
              <Link to="/buyFood">Buy</Link>
            </button>
          </div>
        </div>

        {/* Book Doctor Card */}
        <div className="card">
          <div className="card-content">
            <h2>Book Doctor</h2>
            <p>Schedule an appointment with a doctor.</p>
          </div>
          <div className="button-container">
            <button>
              <Link to="/getDoctor">Book</Link>
            </button>
          </div>
        </div>

        {/* View Orders Card */}
        <div className="card">
          <div className="card-content">
            <h2>View Orders</h2>
            <p>View your previous orders.</p>
          </div>
          <div className="button-container">
            <button>
              <Link to="/viewOrders">View</Link>
            </button>
          </div>
        </div>

        {/* View Appointments Card */}
        <div className="card">
          <div className="card-content">
            <h2>View Appointments</h2>
            <p>View your upcoming appointments.</p>
          </div>
          <div className="button-container">
            <button>
              <Link to="/viewAppt">View</Link>
            </button>
          </div>
        </div>
      </div>
      {params.get("param") === "appt" && (
        <div
          className="registered"
          style={{ color: "green", textAlign: "center" }}
        >
          Appointment Success
        </div>
      )}
    </div>
  );
};

export default CustomerOptionsPage;
