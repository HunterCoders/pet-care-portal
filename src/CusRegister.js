import React, { useState } from "react";
import "./Register.css";
import { Link, useSearchParams } from "react-router-dom";

function CusRegister() {
    let [param] = useSearchParams(); // Remove 'param' from useParams()
    const [Err,setErr]=useState("");
    const [passErr,setPassErr]=useState("");
    const checkParams=(event)=>{
      setErr('');
      setPassErr('');
      event.preventDefault();
      const cusName = event.target.cusName.value.trim();
      const cusEmail = event.target.cusEmail.value.trim();
      const cusContact = event.target.cusContact.value.trim();
      const cusPass=event.target.cusPass.value.trim();
      const cusPassconf = event.target.cusPassconf.value.trim();
      if(!cusEmail || !cusPass || !cusPassconf || !cusContact || !cusName){
        setErr('All Fields are required');
        return;
      }
      else if(cusPass!==cusPassconf)
      {
        setPassErr('Confirm Password and Password Should Match');
        return;
      }
      event.target.submit();
  
    }
  
    return (
      <>
        <form onSubmit={checkParams}
          action="http://localhost:3001/CusRegister"
          method="post"
          className="register-form"
        >
          <h1 style={{textAlign:'center'}}>Register Customer</h1>
          <div className="form-group">
          <label htmlFor="cusName">Name:</label>
            <input
              type="text"
              name="cusName"
              id="cusName"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="cusEmail">Email:</label>
            <input
              type="email"
              name="cusEmail"
              id="cusEmail"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="cusContact">Contact Number:</label>
            <input type="text" name="cusContact" id="cusContact" className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="cusPass">Password:</label>
            <input type="password" name="cusPass" id="cusPass" className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="cusPassconf">Confirm Password:</label>
            <input
              type="password"
              name="cusPassconf"
              id="cusPassconf"
              className="form-control"
            />
          </div>
          {passErr && (
            <div style={{ color: "red" }} className="already">
              {passErr}
            </div>
          )}
          <input type="submit" value="Register" className="btn-submit" />
          <br></br><br></br>
          {param.get('param') === 'old' && (
            <div style={{ color: "red" }} className="already">
              Email ID Already Exists !! Please Login
            </div>
          )}
          {Err && (
            <div style={{ color: "red" }} className="already">
              {Err}
            </div>
          )}
          <div className="already-registered">
          Already registered? <Link to="/cusLogin">Click Here</Link>
        </div>
        </form>
  
        
      </>
    );
  }
  
  export default CusRegister;