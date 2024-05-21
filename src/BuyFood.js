// BuyFoodPage.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./BuyFoodPage.css";
import { useSearchParams} from 'react-router-dom';


// Function to import all images from a directory
// Function to import all images from a directory and sort them by upload time
function importAll(r) {
  const images = r.keys().map((key) => {
    const fileName = key.split("/").pop(); // Extract the filename from the path
    const uploadTime = parseInt(fileName); // Convert filename to integer as upload time
    return {
      src: r(key),
      uploadTime: uploadTime
    };
  });

  // Sort images based on upload time
  images.sort((a, b) => b.uploadTime - a.uploadTime);

  return images.map((img) => img.src);
}



const images = importAll(require.context("./uploads", false, /\.(jpe?g|svg|JPG)$/));
// images.reverse(); // Reverse the array to display the last index first
console.log(images);
const BuyFoodPage = () => {
  let [param]=useSearchParams();
  const [foods, setFoods] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [imageIndex] = useState(images.length - 1); // Initialize the index with the last image

  // Fetch food data from MongoDB on component mount
  useEffect(() => {
    axios
      .get("/foods")
      .then((response) => {
        setFoods(response.data);
      })
      .catch((error) => {
        console.error("Error fetching food data:", error);
      });
  }, []);

  // Handle food selection
  const handleFoodSelect = (food) => {
    setSelectedFood(food);
    setTotalPrice(food.price * quantity);
  };

  // Handle quantity change
  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value);
    setQuantity(newQuantity);
    if (selectedFood) {
      setTotalPrice(selectedFood.price * newQuantity);
    }
  };


  return (
    <div className="container">
      <h1>Buy Food</h1><br></br>
      <form action="/addorder" method="post">
        <div className="food-list">
          {foods.map((food, index) => (
            <div
              key={food._id}
              className="food-item"
              onClick={() => handleFoodSelect(food)}
            >
              {/* Displaying the image based on the current image index */}
              <img
                src={images[(index + imageIndex) % images.length]}
                alt={food.name}
              />
              <div className="food-details">
                <h2>{food.name}</h2>
                <p>Type: {food.type}</p>
                <p>Available Quantity: {food.quantity}</p>
                <p>Price: ${food.price}</p>
              </div>
            </div>
          ))}
        </div>
        {selectedFood && (
          <div className="selected-food">
            <h2>Selected Food: {selectedFood.name}</h2>
            <input
              type="text"
              hidden
              name="foodName"
              value={selectedFood.name}
            ></input>
            <label htmlFor="quantity">Quantity:</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              min="1"
              value={quantity}
              onChange={handleQuantityChange}
            />
            <p>Total Price: ${totalPrice}</p>
            <input
              type="text"
              hidden
              name="totalPrice"
              value={totalPrice}
            ></input>
            <p>Address:</p>
            <input
              type="text"
              
              name="address"
            ></input>
            <button type="submit">Buy</button>
          </div>
        )}
        {
                    param.get('param')==='done' &&(
                        <div className='registered' style={{color:'green',textAlign:'center'}}>Order Success</div>
                    )
                }
      </form>
      
    </div>
  );
};

export default BuyFoodPage;
