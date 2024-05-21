import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ViewOrderPage.css";
import { Link } from "react-router-dom";

const ViewOrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch orders data from the server
    axios
      .get("/orders",{ withCredentials: true })
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  }, []);

  const handleCancelOrder = async (orderId) => {
    try {
      // Send a DELETE request to the server to delete the order
      await axios.delete(`/delorders/${orderId}`);

      // Filter out the deleted order from the local state
      setOrders(orders.filter((order) => order._id !== orderId));
    } catch (error) {
      console.error("Error cancelling order:", error);
    }
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
    <div className="container">
      <h1>View Orders</h1>
      <div className="orders-list">
        {orders.map((order) => (
          <div key={order._id} className="order-item">
            <h2>Order ID: {order._id}</h2>
            <p>Food Name: {order.foodName}</p>
            <p>Quantity: {order.quantity}</p>
            <p>Total Price: ${order.totalPrice}</p>
            <p>Address: {order.address}</p>
            <button onClick={() => handleCancelOrder(order._id)}>Cancel Order</button>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default ViewOrdersPage;
