import React from 'react';
import Main from '../layouts/Main';
import Card from '../components/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardList, faBook, faVideo } from '@fortawesome/free-solid-svg-icons';


function Help() {  
  return (
    <Main>
      <div className="title">Help</div>
      <div className="sort-title">A+ Content</div>
      <div className="inner">
        <Card
          title="User Handbook"
          icon={<FontAwesomeIcon icon={faBook} />}
          subText="Document will help to know the application uses."
          link="/aplushandbook"
        /> 
        <Card
          title="FAQs"
          icon={<FontAwesomeIcon icon={faClipboardList} />}
          subText="Answers will help to users which questions asked frequently."
          link="/aplusfaq"
        /> 
        <Card
          title="Videos"
          icon={<FontAwesomeIcon icon={faVideo} />}
          subText="Short videos will help to know the application uses."
          link="/aplusvideo"
        />                  
      </div>
    </Main>
  )
};

export default Help;
