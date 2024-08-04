import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UsersSummary from './UsersSummary';
import { Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faCheckCircle, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import MessageManager from './MessageManager';
import {
   USER_ADDED_SUCCESS,
   USER_ADDED_ERROR, 
   SERVER_ERROR,
   USER_UPDATE_SUCCESS,
   USER_DELETE_SUCCESS,
   FORM_EMPTY_ERROR,
   FORM_EMAIL_ERROR, 
  } from './../constants/messageList';
import ModalBox from './ModalBox';
import {validateEmail, indianDateTimeFormat} from './../helpers';


function UsersInfo(e) {
  const [allUserData, setAllUserData] = useState([]); 
  const [userTotal, setUesrTotal] = useState([]);
  const [userAdmin, setUesrAdmin] = useState([]);
  const [userAuthors, setUesrAuthors] = useState([]);
  const [userPublisher, setUesrPublisher] = useState([]);
  const [userSubscriber, setUesrSubscriber] = useState([]);
  const [mmShow, setMmShow] = useState(false);
  const [mmVariant, setMmVariant] = useState([]); 
  const [mmIcon, setMmIcon] = useState([]); 
  const [mmText, setMmText] = useState([]); 
  const { SearchBar, ClearSearchButton } = Search;
  const [formData, setFormData] = useState({userEmail: '', userRole: ''});
  const {userEmail, userRole} = formData;
  const [modalShowEdit, setModalShowEdit] = useState(false);
  const [modalShowDelete, setModalShowDelete] = useState(false);
  const [modalUserEmail, setModalUserEmail] = useState([]);
  const [modalUserID, setModalUserID] = useState([]);
  const [modalUserRole, setModalUserRole] = useState([]);
  const [formError, setFormError] = useState();
  const iconSuccess  = <FontAwesomeIcon icon={faCheckCircle} />;
  const iconError  = <FontAwesomeIcon icon={faExclamationTriangle} />;


  const getAllUsers = async e => {
    try {
      const config = {
        headers: {
          'x-auth-token': sessionStorage.getItem('UserToken'),
        }
      }
      const res = await axios.get(`/gateway/api/users`, config);
      setAllUserData(res.data);
      setUesrTotal(allUserData.length);
      setUesrAdmin((allUserData.filter( elm => elm.role === 'admin')).length);
      setUesrAuthors((allUserData.filter( elm => elm.role === 'author')).length);
      setUesrPublisher((allUserData.filter( elm => elm.role === 'publisher')).length);
      setUesrSubscriber((allUserData.filter( elm => elm.role === 'subscriber')).length);      
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data) {       
        showMessageManger("danger", iconError, SERVER_ERROR);
      }
    }
  } 
  
  const onChange = e => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };  

  const onSubmit = async (e) => {
    e.preventDefault();
    let formIsValid = true;

    if(userEmail === "" || userRole === ""){
      formIsValid = false;
      setFormError(FORM_EMPTY_ERROR);
      return false;
    }
    
    if(!validateEmail(userEmail)){
      formIsValid = false;
      setFormError(FORM_EMAIL_ERROR);
      return false;
    }    
    
    if(formIsValid) {
      setFormError('');
      const createUserInfo = {email: userEmail, role: userRole};
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': sessionStorage.getItem('UserToken'),
          }
        }
        const body = JSON.stringify(createUserInfo);
        const res = await axios.post(`/gateway/api/users`, body, config);
        if(res.status === 200){
          showMessageManger("success", iconSuccess, USER_ADDED_SUCCESS);
        }      
        getAllUsers();
      } catch (err) {
        console.error(err);
        if (err.response && err.response.data) {       
          if(err.response.status === 400){
            showMessageManger("danger", iconError, USER_ADDED_ERROR);
          }else{
            showMessageManger("danger", iconError, SERVER_ERROR);
          }
        }
      } 
      onReset();
    }
    
    
  }

  const onReset = () => {    
    setFormData({userEmail: '', userRole: ''});
  }
 
  const columns = [
    { dataField: 'email', text: 'User Email', sort: true },
    { dataField: 'role', text: 'Role', sort: true },
    // { dataField: 'date', text: 'Date', sort: true },
    { dataField: 'date', text: 'Date', sort: true, formatter: (cellContent, row) => { 
      return(
        <>          
          {indianDateTimeFormat(row.date).replaceAll(', ' , ' : ').slice(0, -3)}
        </>
      );
    } },    
    { dataField: 'action', text: 'Action', formatter: (cellContent, row) => {
      return (
        <>
          <span className="user-action-btn" onClick={(email, role) => onOpenModalEdit(row.email, row._id, row.role)}>
            <FontAwesomeIcon
              icon={faEdit}
            />
          </span>
          <span className="user-action-btn" onClick={(email, id)=> onOpenModalDelete(row.email, row._id)}>
            <FontAwesomeIcon
              icon={faTrashAlt}
            />
          </span>
        </>
      );
    },
    }
  ];

  const defaultSorted = [{
    dataField: 'date',
    order: 'desc',
  }];

  const pagination = paginationFactory({
    page: 1,
    sizePerPage: 5,
    lastPageText: '>>',
    firstPageText: '<<',
    nextPageText: '>',
    prePageText: '<',
    showTotal: true,
    alwaysShowAllBtns: true,
    onPageChange: function (page, sizePerPage) {
    },
    onSizePerPageChange: function (page, sizePerPage) {
    }
  });  

  const showMessageManger = (variant, icon, text) => {
    setMmShow(true);    
    setMmVariant(variant);
    setMmIcon(icon);
    setMmText(text);
    setTimeout(()=> setMmShow(false), 3000);
  }
  
  const onOpenModalEdit = (email, id, role) => {    
    setModalShowEdit(true);
    setModalShowDelete(false);
    setModalUserEmail(email);
    setModalUserID(id);
    setModalUserRole(role);

  }
  const onUserEdit = async () => {
    const createUserRole = {role: modalUserRole};
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': sessionStorage.getItem('UserToken'),
        }
      }
      const body = JSON.stringify(createUserRole);
      const res = await axios.patch(`/gateway/api/users/${modalUserID}`, body, config);

      if(res.status === 200){
        showMessageManger("success", iconSuccess, USER_UPDATE_SUCCESS);
        setModalShowEdit(false);
      }      
      getAllUsers();
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data) {       
        showMessageManger("danger", iconError, SERVER_ERROR);
      }
    } 
  }

  const onOpenModalDelete = (email, id) => {    
    setModalShowDelete(true);
    setModalShowEdit(false);
    setModalUserEmail(email);
    setModalUserID(id);
  }
  const onUserDelete = async () => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': sessionStorage.getItem('UserToken'),
        }
      }
      const res = await axios.delete(`/gateway/api/users/${modalUserID}`, config);      
      if(res.status === 200){
        showMessageManger("success", iconSuccess, USER_DELETE_SUCCESS);
        setModalShowDelete(false);
      }      
      getAllUsers();
    } catch (err) {     
      if (err.response && err.response.data) {       
        showMessageManger("danger", iconError, SERVER_ERROR);
      }
    } 
  }

  const onUserRoleChange = (e) => {
    setModalUserRole(e.target.value);
  }

  useEffect(() => {
    getAllUsers();
  },[]);


  return (
    <>
      <UsersSummary 
        userTotal = {userTotal}
        userAdmin = {userAdmin}
        userAuthors = {userAuthors}
        userPublisher = {userPublisher}
        userSubscriber = {userSubscriber}
      />
      <div className="inner">
        <div className="inner-box">
          <h2 className="sub-title">Add Users</h2>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter Email" name="userEmail" value={userEmail}  onChange={e => onChange(e)} required/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicSelect">
              <Form.Label >Role</Form.Label>
              <Form.Select name="userRole" value={userRole} onChange={e => onChange(e)} required>
                <option key="0" value="">Select Role</option>
                <option key="1" value="subscriber">Subscriber</option>
                <option key="2" value="publisher">Publisher</option>
                <option key="3" value="author">Author</option>
                <option key="4" value="admin">Admin</option>
              </Form.Select>
            </Form.Group>
            <div className="ui-alert ui-alert-danger" role="alert">
              {formError}
            </div>
            <Button variant={`primary`} type="submit" id="userSubmit" onClick={e => onSubmit(e)}>
              Submit
            </Button>
          </Form>          
        </div>
      </div>
      <div className="inner">
        <div className="inner-box">
        <h2 className="sub-title">Users</h2>
        <div className="tabular-data-wrap">
          <ToolkitProvider
            bootstrap4
            keyField='id'
            data={allUserData}
            columns={columns}
            search
          >
            {
              props => (
                <>
                  <div className="tbl-search-bar">
                    <SearchBar {...props.searchProps} className="tbl-search" />
                    <ClearSearchButton {...props.searchProps} className="tbl-search-clear-btn" />
                  </div>
                  <hr />
                  <BootstrapTable
                    defaultSorted={defaultSorted}
                    pagination={pagination}
                    {...props.baseProps}
                    responsive
                    hover
                  />
                </>
              )
            }
          </ToolkitProvider>
        </div>
      </div>     
      </div>
      
    
      <MessageManager 
        show = {mmShow}
        variant={mmVariant}
        icon={mmIcon} 
        text={mmText} 
        closeFuction={()=>setMmShow(false)}
      />      

      <ModalBox 
        id="modalshowedit"
        size = "lg"
        centered = {false}
        title="Edit User"
        body = {
          <>            
            <Form.Group className="mb-3" controlId="formBasicSelect">
              <Form.Label >Email</Form.Label>
              <Form.Control type="text" value={modalUserEmail} readOnly />             
            </Form.Group>
      
            <Form.Group className="mb-3" controlId="formBasicSelect">
              <Form.Label >Role</Form.Label>
              <Form.Select name="userRole" value={modalUserRole} onChange={e => onUserRoleChange(e)} required>
                <option key="0" value="">Select Role</option>
                <option key="1" value="subscriber">Subscriber</option>
                <option key="2" value="publisher">Publisher</option>
                <option key="3" value="author">Author</option>
                <option key="4" value="admin">Admin</option>
              </Form.Select>
            </Form.Group>
          </>
        }
        footer = {
          <>
          <Button variant="secondary" onClick={() => setModalShowEdit(false)}>Cancel</Button>
          <Button variant="primary" onClick={onUserEdit}>Update</Button>
          </>
        }        
        show={modalShowEdit}
        onHide={() => setModalShowEdit(false)}
      />

      <ModalBox 
        ID = "modalshowdelete"
        size = "lg"
        centered = {false}
        title="Delete User"
        body = {
          <>
          <p>Email: {modalUserEmail}</p>
          <p>Are you sure you want to delete this user?</p>
          </>
        }
        footer = {
          <>
          <Button variant="secondary" onClick={() => setModalShowDelete(false)}>Cancel</Button>
          <Button variant="primary" onClick={onUserDelete}>Delete</Button>
          </>
        }        
        show={modalShowDelete}
        onHide={() => setModalShowDelete(false)}
      />

      

    </>
  )
};

export default UsersInfo;
