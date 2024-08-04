import React from 'react';
import Main from '../layouts/Main';
import Guidlines from '../components/Guidelines';

function AplusHandbook() {
  return (
    <Main>
      <div className="title">Help</div>
      <div className="sort-title">A+ Content User Handbook</div>
      <div className="inner">
        <Guidlines apiParms="aplus-handbook.json"/>
      </div> 
    </Main>
  )
}

export default AplusHandbook;
