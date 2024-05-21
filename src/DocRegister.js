import React, { useState } from "react";
import "./Register.css";
import { Link, useSearchParams } from "react-router-dom";


function DocRegister() {
  let [param] = useSearchParams(); // Remove 'param' from useParams()
  const [Err,setErr]=useState("");
  const [passErr,setPassErr]=useState("");
  const checkParams=(event)=>{
    setErr('');
    setPassErr('');
    event.preventDefault();
    const docName = event.target.docName.value.trim();
    const docEmail = event.target.docEmail.value.trim();
    const docNum = event.target.docNum.value.trim();
    const docLicNo = event.target.docLicNo.value.trim();
    const docPass=event.target.docPass.value.trim();
    const docPassconf = event.target.docPassconf.value.trim();
    if(!docEmail || !docPass || !docPassconf || !docName || !docNum || !docLicNo){
      setErr('All Fields are required');
      return;
    }
    else if(docPass!==docPassconf)
    {
      setPassErr('Confirm Password and Password Should Match');
      return;
    }
    event.target.submit();

  }

  return (
    <>
      <form onSubmit={checkParams}
        action="/DocRegister"
        method="post"
        className="register-form"
      >
        <h1 style={{textAlign:'center'}}>Register Doctor</h1>
        <div className="form-group">
        <label htmlFor="docName">Doctor Name:</label>
          Dr. <input
            type="text"
            name="docName"
            id="docName"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="docEmail">Email:</label>
          <input
            type="email"
            name="docEmail"
            id="docEmail"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="docLicNo">License Number:</label>
          <input type="text" name="docLicNo" id="docLicNo" className="form-control" />
        </div>
        <div className="form-group">
          <label htmlFor="docNum">Contact Number:</label>
          <input type="text" name="docNum" id="docNum" className="form-control" />
        </div>
        <div className="form-group">
          <label htmlFor="docPass">Password:</label>
          <input type="password" name="docPass" id="docPass" className="form-control" />
        </div>

        <div className="form-group">
          <label htmlFor="docPassconf">Confirm Password:</label>
          <input
            type="password"
            name="docPassconf"
            id="docPassconf"
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
        Already registered? <Link to="/docLogin">Click Here</Link>
      </div>
      </form>

      
    </>
  );
}

export default DocRegister;