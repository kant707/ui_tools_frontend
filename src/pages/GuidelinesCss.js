import React from 'react';
import Main from '../layouts/Main';
import Guidlines from '../components/Guidelines';


function GuidlinesCss() {  
  return ( 
    <Main>
      <div className="title">CSS Guidelines</div>
      <div className="inner">
        <Guidlines apiParms="g-css.json"/>
      </div> 
    </Main>
  )
};

export default GuidlinesCss;
