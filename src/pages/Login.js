import React from 'react';
import LoginLeftNav from '../components/LoginLeftNav';
import LoginForm from '../components/LoginForm';
import LoginGoogle from '../components/LoginGoogle';


function Login() { 
  sessionStorage.setItem("flag", "false");
  sessionStorage.setItem("userData", "null");

  return (
    <div className="login"> 
      <LoginLeftNav />
      <div className="main">
        <div className="login-box">
          <LoginForm />
          <LoginGoogle />
        </div>        
      </div>       
    </div>
  )
};

export default Login;
