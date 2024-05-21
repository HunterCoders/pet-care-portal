import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminOrderPage.css";

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch orders data from the server
    axios
      .get("/adminorders",{ withCredentials: true })
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  }, []);

  const handleDeleteOrder = async (orderId) => {
    try {
      // Send a DELETE request to the server to delete the order
      await axios.delete(`/ordersDelete/${orderId}`);

      // Filter out the deleted order from the local state
      setOrders(orders.filter((order) => order._id !== orderId));
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  return (
    <div className="container">
      <h1>Admin Orders</h1>
      <div className="orders-list">
        {orders.map((order) => (
          <div key={order._id} className="order-item">
            <h2>Order ID: {order._id}</h2>
            <p>Customer Name: {order.customer.cusName}</p>
            <p>Food Name: {order.foodName}</p>
            <p>Quantity: {order.quantity}</p>
            <p>Total Price: {order.totalPrice}</p>
            <p>Address: {order.address}</p>
            <div className="button-container">
              <button onClick={() => handleDeleteOrder(order._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminOrdersPage;
