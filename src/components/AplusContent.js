import React, { useEffect } from 'react';
import ReactGA from 'react-ga';
import { SELECT_FILE_HTML, FILE_COMMENT_TEXT, DROP_FILE_TEXT, FILE_HTML_TITLE, FILE_HTML_NOTE, APLUS_VALID_HTML } from '../constants/messageList';
import { downloadFile, textCopyAndDownlaod, remove_lineBreak_multipleSpace, getCurrentDateTime } from '../helpers';
import { checkHtmlFile } from '../helpers/codeValidator';


function AplusContent() {
  useEffect(() => {
    const buttonReset = document.querySelector('#buttonReset');
    const buttonValidate = document.querySelector('#buttonValidate');
    const resultBox = document.querySelector('#resultCodeValidation');
    const resultText = document.querySelector('#resultText');
    const errorCount = document.querySelector('#errorCount');
    const textBox = document.querySelector('#textBox');
    const textBoxArea = document.querySelector('#textBoxArea');
    const dropZone = document.querySelector('#dropZone');
    const buttDownload = document.querySelector('#buttonDownload');
    const buttonCopy = document.querySelector('#buttonCopy');
    const buttonReport = document.querySelector('#buttonReport');
    let aplusErrorCount = 0;
    let textBoxValue = "";
    let htmlFileName = "";
    let codeErrorList = [];

    function handleFileRead(file) {
      let reader = new FileReader();
      reader.onload = (e) => {
        let fileResult = e.target.result;
        textBoxArea.value = fileResult;
        htmlFileName = file.name;
      };
      reader.onerror = (e) => alert(e.target.error.name);
      reader.readAsText(file);
    }

    function handleFileSelect(files) {      
      let file = files[0];      
      if(file.type === "text/html") {
        handleFileRead(file);
        buttonValidate.classList.remove("disabled");
      } else {
        alert(SELECT_FILE_HTML); 
      }     
    } 

    dropZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'copy';
    });

    dropZone.addEventListener('drop', (e) => {
      e.stopPropagation();
      e.preventDefault();
      const files = e.dataTransfer.files;
      handleFileSelect(files);
    });

    textBox.addEventListener('change', (e) => {
      const files = e.target.files;
      handleFileSelect(files);              
    });

    buttonValidate.addEventListener('click', () => {     

      textBoxValue = textBoxArea.value;

      if(textBoxValue.length === 0) {
        alert(SELECT_FILE_HTML);
        return false;
      } 

      //check html file and push all error in an array list
      checkHtmlFile(textBoxValue, htmlFileName, codeErrorList);
      
      aplusErrorCount = codeErrorList.length;     

      if(aplusErrorCount > 0) {        
        codeErrorList.forEach(item => {
          resultText.innerHTML += item;
        }); 
        const errorText = aplusErrorCount > 1 ? 'errors' : 'error';
        errorCount.innerHTML = `The A+ Content has <span class="error-count">${aplusErrorCount} ${errorText}</span> listed below`;       
      }

      if(aplusErrorCount === 0) {
        resultText.innerHTML += `<li class="ui-alert ui-alert-success"><strong>Success:</strong> ${APLUS_VALID_HTML}</li>`;
        buttDownload.classList.remove('hide');
        buttonCopy.classList.add('hide');
        buttonReport.classList.add('hide');
        errorCount.innerHTML = '';      
      }
      
      buttonReset.classList.remove('disabled');
      buttonValidate.classList.add('disabled');
      textBox.setAttribute('disabled', 'disabled');
      dropZone.classList.add('elm-disable');
      resultBox.classList.remove('hide');
      window.scroll({top: 400,left: 0, behavior: 'smooth'});

      // START google analytics event code
      ReactGA.event({
        category: 'Content Validator',
        action: 'Button Click',
        label: 'Validate html',
        value: 1,
        nonInteraction: false
      });
      // END google analytics event code

    });

    buttonReset.addEventListener('click', () => {
      codeErrorList = [];
      buttonValidate.classList.add('disabled');
      buttonReset.classList.add('disabled');
      resultText.innerHTML = '';
      textBox.value = '';
      textBoxArea.value = '';
      textBox.removeAttribute('disabled');
      dropZone.classList.remove('elm-disable');
      resultBox.classList.add('hide');
      textBoxValue = '';
      buttDownload.classList.add('hide');
      buttonCopy.classList.remove('hide');
      buttonReport.classList.remove('hide');
      aplusErrorCount = 0;
      window.scroll({top: 300, left: 0, behavior: 'smooth'});
    });

    buttDownload.addEventListener('click', () => {
      textBoxValue = remove_lineBreak_multipleSpace(textBoxValue);
      textBoxValue = `${FILE_COMMENT_TEXT}\n${textBoxValue}`;
      let filename = `index_${getCurrentDateTime()}.html`;
      downloadFile(filename, textBoxValue);
    });

    //copy clipboard and downlaod report
    textCopyAndDownlaod('#buttonCopy', '#buttonReport');
    
  });

  return (         
      <div className="inner-box">
        <h2 className="sub-title">Code Validator</h2>
        <p className="text-pera">{FILE_HTML_TITLE}</p>
        <p className="text-note">Note: {FILE_HTML_NOTE}</p>
        <div id="dropZone" className="drop-zone bck-purple">
          <div className="drop-zone-inner">                
            <input type="file" id="textBox" className="input-file" accept=".html" />
            <p>{DROP_FILE_TEXT}</p>
          </div>         
        </div>
        <textarea className="preview" id="textBoxArea" rows="10" cols="50" readOnly></textarea>
        <input type="button" className="form-btn fill disabled mr10" id="buttonValidate" value="Validate" />
        <input type="button" className="form-btn fill disabled" id="buttonReset" value="Reset" />

        <div id="resultCodeValidation" className="result-box hide">        
          <h2 className="sub-title">Result: <span className="error-count-wrap" id="errorCount"></span></h2>        
          <ul id="resultText" className="result-text"></ul>
          <input type="button" className="form-btn fill btn-clipboard" id="buttonCopy" value="Copy Clipboard" data-clipboard-action="copy" data-clipboard-target="#resultText" />
          <input type="button" className="form-btn fill btn-clipboard" id="buttonReport" value="Download Report" data-clipboard-action="copy" data-clipboard-target="#resultText" />
          <input type="button" className="form-btn fill btn-download hide" id="buttonDownload" value="Minify &amp; Download" />
        </div>                             
      </div>
  )
};

export default AplusContent;
