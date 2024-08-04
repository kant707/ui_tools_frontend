import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faCheckCircle, faExclamationTriangle, faEye, faDownload } from '@fortawesome/free-solid-svg-icons';
// import dateFormat, { masks } from "dateformat";
import MessageManager from './MessageManager';
import EmailersSummary from './EmailersSummary';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import ModalBox from './ModalBox';
import {downloadHtml, indianDateTimeFormat} from '../helpers';
import { TEMPLATE_DELETE_SUCCESS, SERVER_ERROR } from '../constants/messageList';

function EmailersCmp(e) {
  const userRoleValue = sessionStorage.getItem("UserRole");
  let currentUserEmail = JSON.parse(sessionStorage.getItem("userData"))?.email;
  
  const [allTemplateData, setAllTemplateData] = useState([]);
  const [emailersData, setEmailersData] = useState({
    emailerTotal: '-',
    emailerNykaa: '-',
    emailerNykaaman: '-',
    emailerNykaafashion: '-',
  });
  const [mmShow, setMmShow] = useState(false);
  const [mmVariant, setMmVariant] = useState([]); 
  const [mmIcon, setMmIcon] = useState([]); 
  const [mmText, setMmText] = useState([]); 
  const { SearchBar, ClearSearchButton } = Search;
  const [modalShowDelete, setModalShowDelete] = useState(false);

  const [modalPreview, setModalPreview] = useState(false);
  const [modalPreviewTemplateContent, setModalPreviewTemplateContent] = useState([]);
  const [modalTemplateId, setModalTemplateId] = useState([]);
  const [modalTemplateName, setModalTemplateName] = useState([]);
  
  const iconSuccess  = <FontAwesomeIcon icon={faCheckCircle} />;
  const iconError  = <FontAwesomeIcon icon={faExclamationTriangle} />;

  const getAllEmailers = async e => {
    try {
      const config = {
        headers: {
          'x-auth-token': sessionStorage.getItem('UserToken'),
        }
      }
      const res = await axios.get(`/gateway/api/emailer`, config);
        setAllTemplateData(res.data);
        const data = res.data;
        const nykaa = data.filter(cur => cur.domain === 'Nykaa' || cur.domain === 'nykaa');
        const nykaaman = data.filter(cur => cur.domain === 'Nykaaman' || cur.domain === 'nykaaman');
        const nykaafashion = data.filter(cur => cur.domain === 'Nykaafashion' || cur.domain === 'nykaafashion');
        setEmailersData({
          emailerTotal: data.length,
          emailerNykaa: nykaa.length,
          emailerNykaaman: nykaaman.length,
          emailerNykaafashion: nykaafashion.length,
        });
        // console.log('Emailer Data: ', emailersData)
      } catch (err) {
      console.error(err);
      if (err.response && err.response.data) {       
        showMessageManger("danger", iconError, SERVER_ERROR);
      }
    }
  } 


  const columns = [
    { dataField: 'templateName', text: 'Template Name', sort: true },
    { dataField: 'domain', text: 'Domain', sort: true },
    { dataField: 'templateType', text: 'Template Type', sort: true },
    { dataField: 'email', text: 'Author', sort: true },
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
        <div className="action-wrapper">
          { (userRoleValue === 'admin' || userRoleValue === 'author' || userRoleValue === 'publisher') &&
            <span className="user-action-btn" onClick={ () => onOpenModalPreview(row.templateContent, row.templateName, row._id) }>
              <FontAwesomeIcon
                icon={faEye}
                title="Preview"
              />
            </span>
          }
          { (userRoleValue === 'admin' || userRoleValue === 'author') &&
            <>
              <span className="user-action-btn" onClick={ () => onTemplateDownload(row.templateContent, row.templateName) }>
                <FontAwesomeIcon
                  icon={faDownload}
                  title="Download"
                />
              </span>
              { (userRoleValue === 'admin' || (userRoleValue === 'author' && currentUserEmail === row.email)) &&
                <span className="user-action-btn" onClick={ () => onOpenModalDelete(row.templateContent, row.templateName, row._id) }>
                  <FontAwesomeIcon
                    icon={faTrashAlt}
                    title="Delete"
                  />
                </span>
              }
            </>
          }
        </div>
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

  const onOpenModalPreview = (templateContent, templateName, id) => {
    setModalShowDelete(false);
    setModalPreview(true);
    setModalPreviewTemplateContent(templateContent);
    setModalTemplateName(templateName);
    setModalTemplateId(id);
  }
  const onTemplateDownload = (templateContent, templateName) => { 
    downloadHtml(templateName, templateContent);
  }
  const onOpenModalDelete = (templateContent, templateName, id) => {    
    setModalShowDelete(true);
    setModalPreview(false);
    setModalPreviewTemplateContent(templateContent);
    setModalTemplateName(templateName);
    setModalTemplateId(id);
  }  
  const onTemplateDelete = async () => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': sessionStorage.getItem('UserToken'),
        }
      }
      const res = await axios.delete(`/gateway/api/emailer/${modalTemplateId}`, config);      
      if(res.status === 200){
        showMessageManger("success", iconSuccess, TEMPLATE_DELETE_SUCCESS);
        setModalShowDelete(false);
        getAllEmailers(); // To update all emailer data
      }      

    } catch (err) {
      if (err.response && err.response.data) {       
        showMessageManger("danger", iconError, SERVER_ERROR);
      }
    } 
  }


  useEffect(() => {
    getAllEmailers();
  },[]);


  return (
    <>
      <EmailersSummary
        emailerTotal = {emailersData.emailerTotal}
        emailerNykaa = {emailersData.emailerNykaa}
        emailerNykaaman = {emailersData.emailerNykaaman}
        emailerNykaafashion = {emailersData.emailerNykaafashion}
      />
      <div className="inner">
        <div className="inner-box">
        <h2 className="sub-title d-flex">
          Emailers Listing
          { (userRoleValue === 'admin' || userRoleValue === 'author') &&
            <Button href="/emailer-add" className="ms-auto">Add Emailer</Button>
          }
        </h2>
        <div className="tabular-data-wrap">
          <ToolkitProvider
            bootstrap4
            keyField='id'
            data={allTemplateData}
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
        ID = "modalPreview"
        size = "lg"
        centered = {false}
        title={`Template Name: ${modalTemplateName}`}
        body = {
          <>
            <iframe id="htmlPreview" title="html Preview" className="html-preview" srcdoc={modalPreviewTemplateContent} width="100%" height="500"></iframe>
          </>
        }
        footer = {
          <>
          <Button variant="secondary" onClick={() => setModalPreview(false)}>Close</Button>
          { (userRoleValue === 'admin' || userRoleValue === 'author') &&
            <Button variant="primary" onClick={ () => downloadHtml(modalTemplateName, modalPreviewTemplateContent) }>
              {`Download `}
              <FontAwesomeIcon icon={faDownload} title="Download" className="inline-block mr-2" />
            </Button>
          }
          </>
        }
        show={modalPreview}
        onHide={() => setModalPreview(false)}
      />

      <ModalBox 
        ID = "modalshowdelete"
        size = "lg"
        centered = {false}
        title={`Template Name: ${modalTemplateName}`}
        body = {
          <>
          <iframe id="htmlPreview" title="html Preview" className="html-preview" srcdoc={modalPreviewTemplateContent} width="100%" height="500"></iframe>
          <div className="mt-2">Are you sure want to delete this template?</div>
          </>
        }
        footer = {
          <>
          <Button variant="secondary" onClick={() => setModalShowDelete(false)}>Cancel</Button>
          <Button variant="primary" onClick={onTemplateDelete}>Delete</Button>
          </>
        }        
        show={modalShowDelete}
        onHide={() => setModalShowDelete(false)}
      />
    </>
  )
};

export default EmailersCmp;
