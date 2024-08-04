import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faTachometerAlt,
  faCode,
  faFileArchive,
  faLaptop,
  faList,
  faQuestion,
  faPowerOff,
  faEnvelope,
} from '@fortawesome/free-solid-svg-icons';


function Navbar() {
  const userRoleValue = sessionStorage.getItem("UserRole");
  const [userName, setUserName] = useState('');
  const [userImage, setUserImage] = useState('');
   
  useEffect(() => {      
    const data = JSON.parse(sessionStorage.getItem('userData'));  
    setUserName(data?.Name);
    setUserImage(data?.Image);
  },[])

  return (
    <div className="side-nav">
      <h1>Nykaa UI tools</h1>      
      <div className="user">
        <img src={userImage} alt="" className="image-avatar"/>
        <p>Hi {userName}</p>
      </div>
      
      <ul className="nav">
        <NavLink to="/dashboard" exact activeClassName="active" className="list">
          <i><FontAwesomeIcon icon={faTachometerAlt} /></i>
          <span>Dashboard</span>
        </NavLink>
        { (userRoleValue === 'admin' || userRoleValue === 'author' || userRoleValue === 'publisher') &&
          <NavLink to="/emailer" exact activeClassName="active" className="list">
            <FontAwesomeIcon icon={faEnvelope} />
            <span>Emailers</span>
          </NavLink>
        }        
        <NavLink to="/aplusvalidator" exact activeClassName="active" className="list">
          <i><FontAwesomeIcon icon={faCode} /></i>
          <span>A+ Content Validator</span>
        </NavLink>
        <NavLink to="/apluszipvalidator" exact activeClassName="active" className="list">
          <i><FontAwesomeIcon icon={faFileArchive} /></i>
          <span>A+ Content Zip Validator</span>
        </NavLink>
        <NavLink to="/responsivevalidator" exact activeClassName="active" className="list">
          <i><FontAwesomeIcon icon={faLaptop} /></i>
          <span>A+ Responsive Validator</span>
        </NavLink>
        <NavLink to="/guidelinesaplus" exact activeClassName="active" className="list">
          <i><FontAwesomeIcon icon={faList} /></i>
          <span>A+ Content Guidelines</span>
        </NavLink>
        <NavLink to="/help" exact activeClassName="active"  className="list">
          <i><FontAwesomeIcon icon={faQuestion} /></i>
          <span>Help</span>
        </NavLink>
        <NavLink to="/login" className="list">
          <i><FontAwesomeIcon icon={faPowerOff} /></i>
          <span>Logout</span>
        </NavLink>
      </ul>              
    </div>
  )
};

export default Navbar;
