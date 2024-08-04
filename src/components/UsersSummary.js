import React from 'react';
import Card from '../components/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser} from '@fortawesome/free-solid-svg-icons';

function UsersSummary(props) {
  return (
    <div className="inner">
      <Card
          title={props.userTotal}
          subText="Total Users"
          bgClass="bck-blue"
          textClass="text-white"
          icon={<FontAwesomeIcon icon={faUser} className="icon-white"/>}
      /> 
      <Card
          title={props.userAdmin}
          subText="Admins"
          bgClass="bck-blue"
          textClass="text-white"
          icon={<FontAwesomeIcon icon={faUser} className="icon-white"/>}
      /> 
      <Card
          title={props.userAuthors}
          subText="Authors"
          bgClass="bck-blue"
          textClass="text-white"
          icon={<FontAwesomeIcon icon={faUser} className="icon-white"/>}
      /> 
      <Card
          title={props.userPublisher}
          subText="Publishers"
          bgClass="bck-blue"
          textClass="text-white"
          icon={<FontAwesomeIcon icon={faUser} className="icon-white"/>}
      /> 
      <Card
          title={props.userSubscriber}
          subText="Subscribers"
          bgClass="bck-blue"
          textClass="text-white"
          icon={<FontAwesomeIcon icon={faUser} className="icon-white"/>}
      />
    </div>
  )
}

export default UsersSummary;
