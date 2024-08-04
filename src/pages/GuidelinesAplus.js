import React from 'react';
import Main from '../layouts/Main';
import Guidlines from '../components/Guidelines';


function GuidelinesAplusContent() {
  return (
    <Main>
      <div className="title">A+ Content Guidelines</div>
        <div className="inner">
          <Guidlines apiParms="g-aplus.json"/>
        </div> 
    </Main>
  )
};

export default GuidelinesAplusContent;
