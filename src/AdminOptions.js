// AdminOptionsPage.js

import React from 'react';
import './AdminOptions.css'; // Import the CSS file
import { Link } from 'react-router-dom';

const AdminOptionsPage = () => {
  return (
    <div className="container">
      <h1>Admin DashBoard</h1>
      <div className="grid-container">
        {/* View Doctor Card */}
        <div className="card">
          <div className="card-content">
            <h2>View Doctor</h2>
            <p>View the list of doctors.</p>
          </div>
          <div className="button-container">
            <button><Link to="/viewDocs">View Doctors</Link></button>
          </div>
        </div>

        {/* Add Food and Supplies Card */}
        <div className="card">
          <div className="card-content">
            <h2>Add Food and Supplies</h2>
            <p>Add new food items or medical supplies.</p>
          </div>
          <div className="button-container">
            <button><Link to="/addFood">Add Food</Link></button>
          </div>
        </div>

        {/* View Orders Card */}
        <div className="card">
          <div className="card-content">
            <h2>View Orders</h2>
            <p>View the list of orders.</p>
          </div>
          <div className="button-container">
            <button><Link to="/adminOrders">View Orders</Link></button>
          </div>
        </div>

        {/* View Appointments Card */}
        <div className="card">
          <div className="card-content">
            <h2>View Appointments</h2>
            <p>View the list of appointments.</p>
          </div>
          <div className="button-container">
            <button><Link to='/viewAdminAppts'>View Appointments</Link></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOptionsPage;
