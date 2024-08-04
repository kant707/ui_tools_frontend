import React from 'react';
import Main from '../layouts/Main';
import './../assets/css/Emailer.css';
import EmailersCmp from '../components/EmailersCmp';

function Emailers() {
  return (
    <Main>
      <div className="title">Emailers</div> 
      <EmailersCmp />      
    </Main>
  )
}

export default Emailers;
