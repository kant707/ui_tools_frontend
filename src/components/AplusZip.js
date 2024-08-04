import React, { useEffect } from 'react';
import ReactGA from 'react-ga';
import JSZip from 'jszip';
import { VALID_ZIP_FILE_MSG, VALID_ZIP_FORMAT_MSG, APLUS_VALID_HTML, FILE_ZIP_TITLE, FILE_ZIP_NOTE, DROP_FILE_TEXT } from '../constants/messageList'
import { checkFileExtension, textCopyAndDownlaod } from '../helpers/index';
import { checkHtmlFile } from '../helpers/codeValidator';
import { checkImageFile } from '../helpers/imgValidator';

function AplusZip() {

  useEffect(() => {
    const fileBox = document.querySelector("#file");
    const previewBox = document.querySelector("#previewBox");
    const resultBox = document.querySelector("#resultBox");
    const resultList = document.querySelector("#resultList");
    const btnZipValidate = document.querySelector("#btnZipValidate");
    const btnZipReset = document.querySelector("#btnZipReset");
    const errorCount = document.querySelector("#errorCount");
    const buttonCopy = document.querySelector("#buttonCopy");
    const buttonReport = document.querySelector("#buttonReport");
    const zipDropZone = document.querySelector('#zipDropZone');
    const allowedImageExtensions = /(jpg|jpeg|png|gif)$/i; 
    const allowedZipExtensions = /(zip)$/i;
    const allowedhtmlExtensions = /(html|htm)$/i;   
    let aplusErrorsCount = 0;
    let imageErrorList = [];
    let codeErrorList = [];

    function handleZipFile(f) {
      previewBox.innerHTML = "";
      const nodeH4 = document.createElement('h4');
      const nodeUl = document.createElement('ul');
      nodeH4.innerHTML = `Zip file: ${f.name}`;
      previewBox.appendChild(nodeH4);
      previewBox.appendChild(nodeUl);
      let filesCounter = 0;
      let flagCounter = 0;

      const dateBefore = new Date();
      JSZip.loadAsync(f)
        .then(function(zip) {
        const dateAfter = new Date();          
        const objCount = Object.keys(zip.files).length;        

        zip.forEach((relativePath, zipEntry, index) => {
          flagCounter++;   
          
          let extension = checkFileExtension(relativePath);

          if(extension.match(allowedhtmlExtensions)) {
            zipEntry.async("string")
            .then(function (content) { 
              filesCounter++;               
              checkHtmlFile(content, zipEntry.name, codeErrorList);
              let nodeLi = document.createElement('li');
              nodeLi.innerHTML = zipEntry.name;
              nodeUl.append(nodeLi);
            });
          }

          if(extension.match(allowedImageExtensions)) {
            filesCounter++;
            checkImageFile(zipEntry, zipEntry._data.uncompressedSize, imageErrorList);
            let nodeLi = document.createElement('li');
            nodeLi.innerHTML = zipEntry.name;
            nodeUl.append(nodeLi);                          
          } 

          // After loop end, below condition will trigger
          if(flagCounter === objCount){
            if(filesCounter === 0) {
              alert(VALID_ZIP_FILE_MSG);
              btnZipValidate.classList.add("disabled");
            }else{
              const nodeSpan = document.createElement('span');
              nodeSpan.innerHTML = `, loaded in: ${dateAfter - dateBefore} ms, files Count: ${filesCounter}`;
              nodeH4.append(nodeSpan);
              btnZipValidate.classList.remove("disabled");
            }
          }         
          

        });    


      }, function (e) {
        let nodeDiv = document.createElement('div');
        nodeDiv.innerHTML = `Error reading ${f.name} : ${e.message}`;
        previewBox.appendChild(nodeDiv);
      });
    }

    function handleFileSelect(files) {
      const file = files[0];
      if (file.length === 0) return;

      const fileExtension = checkFileExtension(file.name);
      const fileSize = Math.round((file.size) / (1024*1024));

      if(fileExtension.match(allowedZipExtensions) && fileSize <= 10){
        handleZipFile(file);
      }else{
        alert(VALID_ZIP_FORMAT_MSG); 
      } 
    }

    zipDropZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'copy';
    });
    
    zipDropZone.addEventListener('drop', (e) => {
      e.preventDefault();
      const files = e.dataTransfer.files;
      handleFileSelect(files);
    });

    fileBox.addEventListener('change', (e) => {
      const files = e.target.files;
      handleFileSelect(files);     
    });

    btnZipValidate.addEventListener('click', () => { 
      
      aplusErrorsCount = (codeErrorList.length) + (imageErrorList.length);

      if(aplusErrorsCount > 0) {
        codeErrorList.forEach(item => {
          resultList.innerHTML += item;
        });
  
        imageErrorList.forEach(item => {
          resultList.innerHTML += item;
        });
        const errorText = aplusErrorsCount > 1 ? 'errors' : 'error';
        errorCount.innerHTML = `The A+ Content has <span class="error-count">${aplusErrorsCount} ${errorText}</span> listed below`; 
      }
      

      if(aplusErrorsCount === 0) {
        resultList.innerHTML += `<p class="ui-alert ui-alert-success">${APLUS_VALID_HTML}</p>`;
        buttonCopy.classList.add('hide');
        buttonReport.classList.add('hide'); 
        errorCount.innerHTML = '';
      } 
      
      btnZipValidate.classList.add('disabled');
      btnZipReset.classList.remove('disabled');
      fileBox.setAttribute('readonly', 'true');
      fileBox.setAttribute('disabled', 'disabled');
      resultBox.classList.remove('hide');
      zipDropZone.classList.add('elm-disable');
      window.scroll({top: 400, left: 0, behavior: 'smooth'});

      // START google analytics event code start
      ReactGA.event({
        category: 'Content Validator',
        action: 'Button Click',
        label: 'Validate Zip File',
        value: 1,
        nonInteraction: false
      });
      // END google analytics event code end
      
    }); 
    
    btnZipReset.addEventListener('click', () => {
      imageErrorList = [];
      codeErrorList = [];
      btnZipValidate.classList.add('disabled');
      btnZipReset.classList.add('disabled');
      resultList.innerHTML = '';
      fileBox.value = '';
      fileBox.removeAttribute('readonly');
      fileBox.removeAttribute('disabled');
      previewBox.innerHTML = '';      
      resultBox.classList.add('hide');
      buttonCopy.classList.remove('hide');
      buttonReport.classList.remove('hide');
      zipDropZone.classList.remove('elm-disable');
      aplusErrorsCount = 0;
      window.scroll({top: 300,left: 0, behavior: 'smooth'});      
    });

    //copy clipboard and downlaod report
    textCopyAndDownlaod('#buttonCopy', '#buttonReport');
    

  });
  

  return (
    <div className="inner-box">
      <h2 className="sub-title">Zip Validator</h2>
      <p className="text-pera">{FILE_ZIP_TITLE}</p>
      <p className="text-note">Note: {FILE_ZIP_NOTE}</p>
      <div id="zipDropZone" className="drop-zone">
        <div className="drop-zone-inner">
          <input type="file" id="file" name="file" className="input-file" accept=".zip,.rar,.7zip"/>
          <p>{DROP_FILE_TEXT}</p> 
        </div>
      </div>
      
      <div id="previewBox" className="preview"></div>
      <input type="button" className="form-btn fill disabled mr10" id="btnZipValidate" value="Validate" />
      <input type="button" className="form-btn fill disabled" id="btnZipReset" value="Reset" /> 

      <div id="resultBox" className="result-box hide"> 
        <h2 className="sub-title">Result: <span className="error-count-wrap" id="errorCount"></span></h2>
        <ul id="resultList" className="result-text"></ul>
        <input type="button" className="form-btn fill btn-clipboard" id="buttonCopy" value="Copy Clipboard" data-clipboard-action="copy" data-clipboard-target="#resultList" />
        <input type="button" className="form-btn fill btn-clipboard" id="buttonReport" value="Download Report" data-clipboard-action="copy" data-clipboard-target="#resultList" />
      </div>    
    </div>
  )
};

export default AplusZip;
