import React from 'react';
import Main from '../layouts/Main';
import Guidlines from '../components/Guidelines';


function GuidlinesJs() {  
  return (
    <Main>
      <div className="title">JS Guidelines</div>
      <div className="inner">
        <Guidlines apiParms="g-js.json"/>
      </div> 
    </Main>
  )
};

export default GuidlinesJs;
