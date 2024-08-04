import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import { useHistory } from "react-router-dom";

function Main({children}) {
  const isUserAuth = sessionStorage.getItem("flag") || "false";    
  const history = useHistory();

  useEffect(() => {
    if(isUserAuth === "false") {
      history.push('/login');
    }
  });

  return (
    <div className="dashboard">
      <Navbar />
      <div className="main">
        {children}    
      </div>      
    </div> 
  )
};

export default Main;
