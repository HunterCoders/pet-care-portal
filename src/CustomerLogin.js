import React from 'react';
import './login.css';
import { useSearchParams,Link } from 'react-router-dom';

function CustomerLogin() {
    let [param]=useSearchParams();
    return (
        <div className="login-container">
            <form className="login-form" action='/cusloginNode' method='post'>
            <h1 style={{textAlign:'center'}}>Login YourSelf</h1>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" name='uname' className="form-control" placeholder="Enter your username" />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" name='pass' id="password" className="form-control" placeholder="Enter your password" />
                </div>
                
                    <button type="submit" className="btn-submit">Login</button>
                
                {
                    param.get('param')==='reg' &&(
                        <div className='registered' style={{color:'green',textAlign:'center'}}>Registration Success!! Login</div>
                    )
                }
                {
                    param.get('param')==='invalid' &&(
                        <div className='registered' style={{color:'red',textAlign:'center'}}>Invalid Credentials</div>
                    )
                }
                {
                    param.get('param')==='log' &&(
                        <div className='registered' style={{color:'red',textAlign:'center'}}>Login First</div>
                    )
                }
                <div className='already-registered'>
                    Not Registered? Click <Link to='/cusregister'>Here</Link>
                </div>
            </form>
        </div>
    );
}

export default CustomerLogin;
