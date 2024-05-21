import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// const balls = document.querySelectorAll('.gradient-ball');

// balls.forEach((ball) => {
//   const randomBlue = Math.floor(Math.random() * 100) + 100; // Random value between 100 and 255 for lighter shades of blue
//   const randomColor = `rgb(50, 50, ${randomBlue})`; // Lighter shade of blue
//   const randomSize = Math.floor(Math.random() * 20) + 10; // Random size between 10px and 30px

//   ball.style.background = `radial-gradient(circle at 50% 50%, ${randomColor}, #000)`;
//   ball.style.width = `${randomSize}px`;
//   ball.style.height = `${randomSize}px`;
// });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
