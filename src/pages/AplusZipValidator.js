import React from 'react';
import Main from '../layouts/Main';
import AplusZip from '../components/AplusZip';

function AplusZipValidator() {  
  return (
    <Main>
      <div className="title">A+ Content Zip Validator</div>
      <div className="inner">
        <AplusZip/>
      </div> 
    </Main>
  )
};

export default AplusZipValidator;
