import React from 'react';

function Card(props) {
  return (    
      <a href={props.link} className={`inner-box ui-card ${props.bgClass} ${props.textClass}`}>
        <div className="ui-card-box">
            <div className="ui-card-title">
              {props.title}
              <div className="ui-card-sub-text">
                {props.subText}
              </div>
            </div>
            { props.icon &&
              <div className="ui-card-icon">
                {props.icon}
              </div>
            }
        </div>
        { props.caption &&
          <div className={`caption ${props.borderClass}`}>
            {props.caption}
          </div> 
        } 
      </a> 
    
  )
}

export default Card;
