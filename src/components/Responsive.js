import React, { useState, useRef } from 'react';
import { FileDrop } from 'react-file-drop';
import Device from './Device';
import {FILE_HTML_TITLE, FILE_HTML_NOTE, FILE_IMG_TITLE, FILE_IMG_NOTE, DROP_FILE_TEXT} from './../constants/messageList';


function Responsive() {
  const ref1 = useRef();
  const ref2 = useRef();  
  const [htmlText, setHtmlText] = useState("");
  const [htmlFileCounts, setHtmlFileCounts] = useState("");
  const [imgFileCounts, setImgFileCounts] = useState("");
  const [iSrcDoc, setISrcDoc] = useState("");  
  const [btnResValidateClass, setBtnResValidateClass] = useState("disabled");
  const [btnResResetClass, setBtnResResetClass] = useState("disabled");
  const [htmlBlockClass, setHtmlBlockClass] = useState("");
  const [imgBlockClass, setImgBlockClass] = useState("elm-disable");
  const [isInputhtmlDisable, setIsInputhtmlDisable] = useState(false);
  const [isInputImgDisable, setIsInputImgDisable] = useState(true);
  const [isResultBoxHide, setIsResultBoxHide] = useState("hide");
  const [iName, setiName] = useState([]);
  const [iPath, setiPath] = useState([]);
 
  const getAllImagesPath = (string) => {
    const imgRex = /<img.*?src="(.*?)"[^>]+>/g;
    const images = [];
    let img;
    while ((img = imgRex.exec(string))) {
        images.push(img[1]);
    }
    return images;
  }

  const getImageFolderName = (str) => {
    const iFolderName = str.split("/")[0];
    return iFolderName;
  }

  const onHtmlFileRead = (file) => {
    let reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function() {
      setBtnResValidateClass("");
      let uploadHTMLtext = reader.result;
      uploadHTMLtext = uploadHTMLtext.replaceAll(/^[\s\t]*(\r\n|\n|\r)/gm, "");
      const allImagesPath = getAllImagesPath(uploadHTMLtext);
      const oldFolderName = `<img src="${getImageFolderName(allImagesPath[0])}/`;
      const newFolderName = `<img src="`;
      setISrcDoc(uploadHTMLtext.replaceAll(oldFolderName, newFolderName));                        
    };
    setHtmlFileCounts("1 html file has selected.");
    setImgBlockClass(""); 
    setIsInputImgDisable(false);  
  }

  const onHtmlUpload = (event) => { 
    const htmlFile = event.target.files[0];
    onHtmlFileRead(htmlFile);
  }; 
  
  const onHtmlDargUpload = (files, event) => { 
    const htmlFile = files[0];   
    onHtmlFileRead(htmlFile);
  };

  const onImageFileRead = (files) => {
    const imgFilesCount = files.length;    
    for (let i = 0; i < imgFilesCount; i++) {
      let reader = new FileReader();    
      reader.readAsDataURL(files[i]);
      reader.onload = function() {
        setiName( arr => [...arr, `${files[i].name}`]);
        setiPath( arr => [...arr, `${reader.result}`]); 
      };      
    }
    setImgFileCounts(`${imgFilesCount} image file has selected.`);
  }

  const onImgUpload = (event) => { 
    const imgFiles = event.target.files; 
    onImageFileRead(imgFiles);
  }; 
  
  const onImgDargUpload = (files, event) => {  
    onImageFileRead(files);
  };
    
  const previewHandler = () => {
    let uploadedHtmlText = iSrcDoc;
    if(iName.length > 0) {
      iName.forEach((item, index) => {
        uploadedHtmlText = uploadedHtmlText.replace(item, iPath[index]);
      })      
      setHtmlText(uploadedHtmlText);

    } else {
      setHtmlText(uploadedHtmlText);
    }

    setBtnResValidateClass("disabled");
    setBtnResResetClass("");
    setIsResultBoxHide("");
    setHtmlBlockClass("elm-disable");
    setImgBlockClass("elm-disable");     
    setIsInputhtmlDisable(true);
    setIsInputImgDisable(true);    
  };

  const previewResetHandler = () => {
    setBtnResValidateClass("");
    setBtnResResetClass("disabled");
    setHtmlText("");
    setIsResultBoxHide("hide");    
    setHtmlBlockClass("");
    setHtmlFileCounts("");
    setImgFileCounts("");
    setIsInputhtmlDisable(false);
    ref1.current.value = "";
    ref2.current.value = "";
  };

  return (
    <>
      <div className="inner-white"> 
        <div className="inner-flex">            
          <div className="inner-box-small">
            <p className="text-pera">Step 1: {FILE_HTML_TITLE}</p>
            <p className="text-note">Note: {FILE_HTML_NOTE}</p>
            <div id="dropZoneResHtml" className={`drop-zone bck-blue ${htmlBlockClass}`}>
              <div className="drop-zone-inner">               
                <FileDrop onDrop={(files, event) => onHtmlDargUpload(files, event)} >
                  <input
                    type="file" 
                    id="rHtml" 
                    name="rHtml" 
                    className="input-file"
                    ref={ref1} 
                    accept=".html"
                    disabled= {isInputhtmlDisable} 
                    onChange={event => onHtmlUpload(event)}
                  />                  
                    <p>{DROP_FILE_TEXT}</p>
                  </FileDrop>              
                </div>                
              </div>
              {htmlFileCounts && <p className="ui-text-info">{htmlFileCounts}</p>}
          </div>
          <div className="inner-box-small"> 
            <p className="text-pera">Step 2: {FILE_IMG_TITLE}</p>
            <p className="text-note">Note: {FILE_IMG_NOTE}</p> 
            <div id="dropZoneResImg" className={`drop-zone bck-green ${imgBlockClass}`}>         
              <div className="drop-zone-inner">                 
                <FileDrop onDrop={(files, event) => onImgDargUpload(files, event)} >
                  <input 
                    type="file" 
                    id="rImg" 
                    name="rImg"
                    className="input-file" 
                    accept="image/*" 
                    ref={ref2}
                    multiple= {true}
                    disabled= {isInputImgDisable}
                    onChange={e => onImgUpload(e)}
                  />
                  <p>{DROP_FILE_TEXT}</p>
                </FileDrop>                                
              </div>        
            </div>
            {imgFileCounts && <p className="ui-text-info">{imgFileCounts}</p> }   
          </div>
        </div>
        <div className="inner-box-small">
          <button id="btnResValidate" type="button" className={`form-btn fill ${btnResValidateClass}`} onClick={previewHandler}>Validate</button>
          <button id="btnResReset" type="button" className={`form-btn fill ${btnResResetClass}`} onClick={previewResetHandler}>Reset</button>
        </div>       
      </div>
      
     
      <div className={`inner-white device-wrapper ${isResultBoxHide}`}>
      <h2 className="sub-title">Result</h2>
        <div className="device-preview">
          <Device class="d-240" title="240" srcDoc={htmlText}/>
          <Device class="d-320" title="320" srcDoc={htmlText}/>
          <Device class="d-480" title="480" srcDoc={htmlText}/>
          <Device class="d-768" title="768" srcDoc={htmlText}/>                                       
        </div>
      </div>
    </>
  )
}

export default Responsive;
