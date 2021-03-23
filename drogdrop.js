const dropSpace = document.querySelector('.drog-space');
const div = document.querySelector('.info-title');
const imgNAme = div.querySelector('p');
const formUpload = document.querySelector('.progress__inner__btn-form');
const divInfoAboutSize = document.querySelector('.info-text');
const imgSize = divInfoAboutSize.querySelector('p');
// const btnSendToServer = formUpload.querySelector('.progress__inner__btn');
const btnSave = document.querySelector('.drog-space-save');
const btnBrowse =  document.querySelector('.drog-space-download');
console.log(btnBrowse);
const input = document.querySelector('#fileElem');
let progress = document.querySelector('.progress__inner-loaded');
const progressBar = progress.querySelector('progress');
console.log(progressBar);
// const MyForm = document.que
console.log(input);
let file;

const availableFileTypes = {
  'image/png': true,
  'image/jpg': true,
  'image/jpeg': true,
}

// btnBrowse.onclick = ()=>{
//   input.click() ;
// }

input.addEventListener('change', function() {

  file = this.files[0];
  toggleDropSpaceClass();
  showFile();
  progress.classList.add('active');
  // if(  progressBar.value = 100){
  //   progressBar.innerHTML = '';
  //  }
  console.log(file.name);
});
input.addEventListener('click', e => {
    progressBar.innerHTML = " ";
})
function toggleDropSpaceClass(){
  dropSpace.classList.toggle('active');
}

dropSpace.addEventListener('dragover' ,(e) => {
  e.preventDefault();
});
dropSpace.addEventListener('dragenter' ,(e) => {
  toggleDropSpaceClass();
});
dropSpace.addEventListener('dragleave', (e) => {
  toggleDropSpaceClass();
})

dropSpace.addEventListener('drop', (e) => {
  e.preventDefault();
  if( e.dataTransfer.files.length > 1){
    alert(' You can drop only one file');
    toggleDropSpaceClass();
    return;
  }
  [file] = e.dataTransfer.files;
  showFile();
  progress.classList.add('active');


});

// btnSave.addEventListener('click', e => {
//   progress.classList.remove('active');
// })
// TODO showFile rename to showFileInfo
function showFile(){
  // TODO use const instead of let
  let fileType = file.type;
  let fileName = file.name;
  let fileSize = file.size;

  toggleDropSpaceClass();

  if (availableFileTypes[fileType] === undefined) {
    alert(' You can drop only file with type: png,jpg,jpeg!');
    return
  }

  imgNAme.classList.add('info-title');
  imgNAme.textContent = fileName;
  imgSize.classList.add('info-text');
  imgSize.textContent = `${Math.floor(fileSize / 1000)}kb`;

 
}



formUpload.addEventListener('submit', uploadFile);

function uploadFile(e){
  e.preventDefault();

  // let file = this.files;
  sendImg();
  // storage.removeItem();

  // progressBar.value = 0;



};
 const btnShowFile = document.querySelector('.drog-space-show');
console.log(btnShowFile);
btnShowFile.addEventListener('click', e => {
  serverResponse(renderFile);
 
})


function sendImg(){
  let url = 'http://localhost:2121/upload';
  let  xhr = new XMLHttpRequest();
  let formData = new FormData();
  xhr.open('POST', url, true)
  xhr.addEventListener('load', () => {
    // const response = JSON.parse(xhr.responseText);
    // cb(response);
  });
  xhr.upload.addEventListener("progress", function(e) {
    let loaded = e.loaded;
    let total = e.total;
    let percent = (loaded / total) * 100;
    progressBar.setAttribute('style', `width: ${percent.toFixed(2)}%` );
    progressBar.value = Math.floor(percent);
    
  
    // console.log(progressBar);
    // updateProgress((e.loaded * 100.0 / e.total) || 100);
 });
  xhr.addEventListener('error', () => {
    console.log('error');
  });
  formData.append('files', file);
   xhr.send(formData);
}
  // let file = this.files;
  // TODO move to separate function uploadFileToServer use Promise
  /**
   * await uploadFileToServer()
   * const urlList = await getAllFilesURLs()
   * renderImages(urlList)
   * */
   




function serverResponse(cb){
  const xhr =  new XMLHttpRequest();
  xhr.open('GET','http://localhost:2121/files');
  xhr.addEventListener('load', () =>{
    // localStorage.clear()
    const response = JSON.parse(xhr.responseText);
      cb(response);
  });
  xhr.addEventListener('error', ()=>{
      console.log('error');
  });
  xhr.send();

};
const container = document.querySelector('.container__img');
const section = document.querySelector('.server__response__img');
function renderFile(response) {

  const fragment = document.createDocumentFragment();
        response.forEach(file => { 
        let img = document.createElement('img');
        img.src = `${file}`;
        img.style.width = '27%';
        const div = document.createElement('div');
        div.classList.add('inner__server__response__img');
        div.classList.add('active');
        div.appendChild(img);
        fragment.appendChild(div);
        container.appendChild(fragment);
       });
      
      section.appendChild(container);
}
// btnSave.addEventListener('change',  e => {

// })

// function renderImg(response){
//   const fragment = document.createDocumentFragment();
//      response.forEach( img =>{
//          const card = document.createElement('div');
//          card.classList.add('inner__server__response__img');
//          const renderImg = document.createElement(`img src = '${links}`);
//          card.appendChild(renderImg);
//          fragment.appendChild(card);
//      });
//      container.appendChild(fragment);
  
// };
// width: 27%; /* Ширина */
// float: left; /* Выстраиваем элементы по горизонтали */
// margin: 0 0 0 3.5%; /* Отступ слева */
// background: #f0f0f0; /* Цвет фона */
// border-radius: 5px; /* Радиус скругления */
// padding: 2%; 



// response.forEach(file => {
//   let img = document.createElement('img');
//   img.src = `${file}`;
//   img.style.width = '27%';
//   const div = document.createElement('div');
//   div.classList.add('inner__server__response__img');
//   div.classList.add('active');
//   div.appendChild(img);
//   fragment.appendChild(div);
//   container.appendChild(fragment);