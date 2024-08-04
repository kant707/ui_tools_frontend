import React from 'react';
import Card from '../components/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope} from '@fortawesome/free-solid-svg-icons';

function EmailersSummary(props) {
  return (
    <div className="inner">
      <Card
        title={props.emailerTotal}
        subText="Total Emailers"
        bgClass="bck-blue"
        textClass="text-white"
        icon={<FontAwesomeIcon icon={faEnvelope} className="icon-white"/>}
      /> 
      <Card
        title={props.emailerNykaa}
        subText="Nykaa"
        bgClass="bck-blue"
        textClass="text-white"
        icon={<FontAwesomeIcon icon={faEnvelope} className="icon-white"/>}
      /> 
      <Card
        title={props.emailerNykaaman}
        subText="Nykaaman"
        bgClass="bck-blue"
        textClass="text-white"
        icon={<FontAwesomeIcon icon={faEnvelope} className="icon-white"/>}
      /> 
      <Card
        title={props.emailerNykaafashion}
        subText="Nykaafashion"
        bgClass="bck-blue"
        textClass="text-white"
        icon={<FontAwesomeIcon icon={faEnvelope} className="icon-white"/>}
      />
    </div>
  )
}

export default EmailersSummary;
