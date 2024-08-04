import React, { useState } from 'react';
import GoogleSignIn from 'react-google-login';
import { BeatLoader } from 'react-spinners';
import { useHistory } from "react-router-dom";
import { LOGIN_ERROR } from '../constants/messageList';
import { API_ERROR } from '../constants/messageList';
import axios from 'axios';



function LoginAuth() {
  const history = useHistory();
  const [gLoginError, setgLoginError] = useState("");  
  const glClientID  = process.env.REACT_APP_GOOGLE_APP_ID; 
  const [loading, setLoading] = useState(false); 
  
  const responseGoogle = (response) => {      
    if(response){
      googleLoginSuccess(response);
    }else{
      alert(API_ERROR);
    }
  }
  
  const googleLoginSuccess = (res) => {
    const googleResUserData = {
      Name: res.profileObj.name,
      email: res.profileObj.email,
      token: res.googleId,
      Image: res.profileObj.imageUrl,
      ProviderId: 'Google'
    };
  

    const userEmail = googleResUserData.email;
    const emailName = userEmail.substring(0, userEmail.lastIndexOf("@")); 
    setgLoginError("");
    setLoading(true);
    const apiURL = '/gateway/api/auth';
    const data = {
      email: userEmail
    }
    axios.post(apiURL, data)
    .then(function (response) {
      const validUser =  response.data;
      setgLoginError("");
      setLoading(true);
      if(validUser.token){
        setgLoginError("");
        setLoading(false);
        sessionStorage.setItem("flag", "true"); 
        sessionStorage.setItem("UserToken", validUser.token);
        sessionStorage.setItem("UserRole", validUser.role); 
        sessionStorage.setItem("userData", JSON.stringify(googleResUserData));
        history.push(`/dashboard/${emailName}`);
      }
    })
    .catch(function (error) {
      console.log(error);
      setLoading(false);      
      setgLoginError(LOGIN_ERROR);
    });
    
  }

  return (
    <div className="login-google-box"> 
      <div className="seperator-box">
        <p><span>OR</span></p>
      </div>     
      <GoogleSignIn 
        clientId={glClientID}
        buttonText="Login with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
      />
      <div className="error">{gLoginError}</div>
      <BeatLoader color="#e80071" loading={loading}/>
    </div>   
  )
};

export default LoginAuth;
