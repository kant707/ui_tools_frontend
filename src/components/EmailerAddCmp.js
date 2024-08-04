import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import MessageManager from './MessageManager';
import {
  TEMPLATE_ADDED_SUCCESS,
  TEMPLATE_NAME_EXIST,
  SERVER_ERROR,
  } from '../constants/messageList';

  // yup schema for input feild errors
  const schema = yup.object().shape({
    templateName: yup.string().required('Template name is required'),
    templateFile: yup.string().required('Template file is required'),
  });
  
function EmailerAddCmp(e) {
  const [formData, setFormData] = useState({
    domainType: 'Nykaa',
    templateType: 'Transactional',
    templateName: '',
    templateFile: '',
  });

  const [mmShow, setMmShow] = useState(false);
  const [mmVariant, setMmVariant] = useState([]); 
  const [mmIcon, setMmIcon] = useState([]); 
  const [mmText, setMmText] = useState([]);
  const iconSuccess  = <FontAwesomeIcon icon={faCheckCircle} />;
  const iconError  = <FontAwesomeIcon icon={faExclamationTriangle} />;

  const {
    domainType,
    templateType,
    templateName,
    templateExtension,
    templateContent,
  } = formData;
  
  // For form reset input field values
  const formResetValues = {
    templateType: 'Transactional',
    templateName: '',
    templateFile: '',
  }
  
  const onChange = e => setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });

  const onFileUpload = (e) => {
    let reader = new FileReader();
    reader.readAsText(e.target.files[0]);
    reader.onload = function() {
      const text = reader.result;
      const cleanText = text.replaceAll(/^[\s\t]*(\r\n|\n|\r)/gm, "");
      setFormData({
        ...formData,
        templateExtension: e.target.files[0].type,
        templateContent: cleanText
      });
      const htmlPreview = document.getElementById('htmlPreview');
      htmlPreview.style.removeProperty('display');
      htmlPreview.setAttribute('srcdoc', cleanText);
    };
    
  };
  const clearPreviewPane = () => {
    const htmlPreview = document.getElementById('htmlPreview');
    htmlPreview.style.display = 'none';
  }
  
  const onSubmit = async (data, e) => {
    e.preventDefault();
    const userData = sessionStorage.getItem("userData");
    const { Name, email } = JSON.parse(userData);

    const {domainType, templateType, templateName } = data;
    const newTemplate = {
      domain: domainType,
      templateType,
      templateName,
      templateExtension: templateExtension,
      templateContent: templateContent,
      user: Name,
      email,
      role: "Developer",
    }

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': sessionStorage.getItem('UserToken'),
        }
      }

      const body = JSON.stringify(newTemplate);
      const res = await axios.post(`/gateway/api/emailer`, body, config);
      if(res.status === 200) {
        showMessageManger("success", iconSuccess, TEMPLATE_ADDED_SUCCESS);
        reset(formResetValues); // reset form feilds
        clearPreviewPane();
      }
      // console.log(res.body);
    } catch (err) {
      if (err.response && err.response.data) {       
        if(err.response.status === 500){
          showMessageManger("danger", iconError, TEMPLATE_NAME_EXIST);
        } else {
          showMessageManger("danger", iconError, SERVER_ERROR);
        }
      }
    }
  }

  const onReset = () => {
    reset(formResetValues); // reset form feilds
    clearPreviewPane();
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      // domainType: 'Nykaa',
      templateType: 'Transactional',
      templateName: '',
      templateFile: '',
    }
  });

  const showMessageManger = (variant, icon, text) => {
    setMmShow(true);    
    setMmVariant(variant);
    setMmIcon(icon);
    setMmText(text);
    setTimeout(()=> setMmShow(false), 3000);
  }

  return (         
    <div className="inner-box">
      <h2 className="sub-title">Template Details</h2>
      <Container>
        <Row>
          <Col md={3}>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group className="mb-3">                
                <Form.Label htmlFor="domainType" className="x">Domain: </Form.Label>
                <Form.Select            
                  id="domainType"
                  className="x"
                  name="domainType"
                  defaultValue={'Nykaa'}
                  onChange={e => onChange(e)}
                  {...register('domainType')}
                >
                  <option value="Nykaa">Nykaa</option>
                  <option value="Nykaaman">Nykaaman</option>
                  <option value="Nykaafashion">Nykaafashion</option>
                </Form.Select>
                {errors?.domainType && <div className="feild-error text-danger" role="alert">{errors.domainType?.message}</div>}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label htmlFor="templateType" className="x">Template type: </Form.Label>
                <Form.Select            
                  name="templateType"
                  id="templateType"
                  className="x"
                  defaultValue={'Transactional'}
                  onChange={e => onChange(e)}
                  {...register('Transactional')}
                >
                  <option value="Transactional">Transactional</option>
                  <option value="Triggered Mail Campaigns">Triggered Mail Campaigns</option>
                  <option value="Gamezone Mailer">Gamezone Mailer</option>
                  <option value="Account Mailer">Account Mailer</option>
                  <option value="Birthday Mailer">Birthday Mailer</option>
                  <option value="Giftcard Mailer">Giftcard Mailer</option>
                  <option value="Refund Mailer">Refund Mailer</option>
                  <option value="Review Mailer">Review Mailer</option>
                  <option value="NYKD Mailer">NYKD Mailer</option>
                </Form.Select>
                {/* <small>{errors.templateType?.message}</small> */}
                {errors?.templateType && <div className="feild-error text-danger" role="alert">{errors.templateType?.message}</div>}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="templateName" className="x">Template name: </Form.Label>
                <Form.Control
                  type="text"
                  id="templateName"
                  name="templateName"
                  className="y"
                  onChange={e => onChange(e)}
                  {...register('templateName')}
                />
                {errors?.templateName && <div className="feild-error text-danger" role="alert">{errors.templateName?.message}</div>}
                {/* <small>{errors.templateName?.message}</small> */}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="inputFileUpload" className="x">Template Upload:</Form.Label>
                <Form.Control
                  type="file"
                  id="inputFileUpload"
                  className="input-file"
                  name="templateFile"
                  accept=".html"                  
                  {...register('templateFile')}
                  onChange={e => onFileUpload(e)}
                />
                {errors?.templateFile && <div className="feild-error text-danger" role="alert">{errors.templateFile?.message}</div>}
              </Form.Group>              
              <Button
                variant="primary"
                type="submit"
                className="btn fill mr10"
                id="buttonSubmit"
              >
                Submit
              </Button>
              <Button
                variant="primary"
                type="button"
                className="mx-3"
                id="buttonReset"
                onClick={e => onReset()}
              >
                Reset
              </Button>
            </Form>
          </Col>
          <Col md={9}>
            <div className="preview-wrap">
              <iframe id="htmlPreview" title="html Preview" className="html-preview" style={{display: 'none'}} src="" width="100%" height="600"></iframe>
            </div>
          </Col>
        </Row>
      </Container>

      <MessageManager 
        show = {mmShow}
        variant={mmVariant}
        icon={mmIcon} 
        text={mmText} 
        closeFuction={()=>setMmShow(false)}
      />
    </div>
  )
};

export default EmailerAddCmp;
