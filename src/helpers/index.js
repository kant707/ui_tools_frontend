import Clipboard from 'clipboard';

export const downloadFile = (filename, text)=> {
  let element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};

export const downloadHtml = (filename, content) => {
  const element = document.createElement('a');
  element.setAttribute('href', 'data:text/html;charset=utf-8,' + encodeURIComponent(content));
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};

export const checkFileExtension = (fileName) => {
  const extension = fileName.split('.').pop();
  return extension;
};

export const indianDateTimeFormat = (isoDateValue) => {
  const epoch = new Date(isoDateValue).valueOf();
  const indianDateTime = new Date(epoch).toLocaleString();
  return indianDateTime;
};

export const getCurrentTime = () => {
  const today = new Date();
  let hhmmss = today.toTimeString();
  hhmmss = hhmmss.split(' ')[0];
  return hhmmss;
};

export const getCurrentDate = () => {
  const today = new Date();
  let dd, mm, yyyy, ddmmyyyy;
  dd = today.getDate();
  mm = today.getMonth() + 1;  
  yyyy = today.getFullYear();		
  if (dd < 10) {dd = '0' + dd}
  if (mm < 10) {mm = '0' + mm}
  ddmmyyyy = dd + '/' + mm + '/' + yyyy;
  return ddmmyyyy;
};

export const getCurrentDateTime = () => {
  let cTime, cDate;
  cTime = getCurrentTime();
  cTime = cTime.split(':').join('');
  cDate = getCurrentDate();
  cDate = cDate.split('/').join('');
  return `${cDate}_${cTime}`;
};

export const textCopyAndDownlaod = (btncopy, btnreport) => {
  new Clipboard(btncopy);
  const clipboradReport = new Clipboard(btnreport);
  const fileName = `Report_Aplus_${getCurrentDateTime()}.txt`;
  clipboradReport.on('success', function (e) {
    const copyText = e.text;
    downloadFile(fileName, copyText);          
  }); 
};

export const convertSizeInKB = (sizeInBytes) => {
  let sizeInKB = (sizeInBytes / 1024).toFixed(3);
  return sizeInKB;
};

export const removeAllChildNodes = (parent) => {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
};

export const remove_gt_lt = (str)=> {
  return str.replace('<','').replace('>','');
};

export const remove_linebreaks = (str)=> {
  return str.replace( /[\r\n]+/gm, "");
};

export const remove_multiple_space = (str)=>{
  return str.replace(/\s{2,}/g, " ");
};

export const remove_lineBreak_multipleSpace = (str)=> {
  let text = str;  
  text = remove_linebreaks(text);
  text = remove_multiple_space(text);
  text = text.trim();
  return text;
};

export const checkClassId = (str) => {
  return /[.#]/g.test(str);
};

export const serchAplusChar = (str)=> {
  return str.search(".aplus-") && str.search("#aplus-");
};

export const checkHtmlElms = (str)=> {
  const pattern = /[.#@]/g;
  return !pattern.test(str);
};

export const validateEmail = (email)=> {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}