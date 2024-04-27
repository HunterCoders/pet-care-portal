import React from "react";
import "./Homepage.css";
import logo from "./PetCareLogo.png";
import { Link } from "react-router-dom";
function Homepage() {
  return (
    <div className="App">
      <main>
        <h1 className="heading">PET PALACE</h1>
        <div className="desccont">
          <span className="desc">
            "Welcome to Pet Palace, your one-stop destination for all your furry
            friend's needs! At Pet Palace, we offer a wide range of premium pet
            food and supplies to keep your beloved companions happy and healthy.
            From nutritious meals to essential accessories, we have everything
            your pets need to thrive. But we're more than just a pet store -
            we're your pet's healthcare partner too. Our experienced team
            provides expert advice and assistance, ensuring your pet receives
            the best care possible. Whether it's scheduling routine check-ups or
            addressing specific health concerns, we're here to support you every
            step of the way.
          </span>
        </div>

        <section className="ImageSection">
          <img src={logo} alt="Welcome" />
          {/* <div className='logoDiv' style={{backgroundColor:'white'}}> */}
          {/* <img src={logo} alt="Welcome" style={{ width: '200px', height: '200px' }} /> */}
          {/* </div> */}
        </section>
        <section className="CardsSection">
          <div className="Card">
            <h2>Doctor</h2>
            <p>Explore our medical services</p>
            <button>
              <Link to="/docRegister">Register</Link>
            </button>
            <button>
              <Link to="/docLogin">Login</Link>
            </button>
          </div>
          <div className="Card">
            <h2>Customer</h2>
            <p>Find out about our customer services</p>
            <button>
              <Link to="/cusRegister">Register</Link>
            </button>
            <button>
              <Link to="/cusLogin">Login</Link>
            </button>
          </div>
          <div className="Card">
            <h2>Admin</h2>
            <p>Access admin features</p>
            <button>
              <Link to="/adminOptions">Login</Link>
            </button>
          </div>
        </section>
      </main>
      <div className="footer">
        <p>&copy; 2024 Pet Palace</p>
      </div>
    </div>
  );
}

export default Homepage;
