import React from 'react';
import Main from '../layouts/Main';
import AplusContent from './../components/AplusContent';
import AplusImage from './../components/AplusImage';


function AplusValidator() {    
  return (
    <Main>
      <div className="title">A+ Content Validator</div>
      <div className="inner">
        <AplusContent/>
        <AplusImage/>            
      </div> 
    </Main>
  );
};

export default AplusValidator;
