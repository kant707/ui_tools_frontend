import React from 'react';
import Main from '../layouts/Main';
import Guidlines from '../components/Guidelines';

function AplusFaq() {
  return (
    <Main>
      <div className="title">Help</div>
      <div className="sort-title">A+ Content FAQs</div>
      <div className="inner">
        <Guidlines apiParms="aplus-faq.json"/>
      </div> 
    </Main>
  )
}

export default AplusFaq;
