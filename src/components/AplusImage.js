import React, { useEffect } from 'react';
import ReactGA from 'react-ga';
import { textCopyAndDownlaod, checkFileExtension } from '../helpers';
import { checkImageFile } from '../helpers/imgValidator';
import { SELECT_FILE_IMAGE } from '../constants/messageList';
import {FILE_IMG_TITLE, FILE_IMG_NOTE, APLUS_VALID_IMAGE, DROP_FILE_TEXT} from './../constants/messageList';

function AplusImage() {
  useEffect(() => {
    const imgButtonValidate = document.querySelector('#imgButtonValidate');
    const imgButtonReset = document.querySelector('#imgButtonReset');
    const imgResultBox = document.querySelector('#resultImageValidation');
    const imgResultText = document.querySelector('#imgResultText');
    const imgErrorCount = document.querySelector('#imageErrorCount');
    const imgTextBox = document.querySelector('#imgTextBox');
    const imgDropZone = document.querySelector('#imgDropZone');
    const imgPreview = document.querySelector('#imgPreview');
    const imgButtonCopy = document.querySelector('#imgButtonCopy');
    const imgButtonReport = document.querySelector('#imgButtonReport');
    const allowedImageExtensions = /(jpg|jpeg|png|gif)$/i;
    let aplusImageErrorCount = 0;
    let imageErrorList = [];
    

    function handleFileSelect(files) {           
      imgPreview.innerHTML = "";
      let fileCount = 0;      

      let nodeH4 = document.createElement('h4');
      let nodeUl = document.createElement('ul');

      for(var i = 0; i < files.length; i++) {
        let ext = checkFileExtension(files[i].name);
        if(ext.match(allowedImageExtensions)){
          let nodeLi = document.createElement('li');
          nodeLi.innerHTML = files[i].name;
          nodeUl.append(nodeLi);
          checkImageFile(files[i], files[i].size, imageErrorList);
          fileCount++;
          nodeH4.innerHTML = fileCount +' image file has selected';
          imgPreview.appendChild(nodeH4);
          imgPreview.appendChild(nodeUl);
        }        
      }

      if(fileCount === 0) {
        alert("Please select image file(.jpg, .png, .gif)");
      }else{
        imgButtonValidate.classList.remove("disabled");
      }

    }

    imgDropZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'copy';
    });

    imgDropZone.addEventListener('drop', (e) => {
      e.preventDefault();
      const files = e.dataTransfer.files;
      handleFileSelect(files)
    });

    imgTextBox.addEventListener('change', (e) => {
      const files = e.target.files;
      handleFileSelect(files);      
    });

    imgButtonValidate.addEventListener('click', () => { 
      
      if(imgPreview.textContent === "") {
        alert(SELECT_FILE_IMAGE);
        return false;
      }
      
      aplusImageErrorCount =  imageErrorList.length; 
      
      if(aplusImageErrorCount > 0) {        
        imageErrorList.forEach(item => {
          imgResultText.innerHTML += item;
        });
        const errorText = aplusImageErrorCount > 1 ? 'errors' : 'error';
        imgErrorCount.innerHTML = `The A+ Content has <span class="error-count">${aplusImageErrorCount} ${errorText}</span> listed below`;                
      }

      if(aplusImageErrorCount === 0) {
        imgResultText.innerHTML += `<p class="ui-alert ui-alert-success"><strong>Success:</strong> ${APLUS_VALID_IMAGE}</p>`;
        imgButtonCopy.classList.add('hide');
        imgButtonReport.classList.add('hide'); 
        imgErrorCount.innerHTML = '';
      }
      
      imgButtonReset.classList.remove('disabled');
      imgButtonValidate.classList.add('disabled');
      imgTextBox.setAttribute('disabled', 'disabled');
      imgDropZone.classList.add('elm-disable');
      imgResultBox.classList.remove('hide');
      window.scroll({top: 400, left: 0, behavior: 'smooth'});

      // START google analytics event code
      ReactGA.event({
        category: 'Content Validator',
        action: 'Button Click',
        label: 'Validate Image',
        value: 1,
        nonInteraction: false
      });
      // END google analytics event code

    });

    imgButtonReset.addEventListener('click', () => {
      imageErrorList = [];
      imgButtonValidate.classList.add('disabled');
      imgButtonReset.classList.add('disabled');
      imgResultText.innerHTML = '';
      imgTextBox.value = '';
      imgTextBox.removeAttribute('disabled');
      imgDropZone.classList.remove('elm-disable');
      imgPreview.innerHTML = '';
      imgResultBox.classList.add('hide');      
      aplusImageErrorCount = 0;
      imgButtonCopy.classList.remove('hide');
      imgButtonReport.classList.remove('hide'); 
      window.scroll({top: 300, left: 0, behavior: 'smooth'});
    });

    //copy clipboard and downlaod report
    textCopyAndDownlaod('#imgButtonCopy', '#imgButtonReport');

  });

  return (            
    <div className="inner-box">
      <h2 className="sub-title">Image Validator</h2>
      <p className="text-pera">{FILE_IMG_TITLE}</p>
      <p className="text-note">Note: {FILE_IMG_NOTE}</p>
      <div id="imgDropZone" className="drop-zone bck-orange">
        <div className="drop-zone-inner">                
          <input type="file" id="imgTextBox" className="input-file" accept="image/*" multiple />
          <p>{DROP_FILE_TEXT}</p>
        </div>         
      </div>
      <div id="imgPreview" className="preview"></div>
      <input type="button" className="form-btn fill disabled mr10" id="imgButtonValidate" value="Validate" />
      <input type="button" className="form-btn fill disabled" id="imgButtonReset" value="Reset" />

      <div id="resultImageValidation" className="result-box hide">        
      <h2 className="sub-title">Result: <span className="error-count-wrap" id="imageErrorCount"></span></h2>
      <ul id="imgResultText" className="result-text"></ul>
      <input type="button" className="form-btn fill btn-clipboard" id="imgButtonCopy" value="Copy Clipboard" data-clipboard-action="copy" data-clipboard-target="#imgResultText" />
      <input type="button" className="form-btn fill btn-clipboard" id="imgButtonReport" value="Download Report" data-clipboard-action="copy" data-clipboard-target="#imgResultText" />          
      </div>                             
    </div>     
  )
};

export default AplusImage;
