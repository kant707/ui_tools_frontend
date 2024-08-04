import React from 'react';
import Main from '../layouts/Main';
import Guidlines from '../components/Guidelines';

function AplusVideo() {
  return (
    <Main>
      <div className="title">Help</div>
      <div className="sort-title">A+ Content Videos</div>
      <div className="inner">
        <Guidlines apiParms="aplus-video.json"/>
      </div> 
    </Main>
  )
}

export default AplusVideo;
