import React from 'react';
import Main from '../layouts/Main';
import './../assets/css/UsersInfo.css';
import UsersInfo from '../components/UsersInfo';

function Users() {
  return (
    <Main>
      <div className="title">Users</div> 
      <UsersInfo/>      
    </Main>
  )
}

export default Users;
