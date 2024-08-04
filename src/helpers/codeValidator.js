import {
  remove_gt_lt,
  checkClassId,
  serchAplusChar,
  checkHtmlElms,
  remove_lineBreak_multipleSpace
} from '../helpers';

export const getStyleList = (textBoxValue) => {
  let cssSelectors = [];
  let textValue, styleText;
  textValue = textBoxValue.replace('type="text/css">', '');
  const styleTagOpen = textValue.indexOf('<style');      
  const styleTagClose = textValue.lastIndexOf('</style>');  
  styleText = textValue.substring(styleTagOpen+7, styleTagClose);            
  styleText = styleText.split("}");
  styleText.forEach(function(item){
    cssSelectors.push(item.substring(0, item.lastIndexOf('{')));
  }); 
  cssSelectors = cssSelectors.filter(Boolean);       
  return cssSelectors;
}

export const getClassIDList = (elmArray) => {
  let joinClassIds, splitClassIds, uniqueClassIds;
  joinClassIds = elmArray.join();
  joinClassIds = joinClassIds.replace(/[.]/g, " .");
  joinClassIds = joinClassIds.replace(/[#]/g, " #");
  joinClassIds = joinClassIds.replace(/[,]/g, "");
  splitClassIds = joinClassIds.split(" ");
  splitClassIds = splitClassIds.filter(checkClassId);
  uniqueClassIds = [...new Set(splitClassIds)];
  return uniqueClassIds.filter(serchAplusChar);
}

export const getHtmlElementsList = (elmArray) => {
  let htmlElms = [];

  elmArray.forEach((item)=> {
    let htmlElmList  = [];
    if(item.indexOf(',') > -1) {
      htmlElmList = item.split(',');
      htmlElmList.forEach((i)=> htmlElms.push(i.trim()));
    }else{
      htmlElms.push(item.trim());
    }
  }); 
 
  htmlElms = htmlElms.filter(checkHtmlElms);    
  return htmlElms;
}

export const checkHtmlFile = (codeStr, fileName, list) => {
  const tagList = ['doctype', '<html', '<head', '<link', '<meta', '<body', '@font-face', '<script'];
  codeStr = remove_lineBreak_multipleSpace(codeStr); 
  codeStr = codeStr.toLowerCase();  
  const styleListArray = getStyleList(codeStr);
  const classIdsList   = getClassIDList(styleListArray);
  let htmlElmsList   = getHtmlElementsList(styleListArray); 

  //check mentioned html tags are exist
  tagList.forEach(item => {
    let searchItem = codeStr.search(item);
    if(searchItem >= 0){
      item = remove_gt_lt(item);
      list.push(
        `<li class="ui-alert ui-alert-danger"><strong>Error:</strong><span class="error-small"> ${fileName}</span> You should remove the <code>${item}</code> tag</li>`
      );
    }
  });

  //check class and id exist without aplus-
  if(classIdsList.length > 0){
    classIdsList.forEach(function(item, index){
      list.push (
        `<li class="ui-alert ui-alert-danger"><strong>Error:</strong><span class="error-small"> ${fileName}</span> You should assign "aplus-" prefix before the class/ID name <code>${item}</code> eg: .aplus-abc or #aplus-abc`
      );
    });        
  }

  //check html element without parent class/id
  if(htmlElmsList.length > 0){    
    htmlElmsList.forEach(function(item, index){      
      if(item === 'html' || item === 'body' || item === '*') {
        list.push (
          `<li class="ui-alert ui-alert-danger"><strong>Error:</strong><span class="error-small"> ${fileName}</span> You should remove the <code>${item}</code> selector from the css`
        );
      } else {
        list.push (
          `<li class="ui-alert ui-alert-danger"><strong>Error:</strong><span class="error-small"> ${fileName}</span> You should assign a class or ID name before the <code>${item}</code> tag eg: .aplus-abc ${item} or #aplus-abc ${item}`
        );
      }
      
    });        
  }
}

