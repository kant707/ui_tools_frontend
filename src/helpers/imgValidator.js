export const checkImageFile = (file, sizeObj, list)=> {
  let fSize = Math.round(sizeObj / 1024);
  if(fSize > 300){
    list.push(
    `<p class="ui-alert ui-alert-danger">
      <strong>Error:</strong>
      <span class="error-small"> ${file.name}</span>
      You should make each image size less than 300KB
    </p>`
    )
  }  

  /*let reader = new FileReader();  
  reader.onload = function (e) {
    let img = new Image();    
    img.src = e.target.result;
    img.onload = function () {
      let w = this.width;
      let h = this.height;
      console.log("image width", w);
      console.log("image height", h);
      if(w > 400){
        list.push(
        `<p class="ui-alert ui-alert-danger">
          <strong>Error:</strong>
          <span class="error-small"> ${file.name}</span>
          image width is greater then 400 Pixel.
        </p>`
        )
      }      
    }
  };
  reader.readAsDataURL(file);*/
}