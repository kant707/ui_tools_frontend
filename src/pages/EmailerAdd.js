import React from 'react';
import Main from '../layouts/Main';
import './../assets/css/Emailer.css';
// import TemplateUploadForm from '../components/TemplateUploadForm';
import EmailerAddCmp from '../components/EmailerAddCmp';

function EmailerAdd() {
  const userRoleValue = sessionStorage.getItem("UserRole");
  
  return (    
    <>    
      <Main>
        <div className="title">Add Emailer Template</div>
        <div className="inner">
        { (userRoleValue === 'admin' || userRoleValue === 'author') &&
          <EmailerAddCmp />
        }
        </div>
      </Main>   
    </>
  );
}

export default EmailerAdd;
