import React from 'react';
import Main from '../layouts/Main';
import Card from '../components/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode, faFileArchive, faLaptop, faList, faUser, faUserPlus, faUserEdit, faUserTimes, faEnvelope } from '@fortawesome/free-solid-svg-icons';


function Dashboard() {   
  const userRoleValue = sessionStorage.getItem("UserRole");
   
  return (
    <Main>
      <div className="title">Dashboard</div>
      <div className="sort-title">A+ Content</div>
      <div className="inner">
        <Card
          title="A+ Content Validator"
          link="/aplusvalidator"
          bgClass="bck-purple"
          textClass="text-white"
          borderClass="border-white"
          icon={<FontAwesomeIcon icon={faCode} className="icon-white"/>}
          caption="more info"
        /> 
        <Card
          title="A+ Content Zip Validator"
          link="/apluszipvalidator"
          bgClass="bck-pink"
          textClass="text-white"
          borderClass="border-white"
          icon={<FontAwesomeIcon icon={faFileArchive} className="icon-white"/>}
          caption="more info"
        /> 
        <Card
          title="A+ Responsive Validator"
          link="/responsivevalidator"
          bgClass="bck-yellow"
          textClass="text-white"
          borderClass="border-white"
          icon={<FontAwesomeIcon icon={faLaptop} className="icon-white"/>}
          caption="more info"
        /> 
        <Card
          title="A+ Content Guidelines"
          link="/guidelinesaplus"
          bgClass="bck-green"
          textClass="text-white"
          borderClass="border-white"
          icon={<FontAwesomeIcon icon={faList} className="icon-white"/>}
          caption="more info"
        />                  
      </div> 
      <div className="sort-title">Guidelines</div>
      <div className="inner">
        <Card
          title="HTML GUIDELINES"
          icon={<FontAwesomeIcon icon={faList} />}
          subText="Will help to write clean and structure code."
          link="/guidelineshtml"
          caption="more info"
        /> 
        <Card
          title="CSS GUIDELINES"
          icon={<FontAwesomeIcon icon={faList} />}
          subText="Will help to write clean and structure code."
          link="/guidelinescss"
          caption="more info"
        /> 
        <Card
          title="JS GUIDELINES"
          icon={<FontAwesomeIcon icon={faList} />}
          subText="Will help to write clean and structure code."
          link="/guidelinesjs"
          caption="more info"
        />                  
      </div>
      { (userRoleValue === 'admin' || userRoleValue === 'author' || userRoleValue === 'publisher') &&
        <>
          <div className="sort-title">Emailers</div>
          <div className="inner">
            <Card
              title="Emailers List"
              link="/emailer"
              bgClass="bck-blue"
              textClass="text-white"
              borderClass="border-white"
              icon={<FontAwesomeIcon icon={faEnvelope} className="icon-white"/>}
              caption="more info"
            />
            { (userRoleValue === 'admin' || userRoleValue === 'author') &&
              <Card
                title="Add Emailer"
                link="/emailer-add"
                bgClass="bck-blue"
                textClass="text-white"
                borderClass="border-white"
                icon={<FontAwesomeIcon icon={faEnvelope} className="icon-white"/>}
                caption="more info"
              />
            }
          </div> 
        </>
      }

      { userRoleValue === 'admin' &&
        <>
          <div className="sort-title">Users</div>
          <div className="inner">
          <Card
            title="Users List"
            link="/users"
            bgClass="bck-blue"
            textClass="text-white"
            borderClass="border-white"
            icon={<FontAwesomeIcon icon={faUser} className="icon-white"/>}
            caption="more info"
          /> 
          <Card
            title="Add User"
            link="/users"
            bgClass="bck-blue"
            textClass="text-white"
            borderClass="border-white"
            icon={<FontAwesomeIcon icon={faUserPlus} className="icon-white"/>}
            caption="more info"
          /> 
          <Card
            title="Update User"
            link="/users"
            bgClass="bck-blue"
            textClass="text-white"
            borderClass="border-white"
            icon={<FontAwesomeIcon icon={faUserEdit} className="icon-white"/>}
            caption="more info"
          /> 
          <Card
            title="Delete User"
            link="/users"
            bgClass="bck-blue"
            textClass="text-white"
            borderClass="border-white"
            icon={<FontAwesomeIcon icon={faUserTimes} className="icon-white"/>}
            caption="more info"
          /> 
                            
        </div> 
        </>
      }
    </Main>
  );
};

export default Dashboard;
