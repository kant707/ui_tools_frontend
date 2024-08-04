import React from 'react';
import Main from '../layouts/Main';
import Guidlines from '../components/Guidelines';


function GuidlinesHtml() {
  return (
    <Main>
      <div className="title">HTML Guidelines</div>
      <div className="inner">
        <Guidlines apiParms="g-html.json"/>
      </div> 
    </Main>
  )
};

export default GuidlinesHtml;
